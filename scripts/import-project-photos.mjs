// Import photos from any folder into a project's web-ready images.
//
// Downscales, re-encodes as JPEG, honors EXIF orientation, strips metadata —
// a ~3 MB phone photo becomes ~200–400 KB. Sources are never modified.
//
// Destinations come from the `images` block in src/data/projects.json, so what
// lands on disk is exactly what the site tries to load.
//
// Dry run by default. Nothing is written without --apply.
//
//   node scripts/import-project-photos.mjs --list
//   node scripts/import-project-photos.mjs --from ~/Downloads/Photos --project fintech-hq-build-out
//   node scripts/import-project-photos.mjs --from ~/Downloads/Photos --project fintech-hq-build-out \
//     --map hero="Lobby.jpg" --map before="Shell.jpg" --apply

import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { resolve, dirname, join, extname, basename } from 'node:path'

const MAX_WIDTH = 1600
const QUALITY = 80
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff', '.heic', '.heif'])

const ROOT = resolve(process.cwd())
const PUBLIC = resolve(ROOT, 'public')
const PROJECTS = resolve(ROOT, 'src/data/projects.json')

const kb = (p) => Math.round(statSync(p).size / 1024)
const die = (msg) => {
  console.error(`\n✗ ${msg}\n`)
  process.exit(1)
}

// ── args ────────────────────────────────────────────────────────────────────
function parseArgs(argv) {
  const out = { map: {}, apply: false, list: false }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--apply') out.apply = true
    else if (a === '--list') out.list = true
    else if (a === '--from') out.from = argv[++i]
    else if (a === '--project') out.project = argv[++i]
    else if (a === '--map') {
      const pair = argv[++i] || ''
      const eq = pair.indexOf('=')
      if (eq < 1) die(`--map needs slot=filename, got: ${pair}`)
      out.map[pair.slice(0, eq).trim()] = pair.slice(eq + 1).trim()
    } else die(`unknown argument: ${a}`)
  }
  return out
}

const args = parseArgs(process.argv.slice(2))

// ── projects ────────────────────────────────────────────────────────────────
if (!existsSync(PROJECTS)) die(`cannot find ${PROJECTS} — run from the repo root`)
const raw = JSON.parse(readFileSync(PROJECTS, 'utf8'))
const projects = (Array.isArray(raw) ? raw : raw.projects || []).filter((p) => p && p.id)

// public/-relative disk path for a declared image path like "/assets/images/…"
const destOf = (declared) => resolve(PUBLIC, declared.replace(/^\/+/, ''))

if (args.list) {
  console.log('\nProjects and their image slots:\n')
  for (const p of projects) {
    const slots = Object.entries(p.images || {})
    if (!slots.length) {
      console.log(`  ${p.id.padEnd(28)} — no images declared —`)
      continue
    }
    const state = slots
      .map(([slot, path]) => `${slot}${existsSync(destOf(path)) ? '✓' : '·'}`)
      .join(' ')
    const need = p.photos_needed?.length ? `  (${p.photos_needed.length} photos_needed)` : ''
    console.log(`  ${p.id.padEnd(28)} ${state}${need}`)
  }
  console.log('\n  ✓ = file present   · = missing\n')
  process.exit(0)
}

if (!args.from || !args.project) {
  die('usage: --from <folder> --project <id> [--map slot=filename] [--apply]\n  see also: --list')
}

const project = projects.find((p) => p.id === args.project)
if (!project) {
  die(`no project with id "${args.project}".\n  Valid ids:\n${projects.map((p) => `    ${p.id}`).join('\n')}`)
}

const slots = Object.entries(project.images || {})
if (!slots.length) die(`project "${project.id}" declares no images block in projects.json`)
const slotNames = slots.map(([s]) => s)

// ── source folder ───────────────────────────────────────────────────────────
const from = resolve(args.from.replace(/^~/, process.env.HOME || '~'))
if (!existsSync(from)) die(`source folder not found: ${from}`)
if (!statSync(from).isDirectory()) die(`--from must be a folder: ${from}`)

