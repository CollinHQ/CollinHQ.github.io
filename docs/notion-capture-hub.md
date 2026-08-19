# Notion Capture Hub setup (Vanta / C&W)

Create this once in your personal Notion workspace. The Work Agent writes here on Fridays; you harvest from here on the personal laptop into `src/data/projects.json`.

> **Status:** This hub does not exist until you create it. Until then the Friday → site loop is still usable by pasting notes straight into [`harvest-prompt.md`](./harvest-prompt.md). Full pipeline status: [`../PIPELINE.md`](../PIPELINE.md).
>
> **Cloud / MCP note:** Notion MCP often needs auth in Cursor desktop (Settings → MCP). If connected, ask the agent to “create the Capture Hub from `docs/notion-capture-hub.md`.”

## Parent page

**Title:** Capture Hub  
**Icon (optional):** 📥  
**Intro block:**

```
Friday Signal from Vanta SF HQ (Cushman & Wakefield) lands here.
Harvest into GitHub: see PIPELINE.md + docs/harvest-prompt.md in CollinHQ.github.io.
Primary project id: vanta-sf-hq-ops
```

## Child 1 — Weekly Summary (page)

Freeform page. Each Friday, append a dated section:

```
## Week of YYYY-MM-DD
- Impact bullet…
- Impact bullet…
```

Keep bullets portfolio-ready (already translated). No raw email dumps.

## Child 2 — Tracks (database)

**Database name:** Tracks  
**Views:** Board by Track · Table by Week Of

| Property | Type | Options / notes |
|---|---|---|
| Name | Title | Short win title |
| Impact Line | Text | Portfolio sentence |
| Track | Select | Relocation · Vendor/Spend · Space Readiness · Events/Holiday Party |
| Tags | Multi-select | Office Move · Vendor Mgmt · Employee Experience · Events · Facilities · Budget |
| Metric Delta | Text | e.g. `~100 monitors`, `$X saved` — leave empty if none |
| Source | Select | Gmail · Slack · Granola · Other |
| Week Of | Date | Friday of that week |
| Asset Needed | Text | Photo/screenshot TODO, or empty |
| Status | Select | Captured · Harvested · Parked |

Seed one empty row per track for the current week so the board is not blank.

## Child 3 — Asset Gaps (database)

**Database name:** Asset Gaps

| Property | Type | Notes |
|---|---|---|
| Name | Title | e.g. `Staged workstation / monitor install` |
| Project Id | Select | `vanta-sf-hq-ops` (add others later) |
| Keyword Trigger | Text | What in Slack/email caused this |
| Status | Select | Needed · Shot · In repo · Dropped |
| Week Of | Date | |
| Notes | Text | Where file lives / permissions |

Default Needed rows to create now (mirror `photos_needed` on `vanta-sf-hq-ops`):

1. Staged workstation / monitor install  
2. Move-day operations  
3. Pantry / amenity program  
4. Holiday party venue or production (when allowed)  
5. Anonymized walkthrough SOP checklist screenshot  

## Child 4 — Tyler Brief (page)

Short shareable brief. Template:

```
# Tyler Brief — Week of YYYY-MM-DD
Client: Vanta SF HQ (via Cushman & Wakefield)

## What moved
- …

## Blockers
- …

## Next week
- …
```

Refresh every Friday after the Detective run (5–8 lines max).

## How to harvest (paste on Capture Hub parent)

1. Copy this week’s **Weekly Summary** bullets (+ any Track metric deltas).  
2. On the personal laptop, open the portfolio repo in Cursor.  
3. Paste into chat using `docs/harvest-prompt.md`.  
4. Apply the JSON patch to `vanta-sf-hq-ops`, add photos, commit, push.  
5. Mark harvested Track rows as **Harvested**.

## Auth for agents

To let a Cursor agent create/update this hub automatically, connect the **Notion** MCP server in Cursor desktop (Settings → MCP), then ask it to “create the Capture Hub from `docs/notion-capture-hub.md`.”
