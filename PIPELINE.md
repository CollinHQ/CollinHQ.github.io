# End-to-End Information Pipeline (Vanta / C&W)

Friday **scheduled** packet (not continuous auto-scan): work laptop does the heavy
lift → personal Notion Capture Hub → personal laptop suggests portfolio + experience-bank updates.

```
Work Agent (Friday scheduled)
  → scan / gather / sanitize / sort
  → write Friday packet to Notion Capture Hub
Personal Agent (weekend / when ready)
  → read Ready-for-personal rows
  → suggest: portfolio (projects.json / wins) + Experience Bank destinations
  → you approve → draft PR → Acceptance → human merge → GitHub Pages
```

**Bridge = Notion** (structured). Use Google Drive only for photo/PDF drop folders if needed — not for the weekly text packet.

## Current status (honest)

**This file is a runbook + contract, not a running system.** Nothing schedules the
Friday Work Agent or auto-applies harvests into `projects.json` today.

| Piece | Status | Notes |
|---|---|---|
| Phase 4 — GitHub Pages deploy | **Works** | `.github/workflows/deploy.yml` builds on push to `main` |
| Homepage “Recent wins” sync code | **Built, not connected** | Script + Sunday cron exist; Actions logs show `NOTION_TOKEN` / `NOTION_WINS_DB_ID` are **empty**, so the job no-ops every week |
| `vanta-sf-hq-ops` project card | **Seeded** | In `src/data/projects.json`; photo folder empty; `case_study_ready: false` |
| Notion Capture Hub | **Setup status unverified** | Confirm privately; click-by-click: [`docs/CAPTURE-HUB-SETUP.md`](docs/CAPTURE-HUB-SETUP.md) |
| Friday Work Agent | **Prompt only** | [`docs/work-agent-friday.md`](docs/work-agent-friday.md) — run on a schedule / reminder on the work laptop |
| Personal harvest | **Prompt only** | [`docs/harvest-prompt.md`](docs/harvest-prompt.md) — suggestions first, then you approve |

**Lighter path already in repo:** [`docs/WINS-NOTION.md`](docs/WINS-NOTION.md) for homepage one-liners. Use Capture Hub when the week deserves real project / experience-bank decisions.

---

## What to do to make it usable (minimum viable)

**Start here if you’re new:** [`docs/GETTING-STARTED.md`](docs/GETTING-STARTED.md) — step-by-step with links.

Do these in order. After step 3 you have a **manual but usable** loop. After step 5 the homepage feed can auto-update.

### 1. Keep the seeded project current (repo)

- Keep `vanta-sf-hq-ops` in `projects.json`.
- Add `vanta-sf-hq-ops` to the Notion **Portfolio Wins** Project select options (see `docs/WINS-NOTION.md`).
- Drop real photos into `public/assets/images/projects/vanta-sf-hq-ops/` when you have them (`hero.jpg` first), then clear matching `photos_needed` items.

### 2. Create the Notion Capture Hub (once, ~20 min)

Follow the simple checklist: [`docs/CAPTURE-HUB-SETUP.md`](docs/CAPTURE-HUB-SETUP.md)

Creates: Weekly Summary · Tracks · Asset Gaps · **Experience Bank** · Collin Brief.

Optional: connect **Notion MCP** in Cursor desktop and ask it to build from that doc.

### 3. Run the Friday → personal loop (usable pipeline)

**Friday (work laptop) — bulk of the work:**

1. Reminder / Cursor Automation / calendar block: “Friday Detective.”
2. Open Cursor with Gmail / Slack / Granola available.
3. Run [`docs/work-agent-friday.md`](docs/work-agent-friday.md).
4. Agent: scan → gather → sanitize → sort into Tracks / Weekly Summary / Asset Gaps / Experience Bank **candidates**.
5. Mark Tracks `Ready for personal`. **Do not touch this GitHub repo from work.**

**Personal laptop — recommendations, then you approve:**

1. Open Capture Hub → filter Tracks where Status = `Ready for personal`.
2. In this repo, run [`docs/harvest-prompt.md`](docs/harvest-prompt.md) (paste or Notion MCP).
3. Agent **suggests** only:
   - portfolio patches (`projects.json` / homepage wins)
   - Experience Bank destinations (resume / experience / hold)
4. You approve → apply → validate → open a draft PR → merge after Acceptance passes.
5. Mark rows `Harvested` / Experience Bank `Published` as appropriate.

Until Capture Hub exists, paste the Friday Markdown packet straight into the harvest prompt.

### 4. Usable *today* without Capture Hub

If you only want the site to stay current:

```bash
# one-liner on the home page (no Notion required)
git switch main
git pull --ff-only
git switch -c win/YYYY-MM-DD
npm run log-win -- --win "Your portfolio-ready sentence" --type currently --project vanta-sf-hq-ops
npm run build
git add src/data/wins.json
git diff --cached --check
git commit -m "chore: log win"
git push -u origin win/YYYY-MM-DD
gh pr create --draft --fill
```

Or edit `src/data/wins.json` / `projects.json` on GitHub per [`EDITING.md`](EDITING.md).

### 5. Turn on the existing Notion → wins automation

This unlocks the **homepage feed**, not deep case-study harvest.

