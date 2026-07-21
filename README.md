# Collin Brown

**Workplace Experience Manager · Workplace / Office Coordinator**  
Live site: [collinhq.github.io](https://collinhq.github.io)

---

Portfolio for Collin Brown — San Francisco workplace operations across office build-outs, HQ moves, vendor systems, and employee experience.

## Edit copy

See [`EDITING.md`](./EDITING.md) for which JSON files power each section.

## Improvements log

Full changelog, research notes, photo shopping list, and Notion wins plan:  
[`docs/PORTFOLIO-IMPROVEMENTS.md`](./docs/PORTFOLIO-IMPROVEMENTS.md)

## Track work accomplishments

Home page **Recent wins** feed — keep it current without rewriting case studies.

```bash
# Log a win right now (no Notion needed)
npm run log-win -- --win "What you finished today" --type currently

# Later: Notion auto-sync (optional)
npm run sync:wins   # needs NOTION_TOKEN + NOTION_WINS_DB_ID
```

- Habit guide: [`docs/TRACKING-WINS.md`](./docs/TRACKING-WINS.md)  
- Notion setup: [`docs/WINS-NOTION.md`](./docs/WINS-NOTION.md)  
- Scratch pad: [`docs/wins-inbox.md`](./docs/wins-inbox.md)

## Dev

```bash
npm install
npm run dev
```
