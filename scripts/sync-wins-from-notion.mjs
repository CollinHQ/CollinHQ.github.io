#!/usr/bin/env node
/**
 * Sync published wins from a Notion database into src/data/wins.json
 *
 * Required env:
 *   NOTION_TOKEN                 — Notion internal integration secret
 *   NOTION_WINS_DB_ID            — parent database ID (single-source databases)
 *
 * Optional:
 *   NOTION_WINS_DATA_SOURCE_ID   — explicit source ID (required for multi-source DBs)
 *   WINS_LIMIT                   — max wins to keep (default 12)
 *   DRY_RUN=1                    — print JSON, do not write file
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
import { createHash } from 'node:crypto'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const OUT = resolve(ROOT, 'src/data/wins.json')
const NOTION_VERSION = '2026-03-11'
const LIMIT = Number(process.env.WINS_LIMIT || 12)

const token = process.env.NOTION_TOKEN
const databaseId = (process.env.NOTION_WINS_DB_ID || '').replace(/-/g, '')
const configuredDataSourceId =
  (process.env.NOTION_WINS_DATA_SOURCE_ID || '').replace(/-/g, '')

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

export function publicWinId(pageId) {
  const normalized = String(pageId || '').replaceAll('-', '').toLowerCase()
  if (!/^[0-9a-f]{32}$/.test(normalized)) {
    throw new Error('Notion returned an invalid page identifier.')
  }
  const digest = createHash('sha256').update(normalized).digest('hex').slice(0, 20)
  return `notion-${digest}`
}

function normalizedNotionId(value) {
  const normalized = String(value || '').replaceAll('-', '').toLowerCase()
  if (!/^[0-9a-f]{32}$/.test(normalized)) {
    throw new NotionConfigurationError('invalid-id')
  }
  return normalized
}

export function mapPage(page) {
  const p = page.properties || {}
  const win = titleText(p.Name || p.Win || p.Title)
  if (!win) return null

  const projectRaw = p.Project?.select?.name || ''
  const project_id =
    !projectRaw || projectRaw.toLowerCase() === 'none' ? null : projectRaw

  let type = (p.Type?.select?.name || 'highlight').toLowerCase()
  if (!['highlight', 'milestone', 'currently'].includes(type)) type = 'highlight'

  return {
    // Stable React key without publishing the private Notion page identifier.
    id: publicWinId(page.id),
    date: p.Date?.date?.start || null,
    win,
    metric: richText(p.Metric) || null,
    project_id,
    type,
    detail: richText(p.Detail) || null,
  }
}

export class NotionApiError extends Error {
  constructor(operation, status) {
    const safeOperation =
      operation === 'database discovery' ? 'database discovery' : 'data-source query'
    const safeStatus = Number.isInteger(status) ? status : 'unknown'
    super(
      `Notion ${safeOperation} failed (HTTP ${safeStatus}). ` +
      'Check the database connection and integration permissions.',
    )
    this.name = 'NotionApiError'
    this.status = safeStatus
  }
}

export class NotionConfigurationError extends Error {
  constructor(reason) {
    const message = reason === 'source-count'
      ? 'Notion database discovery did not return exactly one data source. ' +
        'Set NOTION_WINS_DATA_SOURCE_ID explicitly.'
      : 'A configured Notion database or data-source ID is invalid.'
    super(message)
    this.name = 'NotionConfigurationError'
  }
}

export async function discoverDataSourceId(dbId, fetchImpl = fetch) {
  const res = await fetchImpl(`https://api.notion.com/v1/databases/${dbId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Notion-Version': NOTION_VERSION,
    },
  })
  if (!res.ok) {
    throw new NotionApiError('database discovery', res.status)
  }

  const data = await res.json()
  const sources = Array.isArray(data.data_sources) ? data.data_sources : []
  if (sources.length !== 1) {
    throw new NotionConfigurationError('source-count')
  }
  return normalizedNotionId(sources[0]?.id)
}

export async function notionQueryAll(dataSourceId, fetchImpl = fetch) {
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
      result_type: 'page',
    }
    if (cursor) body.start_cursor = cursor

    const res = await fetchImpl(
      `https://api.notion.com/v1/data_sources/${dataSourceId}/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Notion-Version': NOTION_VERSION,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    )

    if (!res.ok) {
      throw new NotionApiError('data-source query', res.status)
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

export async function main() {
  if (!token || (!databaseId && !configuredDataSourceId)) {
    console.log(
      'Skipping Notion sync: set NOTION_TOKEN and a wins database/source ID to enable.\n' +
        'Seed wins.json is left unchanged. See docs/WINS-NOTION.md'
    )
    process.exit(0)
  }

  console.log('Fetching published wins from Notion…')
  const dataSourceId = configuredDataSourceId
    ? normalizedNotionId(configuredDataSourceId)
    : await discoverDataSourceId(normalizedNotionId(databaseId))
  const wins = (await notionQueryAll(dataSourceId)).slice(0, LIMIT)

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
        `Notion returned 0 published wins, but src/data/wins.json already has ${existing}.\n` +
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

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)

if (isMain) {
  main().catch((error) => {
    if (
      error instanceof NotionApiError ||
      error instanceof NotionConfigurationError
    ) {
      fail(error.message)
    }
    fail(
      'Notion sync failed unexpectedly. Check the integration configuration and source data.',
    )
  })
}
