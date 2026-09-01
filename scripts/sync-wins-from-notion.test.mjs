import assert from 'node:assert/strict'
import test from 'node:test'

import {
  discoverDataSourceId,
  mapPage,
  notionQueryAll,
  NotionApiError,
  NotionConfigurationError,
  publicWinId,
} from './sync-wins-from-notion.mjs'

const compactPageId = '12345678'.repeat(4)
const dashedPageId = [
  compactPageId.slice(0, 8),
  compactPageId.slice(8, 12),
  compactPageId.slice(12, 16),
  compactPageId.slice(16, 20),
  compactPageId.slice(20),
].join('-')

function title(value) {
  return { title: [{ plain_text: value }] }
}

test('publishes a stable digest instead of a Notion page identifier', () => {
  const compactPublicId = publicWinId(compactPageId)
  const dashedPublicId = publicWinId(dashedPageId)

  assert.equal(compactPublicId, dashedPublicId)
  assert.match(compactPublicId, /^notion-[0-9a-f]{20}$/)
  assert.doesNotMatch(compactPublicId, new RegExp(compactPageId, 'i'))
})

test('maps a publishable win without retaining the source page identifier', () => {
  const mapped = mapPage({
    id: dashedPageId,
    properties: {
      Name: title('Shipped a safer publishing boundary'),
      Date: { date: { start: '2026-08-19' } },
      Publish: { checkbox: true },
    },
  })

  assert.equal(mapped.id, publicWinId(compactPageId))
  assert.equal(mapped.win, 'Shipped a safer publishing boundary')
  assert.doesNotMatch(JSON.stringify(mapped), new RegExp(compactPageId, 'i'))
  assert.doesNotMatch(JSON.stringify(mapped), new RegExp(dashedPageId, 'i'))
})

test('rejects malformed source page identifiers', () => {
  assert.throws(() => publicWinId('not-a-page-id'), /invalid page identifier/)
})

test('discovers the single current Notion data source without logging IDs', async () => {
  let request
  const sourceId = ['abcdef12', compactPageId.slice(8)].join('')
  const fakeFetch = async (url, options) => {
    request = { url, options }
    return {
      ok: true,
      json: async () => ({ data_sources: [{ id: sourceId, name: 'Wins' }] }),
    }
  }

  assert.equal(await discoverDataSourceId(compactPageId, fakeFetch), sourceId)
  assert.match(request.url, /\/v1\/databases\//)
  assert.equal(request.options.headers['Notion-Version'], '2026-03-11')
})

test('requires an explicit source for a multi-source database', async () => {
  const fakeFetch = async () => ({
    ok: true,
    json: async () => ({
      data_sources: [
        { id: compactPageId, name: 'Wins' },
        { id: 'abcdef12'.repeat(4), name: 'Archive' },
      ],
    }),
  })

  await assert.rejects(
    () => discoverDataSourceId(compactPageId, fakeFetch),
    (error) => {
      assert.ok(error instanceof NotionConfigurationError)
      assert.match(error.message, /NOTION_WINS_DATA_SOURCE_ID/)
      assert.doesNotMatch(error.message, new RegExp(compactPageId, 'i'))
      return true
    },
  )
})

test('reports only status and generic remediation for Notion failures', async () => {
  let responseBodyRead = false
  const privateResponse = ['private', '-', compactPageId].join('')
  let request
  const fakeFetch = async (url, options) => {
    request = { url, options }
    return {
      ok: false,
      status: 403,
      text: async () => {
        responseBodyRead = true
        return privateResponse
      },
    }
  }

  await assert.rejects(
    () => notionQueryAll(compactPageId, fakeFetch),
    (error) => {
      assert.ok(error instanceof NotionApiError)
      assert.equal(
        error.message,
        'Notion data-source query failed (HTTP 403). Check the database connection and integration permissions.',
      )
      assert.doesNotMatch(error.message, new RegExp(compactPageId, 'i'))
      return true
    },
  )
  assert.match(request.url, /\/v1\/data_sources\//)
  assert.equal(request.options.headers['Notion-Version'], '2026-03-11')
  assert.equal(responseBodyRead, false)
})
