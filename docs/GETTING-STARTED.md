# Pipeline setup — start here

Assume you’re starting from zero. Do these **in order**.

**Live site:** https://collinhq.github.io  
**Repo:** https://github.com/CollinHQ/CollinHQ.github.io  
**This pipeline’s PR (merge first):** https://github.com/CollinHQ/CollinHQ.github.io/pull/3

---

## What the pipeline does (plain English)

Every **Friday on your work laptop**, an agent:

1. Reads Gmail / Slack / Granola from the week  
2. Finds real accomplishments (not routine chatter)  
3. Rewrites them as portfolio-ready impact lines  
4. Saves a **Friday packet** to your **personal Notion Capture Hub**

Later on your **personal laptop**, another agent:

1. Reads that packet  
2. **Suggests** what goes on the portfolio site vs. your Experience Bank  
3. You approve → changes go to GitHub → site updates  

Work laptop **never** pushes to GitHub. You stay in control of what goes public.

---

## What’s already done (you don’t need to build this)

| Done | Where |
|---|---|
| Portfolio site + auto-deploy on push to `main` | GitHub Actions |
| `vanta-sf-hq-ops` project card (needs photos later) | PR #3 |
| Friday Work Agent prompt | [`work-agent-friday.md`](./work-agent-friday.md) |
| Personal harvest prompt (suggest → approve) | [`harvest-prompt.md`](./harvest-prompt.md) |
| Capture Hub blueprint | [`CAPTURE-HUB-SETUP.md`](./CAPTURE-HUB-SETUP.md) |
| Homepage wins sync script (optional) | [`WINS-NOTION.md`](./WINS-NOTION.md) |

---

## Step 1 — Merge the pipeline PR (5 min)

**You do this.**

1. Open https://github.com/CollinHQ/CollinHQ.github.io/pull/3  
2. Click **Merge pull request** → **Confirm merge**  
3. Wait ~1 minute for the site to redeploy  

After merge, `vanta-sf-hq-ops` appears on the Projects page (no photos yet — that’s OK).

---

## Step 2 — Create Notion Capture Hub (15–20 min, once)

**You do this** in your **personal** Notion account (not work Notion).

**Shortcut:** if another AI has Notion access (Cursor desktop + Notion MCP), paste
[`notion-setup-agent-prompt.md`](./notion-setup-agent-prompt.md) — uses private run-time placeholders for your Tracks database.

Manual click-by-click below, or see [`CAPTURE-HUB-SETUP.md`](./CAPTURE-HUB-SETUP.md).

### 2a. Parent page

1. Go to https://www.notion.so  
2. Click **New page** (sidebar)  
3. Title: `Capture Hub`  
4. Paste at the top:

```
Friday packet from Vanta SF HQ (via Cushman & Wakefield).
Work side writes. Personal side harvests into CollinHQ.github.io.
Primary project id: vanta-sf-hq-ops
```

### 2b. Weekly Summary (subpage)

1. On the Capture Hub page, type `/page` → **Page**  
2. Name it `Weekly Summary`  
3. Paste:

```
## Week of YYYY-MM-DD
- (portfolio-ready impact bullet)
- (portfolio-ready impact bullet)
```

### 2c. Tracks (database)

1. On Capture Hub, type `/database` → **Database – Full page**  
2. Rename to `Tracks`  
3. Add/rename properties to match **exactly**:

| Property name | Type | Options to create |
|---|---|---|
| Name | Title | (already there) |
| Impact Line | Text | |
| Track | Select | `Relocation`, `Vendor/Spend`, `Space Readiness`, `Events/Holiday Party` |
| Tags | Multi-select | `Office Move`, `Vendor Mgmt`, `Employee Experience`, `Events`, `Facilities`, `Budget` |
| Metric Delta | Text | |
| Source | Select | `Gmail`, `Slack`, `Granola`, `Other` |
| Week Of | Date | |
| Asset Needed | Text | |
| Status | Select | `Captured`, `Ready for personal`, `Harvested`, `Parked` |

4. Add a **Board** view grouped by **Track**  
5. Add a **Table** view sorted by **Week Of** (newest first)

**How to add a property in Notion:** click `+` in the table header → pick type → name it exactly as above.

### 2d. Asset Gaps (database)

1. Another full-page database on Capture Hub → name `Asset Gaps`  
2. Properties:

