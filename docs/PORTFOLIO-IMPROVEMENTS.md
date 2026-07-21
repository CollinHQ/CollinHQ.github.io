# Portfolio improvements log

Living notes for Collin Brown’s portfolio ([collinhq.github.io](https://collinhq.github.io)).  
Branch work: `cursor/portfolio-proof-no-photos-df06` → PR [#1](https://github.com/CollinHQ/CollinHQ.github.io/pull/1).

---

## Goals

1. Market real workplace ops experience **without waiting on photos**
2. Screen well for **Workplace Experience Manager, Workplace Manager, Workplace Coordinator, Office Manager, Office Coordinator**
3. Lead with **scope + delivery + systems**, not hospitality-only language
4. Auto-track day-to-day wins so the site stays current

---

## What hiring managers want (research summary)

SF tech / corporate workplace roles filter for:

| Signal | Why it matters | Collin’s proof |
|---|---|---|
| **Scope** | Years, sq ft, headcount, # vendors/sites | 7+ yrs, 13K sq ft, ~300 people, 8+ offices |
| **Delivery** | Moves / build-outs with budget + downtime | BRIDGE zero downtime + 17% under; fintech no-GC build-out |
| **Systems** | Automation / compliance that scales | Klaviyo COI → 8+ global offices |
| **EX with a metric** | Attendance, savings, ticket cuts | 35% attendance lift; $30K under; ~$15K/yr signage |
| **Named tools** | Envoy, Monday.com, Notion, Freshworks | Listed on Skills + in stories |

Soft “I love making people feel welcome” is table stakes. **Owned X for Y people / Z sq ft** gets interviews.

---

## Shipped in this PR (by round)

### Round 1 — Proof without photos
- Outcome-led project cards (flip UX removed)
- Case studies opened for flagship projects
- Company logo strip on home
- What I Bring value props with named receipts
- Testimonials on home
- Empty **testimonial** placeholders removed from case studies
- Sitemap updated for case-study URLs

### Round 2 — Hiring-manager alignment
- Hero **scope strip**: `7+ yrs · 13K no GC · ~300 moved · 8+ COI`
- Hero tags + CTA into flagship BRIDGE move story
- Featured trio: **HQ move → build-out → COI system** (not redesign)
- Stats retargeted to those receipts
- Projects page grouped: Build/Move · Systems · Experience
- Mid-page Hire CTA
- `proof_line` on flagship cards
- Werqwise quote on OptiSigns case study; testimonial source shown

### Round 3 — Role family targeting
- Open to: WEM · Workplace Manager · Workplace Coordinator · Office Manager · Office Coordinator
- Hero `title_line`, hire pills, contact/case-study CTAs
- SEO title, meta, keywords, OG/Twitter, schema `knowsAbout`
- Schema `jobTitle` = current role (**Workplace Coordinator**)

### Round 4 — Auto wins from Notion
- Home **Recent wins** feed (`src/data/wins.json`)
- Sync script: `npm run sync:wins`
- Weekly Action: `.github/workflows/sync-wins.yml`
- Setup guide: [`WINS-NOTION.md`](./WINS-NOTION.md)

---

## Photos to hunt (highest impact first)

1. **Fintech HQ** — wide finished floor + kitchen + one true before/shell
2. **BRIDGE move** — Monday-ready desks / new office wide shot
3. **BRIDGE amenities** — break room in use
4. **Events** — Halloween (scale) + one holiday party
5. **OptiSigns** — screen in space, or anonymized Monday.com COI board
6. Optional: **Cushman & Wakefield** logo for the companies strip

Drop files into `public/assets/images/projects/<project-id>/` as `hero.jpg` / `before.jpg` / `after.jpg`.

---

## Notion wins — how it works

```
Notion DB (Publish ✓) → GitHub Action (Sunday / manual)
  → src/data/wins.json → Home “Recent wins” → Pages deploy
```

**Do:** log Name + Date + Metric + Project + Type; check Publish when clean.  
**Don’t auto-publish:** hero, featured case studies, sensitive client/invoice detail.

Full setup: [`WINS-NOTION.md`](./WINS-NOTION.md).

Until secrets `NOTION_TOKEN` + `NOTION_WINS_DB_ID` are set, seed wins stay live and the Action skips safely.

---

## Draft ideas (not all applied)

### Lowercase parentheticals on project cards
User dislikes asides like `(furniture)` / `(the move)` on card bullets.

**Option A** — rewrite the first 3 highlights per flagship project (cleaner copy).  
**Option B** — strip parentheticals in `ProjectCard` display only:

```js
const clean = (text) => text.replace(/\s*\([^)]*\)/g, '').replace(/\s{2,}/g, ' ').trim()
```

**Option C** — uppercase `proof_line` to match metric labels.

### Still recommended
- 1–2 more manager quotes (BRIDGE / Klaviyo / C&W)
- Defendable annual OpEx / active vendor count if available
- Surface Werqwise churn → 3.5% (already in experience data) as a home metric or win
- Cushman logo asset for CompaniesBar

---

## Known gaps / follow-ups

| Item | Status |
|---|---|
| Case study dashed photo boxes when JSON path exists but file missing | Fixed — hide missing images |
| `App.jsx` stale “hidden case study” comment | Fixed |
| Parenthetical asides on project card bullets | Fixed — stripped on display |
| Orphan projects not on Projects page (`vendor-budget-ops`, `internal-comms`, `office-ops-playbook`, `aesthetic-space-design`) | Intentional demote until they have outcomes |
| Scope strip + StatsBar near-duplicate | Acceptable; could compress later |
| `EDITING.md` vs all new fields | Partially updated |
| Notion MCP not connected in cloud agent | Manual DB create via WINS-NOTION.md |

---

## Key files

| Path | Role |
|---|---|
| `src/data/about.json` | Bio, stats, scope strip, target roles, value props |
| `src/data/projects.json` | Project cards + case studies |
| `src/data/wins.json` | Recent wins feed (Notion sync target) |
| `src/components/RecentWins.jsx` | Wins UI |
| `src/components/HireCTA.jsx` | Role-family hire block |
| `src/components/ScopeStrip.jsx` | Hero metrics |
| `scripts/sync-wins-from-notion.mjs` | Notion → JSON |
| `.github/workflows/sync-wins.yml` | Weekly sync |
| `EDITING.md` | How Collin edits copy on GitHub |

---

## How to edit without code

See [`EDITING.md`](../EDITING.md). Golden rule: only change words inside `" "` quotes in `src/data/*.json`.

---

## Copy tone note

Prefer outcome-level numbers (sq ft, % under budget, attendance lift) over headcount/budget micro-specs. Avoid exact figures like `500+ employees`, `428 guests`, or `sub-$500/mo` — use “staff organization-wide,” “hundreds of guests,” “lean budget,” etc.

*Last updated: 2026-07-21*
