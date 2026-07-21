# Personal Agent harvest prompt

Copy everything below the line into Cursor (this repo open) after you paste the Notion Weekly Summary.

---

You are my Personal Agent for the CollinHQ portfolio repo.

Convert the Notion Capture Hub update I paste below into a **JSON patch** for `src/data/projects.json`, targeting project id **`vanta-sf-hq-ops`** (Cushman & Wakefield · Vanta SF HQ).

## Rules

1. Use the existing schema in `docs/projects.schema.md` — fields are `title`, `tags`, `numbers`, `description`, `key_highlights`, `milestones_completed`, `images`, `photos_needed` (not `project_name` / `stats` / `narrative`).
2. Translate work talk into portfolio talk (impact lines). Do not paste raw Slack/email phrasing.
3. Prefer appending new `key_highlights` and `milestones_completed` items for this week. Only edit older bullets if they are wrong.
4. Update `numbers` / `outcome_headline` only when the Notion update includes a clear metric.
5. If the update implies a photo opportunity, add a concrete item to `photos_needed` (or remove one if the asset is now in `public/assets/images/projects/vanta-sf-hq-ops/`).
6. Keep `company` as `Cushman & Wakefield · Vanta`. Name the client **Vanta**.
7. Do not set `case_study_ready: true` unless I explicitly say the case study is ready.
8. Output:
   - The exact fields to change (as a partial JSON object for that project), and
   - A short commit message suggestion.

If the update clearly belongs on another project (e.g. Events & Culture), say so and patch that `id` instead.

## Notion update

```
PASTE WEEKLY SUMMARY / TRACK DELTAS / ASSET GAPS HERE
```