| Name | Type | Options |
|---|---|---|
| Name | Title | |
| Project Id | Select | `vanta-sf-hq-ops` |
| Keyword Trigger | Text | |
| Status | Select | `Needed`, `Shot`, `In repo`, `Dropped` |
| Week Of | Date | |
| Notes | Text | |

3. Add **5 rows** with Status = `Needed`:

- Staged workstation / monitor install  
- Move-day operations  
- Pantry / amenity program  
- Holiday party venue or production (when allowed)  
- Anonymized walkthrough SOP checklist screenshot  

### 2e. Experience Bank (database)

1. Full-page database → name `Experience Bank`  
2. Properties:

| Name | Type | Options |
|---|---|---|
| Name | Title | |
| Impact Line | Text | |
| Destination | Select | `Portfolio project`, `Resume bullet`, `Experience highlight`, `Homepage win`, `Hold` |
| Project Id | Select | `vanta-sf-hq-ops`, `none` |
| Track | Select | same four as Tracks |
| Metric | Text | |
| Week Of | Date | |
| Status | Select | `Candidate`, `Approved`, `Published`, `Dropped` |
| Source Week | Text | |

### 2f. Collin Brief (subpage)

1. Subpage named `Collin Brief`  
2. Paste:

```
# Collin Brief — Week of YYYY-MM-DD
Client: Vanta SF HQ (via Cushman & Wakefield)

## What moved
- …

## Blockers
- …

## Next week
- …
```

### 2g. Bookmark the hub

Copy the Capture Hub URL — you’ll need it on both laptops.

**Detailed reference:** [`CAPTURE-HUB-SETUP.md`](./CAPTURE-HUB-SETUP.md)

---

## Step 3 — Connect Notion to Cursor (optional but recommended)

**You do this** on each laptop where you’ll run agents.

### Personal laptop (harvest)

1. Open **Cursor** → **Settings** (gear) → **MCP**  
2. Add/connect the **Notion** server (follow Cursor’s Notion auth flow)  
3. Test: new chat → “List my Notion pages named Capture Hub”

Docs: https://docs.cursor.com/context/mcp (MCP overview)

### Work laptop (Friday Detective)

Same Notion MCP setup **or** skip for now and paste the Friday packet manually (Step 5b).

### Notion integration for agents to *write* (later)

1. https://www.notion.so/my-integrations  
2. **New integration** → name `Friday Capture`  
3. Copy the **Internal Integration Secret** (`secret_…`) — store in a password manager  
4. Open **Capture Hub** in Notion → top-right `⋯` → **Connections** → connect `Friday Capture`  
5. Repeat for each database (Tracks, Asset Gaps, Experience Bank) if they don’t inherit access  

Integration docs: https://developers.notion.com/docs/create-a-notion-integration

---

## Step 4 — Set up Friday on the work laptop

**You do this** once, then repeat every Friday.

### 4a. Calendar reminder

Create a recurring event: **Friday 4:00 PM — Friday Detective** (adjust time).  
Description: “Run Cursor Work Agent → Capture Hub. Do not edit GitHub.”

### 4b. Connect work tools in Cursor

On the **work laptop**, in Cursor **Settings → MCP**, connect what you have:

| Tool | Used for |
|---|---|
| **Granola** | Meeting notes / decisions |
| **Slack** | Work channels |
| Gmail | If available via MCP or paste exports |

Granola is already useful for “what happened in meetings this week.”

### 4c. First Friday run (copy-paste prompt)

