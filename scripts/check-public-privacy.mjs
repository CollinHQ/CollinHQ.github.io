import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { extname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const skippedDirectories = new Set([
  '.git',
  '.cache',
  '.vite',
  'build',
  'coverage',
  'dist',
  'node_modules',
  'out',
])
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

function repositoryFiles(directory, prefix = '') {
  const files = []
  const entries = readdirSync(directory, { withFileTypes: true })
    .sort((left, right) => left.name.localeCompare(right.name))

  for (const entry of entries) {
    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name
    if (entry.isDirectory()) {
      if (!skippedDirectories.has(entry.name)) {
        files.push(...repositoryFiles(resolve(directory, entry.name), relativePath))
      }
    } else if (entry.isFile()) {
      files.push(relativePath)
    }
  }
  return files
}

function publicRepositoryFiles() {
  try {
    return execFileSync(
      'git',
      ['ls-files', '-z', '--cached', '--others', '--exclude-standard'],
      { cwd: root, encoding: 'utf8' },
    )
      .split('\0')
      .filter(Boolean)
      .filter((relativePath) => existsSync(resolve(root, relativePath)))
      .sort()
  } catch {
    return repositoryFiles(root)
  }
}

function isPlaceholderId(objectId) {
  const normalized = objectId.replaceAll('-', '')
  return /^([0-9a-f])\1{31}$/i.test(normalized)
}

const violations = []

for (const relativePath of publicRepositoryFiles()) {
  const content = readFileSync(resolve(root, relativePath), 'utf8')
  const isBinary = binaryExtensions.has(extname(relativePath).toLowerCase())
  const lines = content.split('\n')

  lines.forEach((line, index) => {
    if (/https?:\/\/app\.notion\.com\/p\//i.test(line)) {
      violations.push(`${relativePath}:${index + 1}: direct Notion page URL`)
    }
    if (!isBinary) {
      const objectIds = line.match(
        /\b(?:[0-9a-f]{32}|[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12})\b/gi,
      ) || []
      if (objectIds.some((objectId) => !isPlaceholderId(objectId))) {
        violations.push(`${relativePath}:${index + 1}: raw Notion object ID`)
      }
    }
  })
}

if (violations.length) {
  console.error('Public privacy check failed:')
  violations.forEach((violation) => console.error(`- ${violation}`))
  process.exit(1)
}

console.log('Public privacy check passed.')