1. Create the **Portfolio Wins** database (`docs/WINS-NOTION.md`) — include `vanta-sf-hq-ops` in Project options.
2. Create a Notion internal integration; share the DB with it.
3. Add GitHub Actions secrets: `NOTION_TOKEN`, `NOTION_WINS_DB_ID`.
4. Actions → **Sync wins from Notion** → **Run workflow**.
5. Habit: new row → check **Publish** when the wording is hiring-manager clean.

Until secrets are set, Sunday cron will keep reporting success while doing nothing (verified Aug 2026: both secrets empty).

---

## Scheduled two-laptop design (what you want)

Not continuous scanning — a **Friday scheduled Work run** + a **personal review run**.

| Side | Job | Output |
|---|---|---|
| **Work** | Scan Gmail / Slack / Granola; gather; sanitize; sort | Friday packet in Capture Hub (`Ready for personal`) |
| **Bridge** | Personal Notion Capture Hub | Weekly Summary, Tracks, Asset Gaps, Experience Bank candidates, Collin Brief |
| **Personal** | Read packet; propose portfolio + experience-bank moves | Suggestions → you approve → git |

**Notion vs Google Drive:** put the text packet in **Notion**. Use Drive only if you need a photo drop folder the personal laptop can see.

**To harden later (after a few manual Fridays):**
1. Calendar / Cursor Automation on work laptop for Friday Detective  
2. Notion integration so Work Agent writes Capture Hub without paste  
3. Keep the personal-side **draft PR** and Acceptance review boundary
4. Keep photos human-approved  

Do **not** auto-publish from work to the live site.

---

## Roles (design)

| Phase | Where | Who / what | Output |
|---|---|---|---|
| 1. Detective | Work laptop | Work Agent scans Gmail / Slack / Granola | Portfolio-ready wins + asset gaps written to Notion |
| 2. Bridge | Notion | Capture Hub | Weekly Summary, Tracks, Asset Gaps, Collin Brief |
| 3. Editor | Personal laptop | You + Personal Agent (this repo) | Patched `src/data/projects.json` + photos in `/public/assets` |
| 4. Live site | GitHub Pages | CI deploy on push to `main` | Updated cards / stats |

## Job context

- **Employer:** Cushman & Wakefield
- **Client / site:** Vanta SF headquarters
- **Primary project id in this repo:** `vanta-sf-hq-ops`
- **Live workstreams:** HQ relocation, vendor/spend + pantry, space-readiness walkthroughs, holiday party (~300 guests)

## Phase 1 — Friday scan (Work Agent)

Full prompt: [`docs/work-agent-friday.md`](docs/work-agent-friday.md).

**Keywords to watch:** Vanta, HQ relocation / move, monitors / workstations, pantry / snack, procurement, walkthrough, holiday party, venue, COI, building management, Cushman.

**Translation rule:** do not paste raw ops chatter. Rewrite as an impact line.

| Raw signal | Portfolio line |
|---|---|
| “Mover bid came in high; switching install partner for the 100 monitors.” | Negotiated an alternate AV/install vendor to protect the Vanta HQ move timeline and spend. |
| “I’m adding a Friday floor walk with a checklist.” | Built a recurring space-readiness walkthrough SOP covering every floor of the SF HQ. |
| “Locked the holiday party venue for ~300.” | Secured venue and production path for a ~300-guest company holiday party. |

**Also write Asset Gaps** when the week mentions something photogenic (staged desks, move day, pantry reset, event production).

## Phase 2 — Notion Capture Hub

Parent page: **Capture Hub**, with:

- **Weekly Summary** — Friday Signal wins (portfolio-ready bullets)
- **Tracks** — Relocation · Vendor/Spend · Space Readiness · Events/Holiday Party
- **Asset Gaps** — photo / proof tasks
- **Collin Brief** — short shareable brief for the week

Property conventions (mirror JSON): Track, Tags, Impact Line, Metric Delta, Asset Needed, Source, Week Of.

Setup checklist: [`docs/notion-capture-hub.md`](docs/notion-capture-hub.md).

## Phase 3 — Harvest (Personal Agent)

1. Open Notion → copy **Weekly Summary** (and any Track metric deltas).
2. In Cursor on this repo, paste into chat with the prompt in [`docs/harvest-prompt.md`](docs/harvest-prompt.md).
3. Apply the JSON patch to [`src/data/projects.json`](src/data/projects.json) (usually the `vanta-sf-hq-ops` entry).
4. Drop any new photos into `public/assets/images/projects/vanta-sf-hq-ops/` and clear matching `photos_needed` items.
5. Run `npm run build`, stage exact approved paths, and open a draft PR. Merge only
   after Acceptance passes; GitHub Actions then redeploys the site.

Schema reference: [`docs/projects.schema.md`](docs/projects.schema.md).  
Self-serve text edits without AI: [`EDITING.md`](EDITING.md).  
One-liner feed (separate path): [`docs/TRACKING-WINS.md`](docs/TRACKING-WINS.md).

## Phase 4 — Live site

The React app reads JSON at build time. You do not edit HTML for content updates. After merge to `main`, wait ~1 minute for Pages to refresh.

## Field map (sketch → this repo)

| Sketch field | Actual field |
|---|---|
| `project_name` | `title` |
| `tags` | `tags` |
| `stats` | `numbers` + optional `outcome_headline` |
| `narrative.challenge` / `solution` | `description` + `key_highlights` / `milestones_completed` |
| `images` | `images.hero` / `.before` / `.after` |
