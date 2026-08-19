# Notion setup — paste this to an AI with Notion access

Use this in **Cursor desktop on your personal laptop** with **Notion MCP connected**
(Settings → MCP → Notion → authenticate).

This cloud agent **cannot** reach your Notion workspace.

---

## Prompt A — Finish the Tracks database (you already created the page)

Copy everything in the box below into a new Cursor chat (Notion MCP on).

```
You have Notion MCP write access. Set up my Capture Hub **Tracks** database.

**Database URL (already exists):**
https://app.notion.com/p/3c14860078b080c89ba5cbfe21d44763?v=3c14860078b0807fbf25000cd059d815

**Database ID:** 3c14860078b080c89ba5cbfe21d44763

**Goal:** Rename/add properties so they match EXACTLY (names are case-sensitive for our pipeline). Do not delete rows the user already added unless empty test rows.

### Required properties

| Property name | Type | Select / multi-select options |
|---|---|---|
| Name | Title | (keep default title column) |
| Impact Line | Text | |
| Track | Select | Relocation, Vendor/Spend, Space Readiness, Events/Holiday Party |
| Tags | Multi-select | Office Move, Vendor Mgmt, Employee Experience, Events, Facilities, Budget |
| Metric Delta | Text | |
| Source | Select | Gmail, Slack, Granola, Other |
| Week Of | Date | |
| Asset Needed | Text | |
| Status | Select | Captured, Ready for personal, Harvested, Parked |

### Views

1. **Board** — grouped by **Track**
2. **Table** — sorted by **Week Of** descending (newest first)

### Optional seed rows (only if the database is empty)

Add one row per Track for the current week with Status = Captured and empty Impact Line:

- Relocation
- Vendor/Spend
- Space Readiness
- Events/Holiday Party

### When done, reply with

1. Confirmation each property exists with correct type
2. List of select options created for Track, Tags, Source, Status
3. Link to the database
4. Anything you could not set (Notion API limits) and what I should click manually
```

---

## Prompt B — Create the rest of Capture Hub

Run **after Prompt A**, or combine with **Prompt C** below.

```
You have Notion MCP write access. Complete my **Capture Hub** under this parent page:

**Capture Hub parent URL:**
https://app.notion.com/p/Capture-Hub-3c14860078b080b09954c73105352c9f

**Capture Hub page ID:** 3c14860078b080b09954c73105352c9f

Create anything that does not already exist. Do not duplicate pages/databases that already exist (Tracks database already exists at https://app.notion.com/p/3c14860078b080c89ba5cbfe21d44763).

### 1. Parent page intro (top of Capture Hub)

If missing, add this callout/text block:

Friday packet from Vanta SF HQ (via Cushman & Wakefield).
Work side writes. Personal side harvests into CollinHQ.github.io.
Primary project id: vanta-sf-hq-ops

### 2. Child page: Weekly Summary

Template body:

## Week of YYYY-MM-DD
- (portfolio-ready impact bullet)
- (portfolio-ready impact bullet)

### 3. Database: Asset Gaps

| Property | Type | Options |
|---|---|---|
| Name | Title | |
| Project Id | Select | vanta-sf-hq-ops |
| Keyword Trigger | Text | |
| Status | Select | Needed, Shot, In repo, Dropped |
| Week Of | Date | |
| Notes | Text | |

Seed 5 rows, Status = Needed:

1. Staged workstation / monitor install
2. Move-day operations
3. Pantry / amenity program
4. Holiday party venue or production (when allowed)
5. Anonymized walkthrough SOP checklist screenshot

### 4. Database: Experience Bank

| Property | Type | Options |
|---|---|---|
| Name | Title | |
| Impact Line | Text | |
| Destination | Select | Portfolio project, Resume bullet, Experience highlight, Homepage win, Hold |
| Project Id | Select | vanta-sf-hq-ops, none |
| Track | Select | Relocation, Vendor/Spend, Space Readiness, Events/Holiday Party |
| Metric | Text | |
| Week Of | Date | |
| Status | Select | Candidate, Approved, Published, Dropped |
| Source Week | Text | |

### 5. Child page: Collin Brief

Template:

# Collin Brief — Week of YYYY-MM-DD
Client: Vanta SF HQ (via Cushman & Wakefield)

## What moved
- …

## Blockers
- …

## Next week
- …

### 6. Notion integration access (tell me what to click)

Remind me to connect integration "Friday Capture" at https://www.notion.so/my-integrations to Capture Hub and every new database (⋯ → Connections).

When done, list every page/database created with links.
```

