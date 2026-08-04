# Keep track of work accomplishments

## Use this today

```bash
# Publish a keeper to the site feed
npm run log-win -- --win "What you finished" --type currently
```

---

Two ways to log wins. Use whichever you’ll actually open on a busy day.

---

## Option A — Fast (no Notion): log into the site data

From this repo:

```bash
npm run log-win -- --win "What you finished today" --metric "Optional receipt" --type currently
```

Examples:

```bash
# Something in progress at C&W
npm run log-win -- --win "Locked mover bids and dock schedule for SF HQ relocation" --type currently

# Finished something big
npm run log-win -- --win "Kitchen install signed off on Floor 3" --metric "On schedule" --type milestone --project fintech-hq-build-out

# Systems / process win
npm run log-win -- --win "Vendor COI chase running without manual follow-up" --type highlight --project klaviyo-coi-tracker
```

Then commit + push (or paste into GitHub). The home page **Recent wins** section reads `src/data/wins.json`.

### Or edit on GitHub (no terminal)

1. Open [`src/data/wins.json`](../src/data/wins.json)
2. Add a new object at the **top** of the `"wins"` array (copy an existing one)
3. Change only the words inside quotes
4. Commit → site updates after deploy

---

## Option B — Notion (best long-term)

Weekly auto-sync to the portfolio. Setup once: **[`WINS-NOTION.md`](./WINS-NOTION.md)**

Habit: new row → fill Name / Date / Metric → check **Publish** when it’s clean enough for hiring managers.

---

## What counts as a “win” (keep it simple)

Write **one sentence** that a hiring manager could understand:

| Weak | Better |
|---|---|
| Helped with vendors | Locked three vendor bids for the HQ move and got dock access approved |
| Busy day / meetings | Cleared the Floor 3 power blocker so millwork could start Monday |
| Ordered snacks | Switched snack vendor and stopped the markup that was eating the pantry budget |

Optional **metric**: short receipt only if it’s real (`On schedule`, `Zero downtime`, `Under estimate`). Skip fake precision.

**Types**
- `currently` — what you’re owning right now  
- `milestone` — shipped / signed off  
- `highlight` — outcome worth keeping on the site  

---

## Weekly 5-minute review (Sunday)

1. Glance at notes / calendar / Slack from the week  
2. Log 1–3 wins (`log-win` or Notion)  
3. Uncheck Publish (or delete) anything too client-sensitive  
4. Don’t rewrite case studies every week — that’s what this feed is for  

---

## Phone habit (optional)

Voice memo or Notes app: “Win: …” during the day.  
Sunday: paste the best ones into Notion or `npm run log-win`.

---

## Don’t auto-publish

- Hero / featured case studies  
- Invoice-level or private client detail  
- Exact micro-budgets you’d rather keep general  

Those stay hand-edited in `projects.json` / `about.json`.