// Walk subfolders too — photo dumps are usually foldered, and missing a whole
// subdirectory silently is worse than listing a few extra candidates.
const MAX_DEPTH = 4
function walk(dir, depth = 0, base = '') {
  if (depth > MAX_DEPTH) return []
  const found = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue
    const rel = base ? join(base, entry.name) : entry.name
    if (entry.isDirectory()) found.push(...walk(join(dir, entry.name), depth + 1, rel))
    else if (entry.isFile() && IMAGE_EXT.has(extname(entry.name).toLowerCase())) found.push(rel)
  }
  return found
}

const files = walk(from).sort()

if (!files.length) die(`no image files in ${from}`)

// ── resolve slot → source file ──────────────────────────────────────────────
for (const slot of Object.keys(args.map)) {
  if (!slotNames.includes(slot)) {
    die(`"${slot}" is not a slot on ${project.id}. Valid slots: ${slotNames.join(', ')}`)
  }
}

function matchFile(needle) {
  const exact = files.filter((f) => f === needle)
  if (exact.length === 1) return exact[0]
  const partial = files.filter((f) => f.toLowerCase().includes(needle.toLowerCase()))
  if (partial.length === 1) return partial[0]
  if (partial.length > 1) {
    die(`"${needle}" matches ${partial.length} files — be more specific:\n${partial.map((f) => `    ${f}`).join('\n')}`)
  }
  die(`no file matching "${needle}" in ${from}`)
}

const plan = []
for (const [slot, declared] of slots) {
  let src = null
  if (args.map[slot]) {
    src = matchFile(args.map[slot])
  } else {
    // only auto-assign when a filename plainly says which slot it is
    const named = files.filter((f) => f.toLowerCase().includes(slot.toLowerCase()))
    if (named.length === 1) src = named[0]
  }
  if (src) plan.push({ slot, src: join(from, src), srcName: src, dest: destOf(declared), declared })
}

// ── report ──────────────────────────────────────────────────────────────────
console.log(`\n${project.title || project.id}  →  ${project.id}`)
console.log(`Source: ${from}  (${files.length} images)\n`)

if (!plan.length) {
  console.log(`Nothing mapped. Slots to fill: ${slotNames.join(', ')}\n`)
  console.log('Pick from these files and map them explicitly:\n')
  // Group by subfolder — a flat truncated list buries whole directories.
  const byDir = new Map()
  for (const f of files) {
    const d = dirname(f) === '.' ? '' : dirname(f)
    if (!byDir.has(d)) byDir.set(d, [])
    byDir.get(d).push(f)
  }
  const PER_DIR = 12
  for (const [dir, group] of byDir) {
    console.log(`  ${dir || '(top level)'}  — ${group.length}`)
    for (const f of group.slice(0, PER_DIR)) console.log(`    ${basename(f)}`)
    if (group.length > PER_DIR) console.log(`    … and ${group.length - PER_DIR} more`)
    console.log('')
  }
  console.log(`\n  node scripts/import-project-photos.mjs --from "${args.from}" --project ${project.id} \\`)
  console.log(`    ${slotNames.map((s) => `--map ${s}="<filename>"`).join(' \\\n    ')} --apply\n`)
  if (project.photos_needed?.length) {
    console.log('  photos_needed for this project:')
    for (const n of project.photos_needed) console.log(`    · ${n}`)
    console.log('')
  }
  process.exit(0)
}

console.log('Plan:')
for (const p of plan) {
  const over = existsSync(p.dest) ? '  ⚠ overwrites existing' : ''
  console.log(`  ${p.slot.padEnd(7)} ${p.srcName}`)
  console.log(`          → ${p.declared}${over}`)
}
const unfilled = slotNames.filter((s) => !plan.some((p) => p.slot === s))
if (unfilled.length) console.log(`\n  Not mapped: ${unfilled.join(', ')}`)

if (!args.apply) {
  console.log('\nDry run — nothing written. Re-run with --apply.\n')
  process.exit(0)
}

// ── apply ───────────────────────────────────────────────────────────────────
console.log('')
for (const p of plan) {
  await mkdir(dirname(p.dest), { recursive: true })
  const before = kb(p.src)
  await sharp(p.src)
    .rotate() // honor EXIF orientation
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(p.dest)
  console.log(`✓ ${p.declared}  (${before} KB → ${kb(p.dest)} KB)`)
}
console.log(`\nDone. Commit the new files, then clear any matching photos_needed in projects.json.\n`)