---

## Prompt C — Do everything in one chat (recommended)

Paste this single prompt if Prompt A is not done yet — it finishes Tracks **and** creates the rest under Capture Hub.

```
You have Notion MCP write access. Set up my full **Capture Hub** for a portfolio pipeline.

**Capture Hub parent:**
https://app.notion.com/p/Capture-Hub-3c14860078b080b09954c73105352c9f
Page ID: 3c14860078b080b09954c73105352c9f

**Tracks database (already exists — configure, do not recreate):**
https://app.notion.com/p/3c14860078b080c89ba5cbfe21d44763
Database ID: 3c14860078b080c89ba5cbfe21d44763

## Part 1 — Tracks database

Rename/add properties EXACTLY:

| Property | Type | Options |
|---|---|---|
| Name | Title | |
| Impact Line | Text | |
| Track | Select | Relocation, Vendor/Spend, Space Readiness, Events/Holiday Party |
| Tags | Multi-select | Office Move, Vendor Mgmt, Employee Experience, Events, Facilities, Budget |
| Metric Delta | Text | |
| Source | Select | Gmail, Slack, Granola, Other |
| Week Of | Date | |
| Asset Needed | Text | |
| Status | Select | Captured, Ready for personal, Harvested, Parked |

Views: Board (group by Track), Table (sort Week Of desc).

## Part 2 — Under Capture Hub parent (create if missing)

**Intro text at top of parent page:**
Friday packet from Vanta SF HQ (via Cushman & Wakefield).
Work side writes. Personal side harvests into CollinHQ.github.io.
Primary project id: vanta-sf-hq-ops

**Child page: Weekly Summary** — template with ## Week of YYYY-MM-DD and bullet placeholders.

**Database: Asset Gaps** — properties: Name (title), Project Id (select: vanta-sf-hq-ops), Keyword Trigger (text), Status (select: Needed, Shot, In repo, Dropped), Week Of (date), Notes (text). Seed 5 Needed rows: staged monitors, move-day ops, pantry, holiday party, SOP screenshot.

**Database: Experience Bank** — properties: Name, Impact Line, Destination (select: Portfolio project, Resume bullet, Experience highlight, Homepage win, Hold), Project Id (vanta-sf-hq-ops, none), Track (four tracks), Metric, Week Of, Status (Candidate, Approved, Published, Dropped), Source Week.

**Child page: Collin Brief** — template with What moved / Blockers / Next week.

Do not duplicate existing Tracks DB. When done, list all links and any manual steps for Notion integration at https://www.notion.so/my-integrations (integration name: Friday Capture).
```

---

## If you use Notion AI inside the app (no Cursor)

Notion AI cannot always create database schemas reliably. Prefer **Cursor desktop + Notion MCP** with Prompt A.

Manual fallback for Tracks only (~5 min):

1. Open your database link  
2. Click `+` on the header row for each missing column  
3. Match names/types from Prompt A table exactly  
4. For Select columns: click the property → **Edit property** → add each option  
5. **+ Add a view** → Board → Group by **Track**  
6. **+ Add a view** → Table → Sort **Week Of** descending  

---

## Connect Notion MCP in Cursor (one-time)

1. Open **Cursor** on your **personal** laptop  
2. **Settings** → **MCP** → **Notion** → Connect / Authenticate  
3. New Agent chat → paste Prompt A  
4. If it fails: Capture Hub → `⋯` → **Connections** → ensure your Notion integration is connected to the Tracks database  

Integration create (for write access): https://www.notion.so/my-integrations

---

## Your Notion IDs (saved)

| Item | URL | ID |
|---|---|---|
| **Capture Hub** (parent) | https://app.notion.com/p/Capture-Hub-3c14860078b080b09954c73105352c9f | `3c14860078b080b09954c73105352c9f` |
| **Tracks** (database) | https://app.notion.com/p/3c14860078b080c89ba5cbfe21d44763 | `3c14860078b080c89ba5cbfe21d44763` |

API format (with dashes): Capture Hub `3c148600-78b0-80b0-9954-c73105352c9f` · Tracks `3c148600-78b0-80c8-9baf-cbfe21d44763`
