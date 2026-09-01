import { execFileSync } from 'node:child_process'
import { lstatSync, readFileSync } from 'node:fs'
import { extname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const maxGitOutput = 128 * 1024 * 1024
const binaryExtensions = new Set([
  '.avif',
  '.bmp',
  '.eot',
  '.gif',
  '.ico',
  '.jpeg',
  '.jpg',
  '.mov',
  '.mp3',
  '.mp4',
  '.ogg',
  '.otf',
  '.pdf',
  '.png',
  '.ttf',
  '.wav',
  '.webp',
  '.woff',
  '.woff2',
  '.zip',
])

const directNotionUrlPattern = /https?:\/\/app\.notion\.com\/p\//i
const objectIdPattern =
  /(?<![0-9a-f])(?:[0-9a-f]{32}|[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12})(?![0-9a-f])/gi

function gitText(scanRoot, args) {
  try {
    return execFileSync('git', args, {
      cwd: scanRoot,
      encoding: 'utf8',
      maxBuffer: maxGitOutput,
      stdio: ['ignore', 'pipe', 'pipe'],
    })
  } catch {
    throw new Error('Git could not determine the public repository file set.')
  }
}

export function publicRepositoryFiles(scanRoot) {
  return gitText(
    scanRoot,
    ['ls-files', '-z', '--cached', '--others', '--exclude-standard'],
  )
    .split('\0')
    .filter(Boolean)
    .sort()
}

export function publicIndexEntries(scanRoot) {
  return gitText(scanRoot, ['ls-files', '-z', '--stage'])
    .split('\0')
    .filter(Boolean)
    .map((record) => {
      const separator = record.indexOf('\t')
      if (separator < 0) {
        throw new Error('Git returned an unreadable index entry.')
      }
      const [mode, objectId, stage] = record.slice(0, separator).split(' ')
      return {
        mode,
        objectId,
        stage,
        relativePath: record.slice(separator + 1),
      }
    })
    .sort((left, right) => left.relativePath.localeCompare(right.relativePath))
}

function isPlaceholderId(objectId) {
  const normalized = objectId.replaceAll('-', '')
  return /^([0-9a-f])\1{31}$/i.test(normalized)
}

function objectIds(value) {
  return value.match(objectIdPattern) || []
}

function redactedLocation(relativePath) {
  return relativePath
    .replace(objectIdPattern, '[REDACTED-NOTION-ID]')
    .replace(/https?:\/\/app\.notion\.com\/p\/[^\s]*/gi, '[REDACTED-NOTION-URL]')
    .replace(/[\u0000-\u001f\u007f]/g, '?')
}

function appendPathViolations(violations, relativePath) {
  const location = redactedLocation(relativePath)
  if (directNotionUrlPattern.test(relativePath)) {
    violations.push(`${location}: direct Notion page URL in path`)
  }
  if (objectIds(relativePath).some((objectId) => !isPlaceholderId(objectId))) {
    violations.push(`${location}: raw Notion object ID in path`)
  }
  return location
}

function appendTextViolations(violations, content, location, context, scanObjectIds) {
  content.split('\n').forEach((line, index) => {
    if (directNotionUrlPattern.test(line)) {
      violations.push(`${location}:${index + 1}: direct Notion page URL in ${context}`)
    }
    if (
      scanObjectIds &&
      objectIds(line).some((objectId) => !isPlaceholderId(objectId))
    ) {
      violations.push(`${location}:${index + 1}: raw Notion object ID in ${context}`)
    }
  })
}

function nonRegularViolation(location) {
  return `${location}: non-regular public repository entry is not allowed`
}

export function scanPublicFiles(scanRoot, relativePaths) {
  const violations = []

  for (const relativePath of relativePaths) {
    const location = appendPathViolations(violations, relativePath)
    const absolutePath = resolve(scanRoot, relativePath)
    let stats
    try {
      stats = lstatSync(absolutePath)
    } catch (error) {
      if (error?.code === 'ENOENT') {
        // A tracked file deleted only in the worktree is still scanned from the index.
        continue
      }
      throw new Error('An eligible repository entry could not be inspected safely.')
    }

    if (!stats.isFile()) {
      violations.push(nonRegularViolation(location))
      continue
    }

    let content
    try {
      content = readFileSync(absolutePath, 'utf8')
    } catch {
      throw new Error('An eligible repository file could not be read safely.')
    }
    const scanObjectIds = !binaryExtensions.has(extname(relativePath).toLowerCase())
    appendTextViolations(
      violations,
      content,
      location,
      'working-tree content',
      scanObjectIds,
    )
  }

  return violations
}

export function scanIndexEntries(scanRoot, entries) {
  const violations = []

  for (const entry of entries) {
    const location = redactedLocation(entry.relativePath)
    if (
      entry.mode === '120000' ||
      entry.mode === '160000' ||
      !entry.mode.startsWith('100')
    ) {
      violations.push(nonRegularViolation(location))
      continue
    }

    let content
    try {
      content = execFileSync('git', ['cat-file', 'blob', entry.objectId], {
        cwd: scanRoot,
        encoding: 'utf8',
        maxBuffer: maxGitOutput,
        stdio: ['ignore', 'pipe', 'pipe'],
      })
    } catch {
      throw new Error('An eligible staged repository file could not be read safely.')
    }
    const scanObjectIds =
      !binaryExtensions.has(extname(entry.relativePath).toLowerCase())
    appendTextViolations(
      violations,
      content,
      location,
      'staged content',
      scanObjectIds,
    )
  }

  return violations
}

export function scanRepository(scanRoot = root) {
  const indexEntries = publicIndexEntries(scanRoot)
  const violations = [
    ...scanPublicFiles(scanRoot, publicRepositoryFiles(scanRoot)),
    ...scanIndexEntries(scanRoot, indexEntries),
  ]
  return [...new Set(violations)]
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)

if (isMain) {
  try {
    const violations = scanRepository()
    if (violations.length) {
      console.error('Public privacy check failed:')
      violations.forEach((violation) => console.error(`- ${violation}`))
      process.exitCode = 1
    } else {
      console.log('Public privacy check passed.')
    }
  } catch {
    console.error('Public privacy check could not run safely.')
    process.exitCode = 2
  }
}
