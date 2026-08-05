// SUPERSEDED by scripts/import-project-photos.mjs, which takes any folder and a
// project id instead of a hardcoded list. Kept as the record of which source
// files became the committed klaviyo-office-redesign images.
//
// Optimize source photos into web-ready project images.
// Downscales to a sensible max width, re-encodes as JPEG, auto-orients from EXIF,
// and strips metadata — turning ~3 MB phone photos into ~200–400 KB web images.
//
// Usage: node scripts/process-project-photos.mjs
// Edit the JOBS array below to add more photos. Sources are read-only (never modified).

import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { statSync, existsSync } from 'node:fs'

const HOME = process.env.HOME
const MAX_WIDTH = 1600
const QUALITY = 80

// src → dest. Dest paths are relative to the repo's public/ directory.
const JOBS = [
  // Klaviyo SF Hub Event Space Remodel
  {
    src: `${HOME}/Downloads/Photos-3-001/20251112_123016.jpg`, // all-hands "Black Friday Show" in the finished space
    dest: 'assets/images/projects/klaviyo-office-redesign/hero.jpg',
  },
  {
    src: `${HOME}/Downloads/Photos-3-001/20250822_125940.jpg`, // space mid-build / AV install
    dest: 'assets/images/projects/klaviyo-office-redesign/before.jpg',
  },
  {
    src: `${HOME}/Downloads/Photos-3-001/20250807_162202.jpg`, // finished happy hour in use
    dest: 'assets/images/projects/klaviyo-office-redesign/after.jpg',
  },
]

const PUBLIC = resolve(process.cwd(), 'public')
const kb = (p) => Math.round(statSync(p).size / 1024)

for (const { src, dest } of JOBS) {
  if (!existsSync(src)) {
    console.error(`✗ missing source: ${src}`)
    process.exitCode = 1
    continue
  }
  const out = resolve(PUBLIC, dest)
  await mkdir(dirname(out), { recursive: true })
  const before = kb(src)
  await sharp(src)
    .rotate() // honor EXIF orientation
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(out)
  console.log(`✓ ${dest}  (${before} KB → ${kb(out)} KB)`)
}
