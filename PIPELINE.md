# End-to-End Information Pipeline (Vanta / C&W)

How portfolio signal moves from the work laptop → Notion → this repo → the live site.

```
Work Agent (Friday) → Notion Capture Hub → Personal Agent harvest → projects.json → GitHub Pages
```

## Roles

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

Setup checklist (manual or via Notion-connected Cursor): [`docs/notion-capture-hub.md`](docs/notion-capture-hub.md).

## Phase 3 — Harvest (Personal Agent)

1. Open Notion → copy **Weekly Summary** (and any Track metric deltas).
2. In Cursor on this repo, paste into chat with the prompt in [`docs/harvest-prompt.md`](docs/harvest-prompt.md).
3. Apply the JSON patch to [`src/data/projects.json`](src/data/projects.json) (usually the `vanta-sf-hq-ops` entry).
4. Drop any new photos into `public/assets/images/projects/vanta-sf-hq-ops/` and clear matching `photos_needed` items.
5. Commit and push. GitHub Actions redeploys the site.

Schema reference: [`docs/projects.schema.md`](docs/projects.schema.md).  
Self-serve text edits without AI: [`EDITING.md`](EDITING.md).

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
