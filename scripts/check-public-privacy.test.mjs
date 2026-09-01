import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import {
  mkdtempSync,
  mkdirSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'

import {
  publicRepositoryFiles,
  scanPublicFiles,
  scanRepository,
} from './check-public-privacy.mjs'

const syntheticObjectId = '1a2b3c4d'.repeat(4)

function fixtureDirectory(t) {
  const directory = mkdtempSync(join(tmpdir(), 'portfolio-privacy-'))
  t.after(() => rmSync(directory, { recursive: true, force: true }))
  return directory
}

function initializeRepository(directory) {
  execFileSync('git', ['init', '-q'], { cwd: directory })
}

function commitFixture(directory, message = 'fixture') {
  execFileSync(
    'git',
    [
      '-c',
      'user.name=Privacy Test',
      '-c',
      'user.email=privacy-test@example.invalid',
      'commit',
      '-qm',
      message,
    ],
    { cwd: directory },
  )
}

test('accepts ordinary content and explicit repeated-character placeholders', (t) => {
  const directory = fixtureDirectory(t)
  writeFileSync(join(directory, 'safe.txt'), `placeholder=${'0'.repeat(32)}\n`)

  assert.deepEqual(scanPublicFiles(directory, ['safe.txt']), [])
})

test('detects object IDs beside non-hex word characters', (t) => {
  const directory = fixtureDirectory(t)
  writeFileSync(
    join(directory, 'fixture.txt'),
    `synthetic_id_${syntheticObjectId}_suffix\n`,
  )

  const violations = scanPublicFiles(directory, ['fixture.txt'])
  assert.equal(violations.length, 1)
  assert.match(violations[0], /raw Notion object ID in working-tree content/)
})

test('checks repository paths without echoing a matched identifier', (t) => {
  const directory = fixtureDirectory(t)
  const relativePath = `assets/${syntheticObjectId}/safe.txt`
  mkdirSync(join(directory, 'assets', syntheticObjectId), { recursive: true })
  writeFileSync(join(directory, relativePath), 'safe\n')

  const violations = scanPublicFiles(directory, [relativePath])
  assert.equal(violations.length, 1)
  assert.match(violations[0], /\[REDACTED-NOTION-ID\]/)
  assert.doesNotMatch(violations[0], new RegExp(syntheticObjectId, 'i'))
})

test('rejects an external public symlink before a build can follow it', (t) => {
  const directory = fixtureDirectory(t)
  const outside = fixtureDirectory(t)
  const outsideFile = join(outside, 'private.txt')
  writeFileSync(outsideFile, `PRIVATE_ID=${syntheticObjectId}\n`)
  mkdirSync(join(directory, 'public'))
  symlinkSync(outsideFile, join(directory, 'public', 'leak-probe.txt'))
  initializeRepository(directory)
  execFileSync('git', ['add', 'public/leak-probe.txt'], { cwd: directory })

  const violations = scanRepository(directory)
  assert.deepEqual(
    violations,
    ['public/leak-probe.txt: non-regular public repository entry is not allowed'],
  )
  assert.doesNotMatch(violations.join('\n'), new RegExp(syntheticObjectId, 'i'))
})

test('rejects eligible directories and other non-regular entries', (t) => {
  const directory = fixtureDirectory(t)
  mkdirSync(join(directory, 'public-entry'))

  assert.deepEqual(
    scanPublicFiles(directory, ['public-entry']),
    ['public-entry: non-regular public repository entry is not allowed'],
  )
})

test('detects direct Notion page URLs while keeping diagnostics value-free', (t) => {
  const directory = fixtureDirectory(t)
  const privateUrl = ['https://app', '.notion.com/p/', 'private-page'].join('')
  writeFileSync(join(directory, 'fixture.txt'), `${privateUrl}\n`)

  const violations = scanPublicFiles(directory, ['fixture.txt'])
  assert.equal(violations.length, 1)
  assert.equal(
    violations[0],
    'fixture.txt:1: direct Notion page URL in working-tree content',
  )
  assert.doesNotMatch(violations[0], /private-page/)
})

test('uses Git eligibility and excludes ignored private files', (t) => {
  const directory = fixtureDirectory(t)
  initializeRepository(directory)
  writeFileSync(join(directory, '.gitignore'), '.env.local\n')
  writeFileSync(join(directory, '.env.local'), `PRIVATE_ID=${syntheticObjectId}\n`)
  writeFileSync(join(directory, 'safe.txt'), 'safe\n')
  execFileSync('git', ['add', '.gitignore', 'safe.txt'], { cwd: directory })

  const files = publicRepositoryFiles(directory)
  assert.deepEqual(files, ['.gitignore', 'safe.txt'])
  assert.deepEqual(scanRepository(directory), [])
})

test('scans staged bytes even when the working tree was cleaned afterward', (t) => {
  const directory = fixtureDirectory(t)
  initializeRepository(directory)
  writeFileSync(join(directory, 'fixture.txt'), `PRIVATE_ID=${syntheticObjectId}\n`)
  execFileSync('git', ['add', 'fixture.txt'], { cwd: directory })
  writeFileSync(join(directory, 'fixture.txt'), 'safe working tree\n')

  const violations = scanRepository(directory)
  assert.equal(violations.length, 1)
  assert.equal(
    violations[0],
    'fixture.txt:1: raw Notion object ID in staged content',
  )
})

test('allows tracked files deleted only from the working tree', (t) => {
  const directory = fixtureDirectory(t)
  initializeRepository(directory)
  writeFileSync(join(directory, 'safe.txt'), 'safe\n')
  execFileSync('git', ['add', 'safe.txt'], { cwd: directory })
  commitFixture(directory)
  rmSync(join(directory, 'safe.txt'))

  assert.deepEqual(scanRepository(directory), [])
})

test('allows staged deletions without weakening broken-link handling', (t) => {
  const directory = fixtureDirectory(t)
  initializeRepository(directory)
  writeFileSync(join(directory, 'safe.txt'), 'safe\n')
  execFileSync('git', ['add', 'safe.txt'], { cwd: directory })
  commitFixture(directory)
  rmSync(join(directory, 'safe.txt'))
  execFileSync('git', ['add', '-u'], { cwd: directory })

  assert.deepEqual(scanRepository(directory), [])
})

test('fails closed when Git cannot determine public eligibility', (t) => {
  const directory = fixtureDirectory(t)
  writeFileSync(join(directory, 'safe.txt'), 'safe\n')

  assert.throws(
    () => publicRepositoryFiles(directory),
    /Git could not determine the public repository file set/,
  )
})
