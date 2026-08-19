# End-to-End Information Pipeline (Vanta / C&W)

How portfolio signal is *supposed* to move from the work laptop → Notion → this repo → the live site.

```
Work Agent (Friday) → Notion Capture Hub → Personal Agent harvest → projects.json → GitHub Pages
```

## Current status (honest)

**This file is a runbook + contract, not a running system.** Nothing in this repo
automatically scans Gmail/Slack/Granola or harvests into `projects.json` today.

| Piece | Status | Notes |
|---|---|---|
| Phase 4 — GitHub Pages deploy | **Works** | `.github/workflows/deploy.yml` builds on push to `main` |
| Homepage “Recent wins” sync code | **Built, not connected** | Script + Sunday cron exist on `main`; Actions logs show `NOTION_TOKEN` / `NOTION_WINS_DB_ID` are **empty**, so the job no-ops every week |
| `vanta-sf-hq-ops` project card | **Seeded** | In `src/data/projects.json`; photo folder is empty (`.gitkeep` only); `case_study_ready: false` |
| Notion Capture Hub | **Not created** | Spec only: [`docs/notion-capture-hub.md`](docs/notion-capture-hub.md) |
| Friday Detective (Phase 1) | **Prompt only** | [`docs/work-agent-friday.md`](docs/work-agent-friday.md) — must be run manually in Cursor on the work laptop with Gmail/Slack/Granola connected |
| Personal harvest (Phase 3) | **Prompt only** | [`docs/harvest-prompt.md`](docs/harvest-prompt.md) — paste Notion text into Cursor; no API sync into `projects.json` |
| Full automation (scan → site with no paste) | **Not built** | Would need always-on work-laptop access + Notion write + a harvest bot. High friction across two machines / two employers. |

**Related system that already exists (lighter path):**  
[`docs/WINS-NOTION.md`](docs/WINS-NOTION.md) + `npm run sync:wins` + `.github/workflows/sync-wins.yml` sync **published one-liners** into `src/data/wins.json` for the home page. That is *not* the same as patching case-study fields on `vanta-sf-hq-ops`. Use wins for the feed; use this pipeline when a week deserves real project updates.

---

## What to do to make it usable (minimum viable)

Do these in order. After step 3 you have a **manual but usable** loop. After step 5 the homepage feed can auto-update.

### 1. Finish / merge this branch’s seed (repo)

- Keep `vanta-sf-hq-ops` in `projects.json`.
- Add `vanta-sf-hq-ops` to the Notion **Portfolio Wins** Project select options (see `docs/WINS-NOTION.md`).
- Drop real photos into `public/assets/images/projects/vanta-sf-hq-ops/` when you have them (`hero.jpg` first), then clear matching `photos_needed` items.

### 2. Create the Notion Capture Hub (once, ~20 min)

Follow [`docs/notion-capture-hub.md`](docs/notion-capture-hub.md) in your **personal** Notion:

- Parent page **Capture Hub**
- Child page **Weekly Summary**
- Database **Tracks** (properties exactly as listed)
- Database **Asset Gaps** (seed the five default Needed rows)
- Child page **Tyler Brief**

Optional: connect **Notion MCP** in Cursor desktop and ask an agent to build this from that doc.

### 3. Run the Friday → harvest loop by hand (usable pipeline)

**Friday (work laptop):**

1. Open Cursor with Gmail / Slack / Granola tools available.
2. Paste [`docs/work-agent-friday.md`](docs/work-agent-friday.md) as the system prompt.
3. Tell it to write this week’s Signal into the Capture Hub (not into GitHub).

**Weekend / anytime (personal laptop):**

1. Copy this week’s Weekly Summary (+ Track metric deltas / Asset Gaps).
2. In this repo, paste into chat using [`docs/harvest-prompt.md`](docs/harvest-prompt.md).
3. Apply the JSON patch to `src/data/projects.json`.
4. Commit + push → Pages redeploys (~1 min).
5. Mark Track rows **Harvested** in Notion.

Until Capture Hub exists, you can skip Notion and paste rough Friday notes straight into the harvest prompt.

### 4. Usable *today* without Capture Hub

If you only want the site to stay current:

```bash
# one-liner on the home page (no Notion required)
npm run log-win -- --win "Your portfolio-ready sentence" --type currently --project vanta-sf-hq-ops
git add src/data/wins.json && git commit -m "chore: log win" && git push
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

## What would be needed for a *true* automated pipeline

Only pursue this after the manual loop works for a few weeks.

| Gap | What’s missing | Rough shape |
|---|---|---|
| Scheduled Friday Detective | No cron on the work laptop; no durable Gmail/Slack auth in this repo | Cursor Automation / scheduled agent on work machine with work MCP; write-only to personal Notion |
| Capture Hub write API | Hub may not exist; Work Agent needs Notion write access to *personal* workspace | Notion integration + page/DB IDs stored as env (not in git) |
| Auto-harvest into `projects.json` | Harvest is paste-a-prompt today | Personal-laptop agent or GitHub Action that reads Capture Hub via Notion API and opens a PR patching `vanta-sf-hq-ops` (prefer PR over direct push) |
| Photo pipeline | Empty asset folder | Keep human-in-the-loop; use `scripts/process-project-photos.mjs` after you drop files |
| Cross-employer safety | Work laptop must not push to this GitHub repo | Keep the hard split: work → Notion only; personal → git |

**Recommendation:** treat **wins sync + weekly paste harvest** as the product. Full auto-scan is optional and fragile across two laptops.

---

## Roles (design)

| Phase | Where | Who / what | Output |
|---|---|---|---|
| 1. Detective | Work laptop | Work Agent scans Gmail / Slack / Granola | Portfolio-ready wins + asset gaps written to Notion |
| 2. Bridge | Notion | Capture Hub | Weekly Summary, Tracks, Asset Gaps, Tyler Brief |
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
- **Tyler Brief** — short shareable brief for the week

Property conventions (mirror JSON): Track, Tags, Impact Line, Metric Delta, Asset Needed, Source, Week Of.

Setup checklist: [`docs/notion-capture-hub.md`](docs/notion-capture-hub.md).

## Phase 3 — Harvest (Personal Agent)

1. Open Notion → copy **Weekly Summary** (and any Track metric deltas).
2. In Cursor on this repo, paste into chat with the prompt in [`docs/harvest-prompt.md`](docs/harvest-prompt.md).
3. Apply the JSON patch to [`src/data/projects.json`](src/data/projects.json) (usually the `vanta-sf-hq-ops` entry).
4. Drop any new photos into `public/assets/images/projects/vanta-sf-hq-ops/` and clear matching `photos_needed` items.
5. Commit and push. GitHub Actions redeploys the site.

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
