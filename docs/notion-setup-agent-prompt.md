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

## Prompt B — Create the rest of Capture Hub (send parent page URL first)

After Prompt A, open your **Capture Hub parent page** in Notion → Copy link → replace `PASTE_CAPTURE_HUB_URL` below.

```
You have Notion MCP write access. Complete my **Capture Hub** under this parent page:

**Capture Hub parent URL:** PASTE_CAPTURE_HUB_URL

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

### 5. Child page: Tyler Brief

Template:

# Tyler Brief — Week of YYYY-MM-DD
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

## IDs from your link

| Item | Value |
|---|---|
| Tracks database URL | https://app.notion.com/p/3c14860078b080c89ba5cbfe21d44763 |
| Database ID (no dashes) | `3c14860078b080c89ba5cbfe21d44763` |
| Database ID (API format) | `3c148600-78b0-80c8-9baf-cbfe21d44763` |

Send the **Capture Hub parent page** link when you have it — add it to Prompt B.
