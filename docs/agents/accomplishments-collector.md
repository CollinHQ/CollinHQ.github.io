# Agent: Accomplishments collector

Use this brief whenever Collin (or anyone helping him) says things like:

- “collect my wins”
- “run the accomplishments collector”
- “what did I ship lately”
- “update recent wins”

## Goal

Gather work accomplishments from every available source, draft them in **Collin’s warm, specific voice** (not AI buzzwords), and either:

1. Propose additions to `docs/wins-candidates.md` / `docs/wins-inbox.md`, or  
2. Promote approved items into `src/data/wins.json` via `npm run log-win` (or direct JSON edit)

**Do not** rewrite hero copy, featured case studies, or testimonials unless asked.

## Voice rules (non-negotiable)

- Sound like Collin: warm, concrete, on-the-floor.
- Prefer “I lined up the movers so Monday was ready” over “leveraged cross-functional stakeholders.”
- Avoid: synergy, leverage, elevate, robust, seamless, landscape, cutting-edge, passionate about, “hiring managers actually want,” fake precision.
- Soften micro-budgets / exact headcounts unless Collin confirms they’re okay public.
- Company names OK to publish: **Rho** (not “Fintech Startup”), BRIDGE Housing, Klaviyo, Werqwise, Cushman & Wakefield, ConnectionsSF.
- **Do not name the current client.** The security-compliance company Collin supports via Cushman & Wakefield stays anonymized site-wide — write “a security-compliance company” / “the client”. Only Collin can lift this, and it has not been lifted.
- Project **ids** are separate from display names: Rho's build-out is still `fintech-hq-build-out` (the published URL). Use the id when passing `--project`, and the display name in prose.

## Translation rule (raw signal → impact line)

Never carry raw ops language onto the site. Rewrite each signal as a line a hiring
manager would respect — what changed, and what it protected or produced.

| Raw signal | Impact line |
|---|---|
| “Mover bid came in high; switching the install partner for the monitors.” | Pivoted a ~100-monitor install to an alternate vendor to protect the HQ move timeline and spend. |
| “I’m adding a Friday floor walk with a checklist.” | Built a recurring space-readiness walkthrough SOP covering every floor. |
| “Locked the venue for ~300.” | Secured venue and production path for a ~300-guest company holiday party. |
| “Pantry vendor markup is wild, buying differently.” | Rebuilt pantry procurement to cut markup and hold the snack program to budget. |

A signal only counts if it proves one of: **timeline saved, spend controlled,
experience improved, risk removed, scale created.** Routine activity is not a win.

## Tracks

File every win under one. Useful for spotting a thin quarter in one direction.

1. **Relocation** — move bids, monitors, building logistics, move-day sequencing
2. **Vendor/Spend** — procurement, approvals, COI/vendor onboarding, budget control
3. **Space Readiness** — walkthroughs, SOPs, facilities reliability
4. **Events** — venue, production, guest count, programming

## Asset gaps

When a win implies something photogenic — staged desks, move day, a pantry reset,
event production — add a concrete item to that project's `photos_needed` in
`src/data/projects.json` (see `docs/projects.schema.md`). Note the photo while the
thing is still standing; it cannot be recovered later. Clear the item once the
image lands in `public/assets/images/projects/<id>/`.

## Sources to check (in order)

1. `docs/wins-inbox.md` — scratch notes  
2. `docs/wins-candidates.md` — last collector run  
3. `src/data/experience.json` — especially `end: "Present"` highlights  
4. `src/data/resume.json` — new/expanded bullets  
5. `src/data/wins.json` — already published (skip duplicates)  
6. If tools are connected: Granola meetings, Slack, Notion Portfolio Wins DB, email — only with Collin’s okay for private client detail  

## Workflow

1. Run `npm run collect-wins` (refreshes `docs/wins-candidates.md` from local sources).  
2. Read inbox + candidates + current role.  
3. Deduplicate against `wins.json`.  
4. Draft 1–5 keepers as one-line wins in Collin’s voice.  
5. Show Collin the draft list before publishing if anything is sensitive.  
6. For each approved win:

```bash
npm run log-win -- --win "…" --type currently|milestone|highlight [--metric "…"] [--project fintech-hq-build-out|bridge-hq-relocation|…]
```

7. Commit + push when asked.  
8. Optional Notion: add the same row with **Publish** checked (see `docs/WINS-NOTION.md`).

## Output format for Collin

```
### Proposed wins
1. [currently] …
2. [milestone] … (project: fintech-hq-build-out)

### Skipped (already on site / too sensitive)
- …
```

## Use this today

```bash
# 1) Dump anything on your mind
#    edit docs/wins-inbox.md

# 2) Collect
npm run collect-wins

# 3) Promote a keeper
npm run log-win -- --win "What you finished" --type currently

# 4) Or tell Cursor:
#    “Run the accomplishments collector per docs/agents/accomplishments-collector.md”
```