1. Open Cursor on the **work laptop**  
2. New Agent chat  
3. Open this file in the repo (after PR merge) or copy from GitHub:  
   [`docs/work-agent-friday.md`](https://github.com/CollinHQ/CollinHQ.github.io/blob/main/docs/work-agent-friday.md)  
4. Paste the **whole file** as your first message, then add:

```
Run the Friday Detective for the week ending today.
Scan Granola, Slack, and any work email I have connected.
Write the Friday packet to my Notion Capture Hub:
- Weekly Summary (dated section)
- Tracks rows (Status = Ready for personal)
- Asset Gaps if needed
- Experience Bank candidates (Status = Candidate)
- Collin Brief

Capture Hub URL: [PASTE YOUR NOTION URL HERE]
```

5. If Notion isn’t connected yet → agent outputs Markdown → you paste into Notion (2 min)

**Rule:** work laptop never runs `git push` on the portfolio repo.

---

## Step 5 — Personal review (weekend or whenever)

**You do this** on the **personal laptop**.

1. Open Notion → Capture Hub → **Tracks** → filter **Status = Ready for personal**  
2. Open the portfolio repo in Cursor (clone if needed):

```bash
git clone https://github.com/CollinHQ/CollinHQ.github.io.git
cd CollinHQ.github.io
```

3. New Agent chat  
4. Paste everything below the `---` in [`docs/harvest-prompt.md`](./harvest-prompt.md)  
5. Add your packet:

```
Here is this week's Capture Hub packet:

[PASTE Weekly Summary + Tracks + Experience Bank candidates]
```

Or, with Notion MCP: “Read Capture Hub Tracks where Status is Ready for personal and run the harvest prompt.”

6. Agent returns **suggestions only** — review the list  
7. Reply: **“Approve items 1, 2, and 4”** (or edit first)  
8. Agent applies changes → you commit:

```bash
git add -A
git commit -m "Harvest: week of YYYY-MM-DD"
git push
```

9. In Notion, mark processed Tracks **Harvested** and Experience Bank rows **Published** or **Approved**

Site updates in ~1 minute after push to `main`.

---

## Step 6 — Optional: auto-sync homepage “Recent wins”

Separate from Capture Hub. Good for one-liners on the home page.

**You do this** once (~15 min). Full detail: [`WINS-NOTION.md`](./WINS-NOTION.md)

1. In Notion, create database **Portfolio Wins** with properties: Name, Date, Metric, Project, Type, Publish, Detail  
2. Add Project option `vanta-sf-hq-ops` (and others from WINS-NOTION.md)  
3. https://www.notion.so/my-integrations → integration **Portfolio Wins Sync** → connect to that database  
4. Copy database ID from the URL (32-character hex)  
5. GitHub → https://github.com/CollinHQ/CollinHQ.github.io/settings/secrets/actions  
   - New secret `NOTION_TOKEN` = integration secret  
   - New secret `NOTION_WINS_DB_ID` = database ID  
6. https://github.com/CollinHQ/CollinHQ.github.io/actions/workflows/sync-wins.yml → **Run workflow**  
7. Habit: new row → check **Publish** when wording is clean  

Until secrets are set, the Sunday job runs but does nothing (safe — it won’t wipe your wins).

---

## Step 7 — Photos (when you have them)

**You do this** when you take publishable photos.

1. Save files to your personal machine  
2. Copy into repo folder:

```
public/assets/images/projects/vanta-sf-hq-ops/hero.jpg
```

3. Remove matching lines from `photos_needed` in `src/data/projects.json`  
4. Commit + push  

Photo import helper (optional): see [`TRACKING-WINS.md`](./TRACKING-WINS.md) for `process-project-photos.mjs`.

---

## Quick reference — which file when

| When | File / link |
|---|---|
| Setting up Notion hub | [`CAPTURE-HUB-SETUP.md`](./CAPTURE-HUB-SETUP.md) |
| Every Friday (work) | [`work-agent-friday.md`](./work-agent-friday.md) |
| Personal review | [`harvest-prompt.md`](./harvest-prompt.md) |
| Edit site text without AI | [`../EDITING.md`](../EDITING.md) |
| Homepage one-liners | [`TRACKING-WINS.md`](./TRACKING-WINS.md) + [`WINS-NOTION.md`](./WINS-NOTION.md) |
| Big picture | [`../PIPELINE.md`](../PIPELINE.md) |

---

## Checklist — am I ready for my first Friday?

- [ ] PR #3 merged  
- [ ] Capture Hub exists in personal Notion (all 5 pieces)  
- [ ] Capture Hub URL bookmarked  
- [ ] Friday calendar reminder set (work laptop)  
- [ ] Cursor open on work laptop with Granola/Slack connected  
- [ ] Portfolio repo cloned on personal laptop  
- [ ] (Optional) Notion MCP connected on personal laptop  
- [ ] (Optional) Portfolio Wins + GitHub secrets for homepage sync  

When all required boxes are checked, run Step 4 on Friday and Step 5 when you’re ready to publish.

---

## If you get stuck

| Problem | Fix |
|---|---|
| Agent can’t write Notion | Use manual paste (Step 4c) — still works |
| Not sure what to approve | Say “only suggest, don’t edit files yet” |
| Broke a JSON file | GitHub → file → History → revert, or ask Cursor to fix syntax |
| Work blocked from GitHub | Correct — only use Notion from work |
| Empty Recent wins after sync | Check Publish checkbox + GitHub secrets + database shared with integration |

Ask Cursor: **“Walk me through GETTING-STARTED.md step 4”** with this repo open.
