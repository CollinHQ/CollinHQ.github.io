#!/usr/bin/env node
/**
 * Sync published wins from a Notion database into src/data/wins.json
 *
 * Required env:
 *   NOTION_TOKEN         — Notion internal integration secret
 *   NOTION_WINS_DB_ID    — database ID (32-char hex, with or without dashes)
 *
 * Optional:
 *   WINS_LIMIT           — max wins to keep (default 12)
 *   DRY_RUN=1            — print JSON, do not write file
 *
 * Notion DB property names (exact):
 *   Name (title), Date (date), Metric (rich_text), Project (select),
 *   Type (select: highlight | milestone | currently), Publish (checkbox),
 *   Detail (rich_text, optional)
 *
 * Project select options should match portfolio project ids, e.g.:
 *   bridge-hq-relocation, fintech-hq-build-out, klaviyo-coi-tracker, …
 *   or "none" / blank for no project link
 *
 * See docs/WINS-NOTION.md for setup.
 */

import { writeFileSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const OUT = resolve(ROOT, 'src/data/wins.json')
const NOTION_VERSION = '2022-06-28'
const LIMIT = Number(process.env.WINS_LIMIT || 12)

const token = process.env.NOTION_TOKEN
const databaseId = (process.env.NOTION_WINS_DB_ID || '').replace(/-/g, '')

function fail(msg, code = 1) {
  console.error(msg)
  process.exit(code)
}

function richText(prop) {
  if (!prop?.rich_text?.length) return ''
  return prop.rich_text.map((t) => t.plain_text).join('').trim()
}

function titleText(prop) {
  if (!prop?.title?.length) return ''
  return prop.title.map((t) => t.plain_text).join('').trim()
}

function mapPage(page) {
  const p = page.properties || {}
  const win = titleText(p.Name || p.Win || p.Title)
  if (!win) return null

  const projectRaw = p.Project?.select?.name || ''
  const project_id =
    !projectRaw || projectRaw.toLowerCase() === 'none' ? null : projectRaw

  let type = (p.Type?.select?.name || 'highlight').toLowerCase()
  if (!['highlight', 'milestone', 'currently'].includes(type)) type = 'highlight'

  return {
    id: page.id,
    date: p.Date?.date?.start || null,
    win,
    metric: richText(p.Metric) || null,
    project_id,
    type,
    detail: richText(p.Detail) || null,
  }
}

async function notionQueryAll(dbId) {
  const wins = []
  let cursor
  do {
    const body = {
      filter: {
        property: 'Publish',
        checkbox: { equals: true },
      },
      sorts: [{ property: 'Date', direction: 'descending' }],
      page_size: 100,
    }
    if (cursor) body.start_cursor = cursor

    const res = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const err = await res.text()
      fail(`Notion query failed (${res.status}): ${err}`)
    }

    const data = await res.json()
    for (const page of data.results || []) {
      const mapped = mapPage(page)
      if (mapped) wins.push(mapped)
    }
    cursor = data.has_more ? data.next_cursor : null
  } while (cursor)

  return wins
}

async function main() {
  if (!token || !databaseId) {
    console.log(
      'Skipping Notion sync: set NOTION_TOKEN and NOTION_WINS_DB_ID to enable.\n' +
        'Seed wins.json is left unchanged. See docs/WINS-NOTION.md'
    )
    process.exit(0)
  }

  console.log('Fetching published wins from Notion…')
  const wins = (await notionQueryAll(databaseId)).slice(0, LIMIT)

  // Guard: an empty result would otherwise overwrite wins.json with [], and the
  // Recent wins section renders nothing when the list is empty — so a Notion DB
  // that is new, has nothing marked Publish, or is not shared with the
  // integration would silently delete the feed. Refuse instead.
  if (!wins.length) {
    let existing = 0
    try {
      existing = (JSON.parse(readFileSync(OUT, 'utf8')).wins || []).length
    } catch {
      /* no existing file — nothing to protect */
    }
    if (existing) {
      fail(
        `Notion returned 0 published wins, but ${OUT} already has ${existing}.\n` +
          'Refusing to overwrite. Check that rows have Publish checked and that the\n' +
          'database is shared with the integration (⋯ → Connections). See docs/WINS-NOTION.md'
      )
    }
  }

  const payload = {
    updated_at: new Date().toISOString().slice(0, 10),
    source: 'notion',
    wins: wins.map((w) => ({
      ...w,
      metric: w.metric || null,
      detail: w.detail || null,
    })),
  }

  const next = `${JSON.stringify(payload, null, 2)}\n`

  if (process.env.DRY_RUN === '1') {
    console.log(next)
    return
  }

  let prev = ''
  try {
    prev = readFileSync(OUT, 'utf8')
  } catch {
    /* first write */
  }

  if (prev === next) {
    console.log(`No changes (${wins.length} wins).`)
    return
  }

  writeFileSync(OUT, next, 'utf8')
  console.log(`Wrote ${wins.length} wins → src/data/wins.json`)
}

main().catch((err) => fail(err.stack || String(err)))
