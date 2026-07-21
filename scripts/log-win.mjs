#!/usr/bin/env node
/**
 * Quickly append a win to src/data/wins.json (no Notion required).
 *
 * Examples:
 *   npm run log-win -- --win "Sequenced move-day dock access so the crew finished in one day"
 *   npm run log-win -- --win "Stood up pantry vendors for new HQ" --metric "On time" --type currently
 *   npm run log-win -- --win "COI renewals chasing themselves" --project klaviyo-coi-tracker --type highlight
 *
 * Flags:
 *   --win       (required) one-line accomplishment
 *   --metric    optional short receipt
 *   --project   portfolio project id, or omit/none
 *   --type      highlight | milestone | currently  (default: currently)
 *   --detail    optional longer note
 *   --date      YYYY-MM-DD (default: today)
 *   --publish   if set to false, still logs but you can use later (default: always saved to wins.json)
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { randomBytes } from 'node:crypto'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(__dirname, '../src/data/wins.json')
const LIMIT = 12

function arg(name, fallback = null) {
  const i = process.argv.indexOf(`--${name}`)
  if (i === -1) return fallback
  const v = process.argv[i + 1]
  if (!v || v.startsWith('--')) return true
  return v
}

const win = arg('win')
if (!win || win === true) {
  console.error(`Usage:
  npm run log-win -- --win "What you shipped" [--metric "Short receipt"] [--type currently] [--project bridge-hq-relocation]

Types: highlight | milestone | currently
Projects: fintech-hq-build-out | bridge-hq-relocation | klaviyo-coi-tracker | … or omit`)
  process.exit(1)
}

let type = String(arg('type', 'currently')).toLowerCase()
if (!['highlight', 'milestone', 'currently'].includes(type)) type = 'currently'

let project_id = arg('project', null)
if (project_id === true || project_id === 'none' || project_id === '') project_id = null

const date = arg('date', new Date().toISOString().slice(0, 10))
const metric = arg('metric', null)
const detail = arg('detail', null)

const data = JSON.parse(readFileSync(OUT, 'utf8'))
const entry = {
  id: `log-${date}-${randomBytes(3).toString('hex')}`,
  date,
  win: String(win).trim(),
  metric: metric && metric !== true ? String(metric).trim() : null,
  project_id,
  type,
  detail: detail && detail !== true ? String(detail).trim() : null,
}

data.wins = [entry, ...(data.wins || [])].slice(0, LIMIT)
data.updated_at = new Date().toISOString().slice(0, 10)
data.source = data.source === 'notion' ? 'notion+manual' : 'manual'

writeFileSync(OUT, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
console.log('Logged win → src/data/wins.json')
console.log(`  ${entry.date} · ${entry.type} · ${entry.win}`)
if (entry.metric) console.log(`  metric: ${entry.metric}`)
console.log('\nCommit & push (or edit on GitHub) so the live site updates after merge/deploy.')
