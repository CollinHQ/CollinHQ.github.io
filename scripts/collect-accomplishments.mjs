#!/usr/bin/env node
/**
 * Accomplishments collector — gathers candidate wins from local sources
 * into docs/wins-candidates.md for review (does NOT publish to the live site).
 *
 * Sources:
 *   - docs/wins-inbox.md (scratch notes)
 *   - src/data/experience.json (current-role highlights)
 *   - src/data/wins.json (already published — listed so you don't double-add)
 *
 * Usage:
 *   npm run collect-wins
 *
 * Then promote keepers with:
 *   npm run log-win -- --win "…" --type currently
 *
 * Or ask a Cursor agent to follow docs/agents/accomplishments-collector.md
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const OUT = resolve(ROOT, 'docs/wins-candidates.md')

function readJson(rel) {
  return JSON.parse(readFileSync(resolve(ROOT, rel), 'utf8'))
}

function readText(rel) {
  const p = resolve(ROOT, rel)
  return existsSync(p) ? readFileSync(p, 'utf8') : ''
}

function inboxBullets(md) {
  const lines = md.split('\n')
  const bullets = []
  for (const line of lines) {
    const m = line.match(/^\s*[-*]\s+(.+)/)
    if (!m) continue
    const text = m[1].trim()
    if (!text || text === '-' || text.length < 8) continue
    bullets.push(text)
  }
  return bullets
}

const inbox = inboxBullets(readText('docs/wins-inbox.md'))
const experience = readJson('src/data/experience.json')
const wins = readJson('src/data/wins.json')
const current = experience.filter((e) => /present/i.test(e.end || ''))
const currentHighlights = current.flatMap((e) =>
  (e.highlights || []).map((h) => ({ company: e.company, title: e.title, text: h }))
)

const published = (wins.wins || []).map((w) => `- (${w.date || '?'}) ${w.win}`).join('\n')

const today = new Date().toISOString().slice(0, 10)

const md = `# Wins candidates — ${today}

Auto-collected for review. **Nothing here goes live until you promote it** with \`npm run log-win\` or Notion Publish.

Ask Cursor: *“Run the accomplishments collector and turn the keepers into wins.”*
Agent brief: \`docs/agents/accomplishments-collector.md\`

---

## From wins inbox (\`docs/wins-inbox.md\`)

${inbox.length ? inbox.map((b) => `- [ ] ${b}`).join('\n') : '_No inbox bullets yet. Dump rough notes in wins-inbox.md during the week._'}

---

## From current role(s) in experience.json

${currentHighlights.length
  ? currentHighlights.map((h) => `- [ ] **${h.company}** (${h.title}): ${h.text}`).join('\n')
  : '_No current-role highlights found._'}

---

## Already on the site (don't re-add)

${published || '_No published wins yet._'}

---

## Promote a keeper

\`\`\`bash
npm run log-win -- --win "Clean one-liner in your voice" --type currently
# or
npm run log-win -- --win "…" --type milestone --project fintech-hq-build-out --metric "Optional"
\`\`\`

Tone check before publishing: sound like Collin — warm, specific, human. No “synergy,” “leverage,” “elevate,” or fake precision.
`

writeFileSync(OUT, md, 'utf8')
console.log(`Wrote ${OUT}`)
console.log(`  inbox notes: ${inbox.length}`)
console.log(`  current-role highlights: ${currentHighlights.length}`)
console.log(`  already published: ${(wins.wins || []).length}`)
console.log('\nNext: review docs/wins-candidates.md, then npm run log-win for keepers.')
