import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
function markdownFiles(directory, prefix) {
  const files = []
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const relativePath = `${prefix}/${entry.name}`
    if (entry.isDirectory()) {
      files.push(...markdownFiles(resolve(directory, entry.name), relativePath))
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(relativePath)
    }
  }
  return files
}

const publicMarkdownFiles = [
  'README.md',
  ...markdownFiles(resolve(root, 'docs'), 'docs'),
]

const violations = []

for (const relativePath of publicMarkdownFiles) {
  const content = readFileSync(resolve(root, relativePath), 'utf8')
  const lines = content.split('\n')

  lines.forEach((line, index) => {
    if (/https:\/\/app\.notion\.com\/p\//i.test(line)) {
      violations.push(`${relativePath}:${index + 1}: direct Notion page URL`)
    }
    const objectIds = line.match(/\b[0-9a-f]{32}\b/gi) || []
    const hasNonPlaceholderId = objectIds.some(
      (objectId) => !/^([0-9a-f])\1{31}$/i.test(objectId),
    )
    if (hasNonPlaceholderId) {
      violations.push(`${relativePath}:${index + 1}: raw Notion object ID`)
    }
  })
}

if (violations.length) {
  console.error('Public privacy check failed:')
  violations.forEach((violation) => console.error(`- ${violation}`))
  process.exit(1)
}

console.log('Public privacy check passed.')
