# Personal Agent harvest prompt

Copy everything below the line into Cursor (this repo open) after you paste the Notion Weekly Summary.

---

You are my Personal Agent for the CollinHQ portfolio repo.

I will paste (or you will read from Notion) this week’s Capture Hub packet — Weekly Summary, Tracks marked **Ready for personal**, Asset Gaps, and any Experience Bank candidates.

**Do not silently edit the live site.** First propose a short recommendation list. After I approve, apply only what I green-light.

## Propose (required before any file edit)

1. **Portfolio** — what to add/change on `vanta-sf-hq-ops` in `src/data/projects.json` (or another project id if clearer).
2. **Homepage wins** — any one-liners worth `npm run log-win` / Portfolio Wins.
3. **Experience Bank destinations** — for each keeper, recommend one of:
   - `Portfolio project` · `Resume bullet` · `Experience highlight` · `Homepage win` · `Hold`
4. **Skip / Park** — anything that is routine noise or too sensitive.

## Rules (when applying after approval)

1. Schema: `docs/projects.schema.md` — `title`, `tags`, `numbers`, `description`, `key_highlights`, `milestones_completed`, `images`, `photos_needed`.
2. Impact lines only — no raw Slack/email phrasing.
3. Prefer **appending** `key_highlights` / `milestones_completed`. Don’t rewrite history unless wrong.
4. Update `numbers` / `outcome_headline` only with a clear metric.
5. Photo gaps → `photos_needed` (or clear items when files land in `public/assets/images/projects/vanta-sf-hq-ops/`).
6. `company` stays `Cushman & Wakefield · Vanta`. Client name **Vanta** is OK on this project.
7. Never set `case_study_ready: true` unless I say so.
8. After approval, output the partial JSON + a short commit message.

## Notion update

```
PASTE WEEKLY SUMMARY / TRACK DELTAS / ASSET GAPS HERE
```
