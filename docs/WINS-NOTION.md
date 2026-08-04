# Auto-track wins → portfolio (Notion)

Log accomplishments in Notion. Check **Publish**. A weekly GitHub Action writes them into `src/data/wins.json`, which powers the **Recent wins** section on the home page. Case studies stay hand-curated.

## 1. Create the Notion database

New full-page database named **Portfolio Wins**. Add these properties **exactly** (names matter for the sync script):

| Property | Type | Notes |
|---|---|---|
| **Name** | Title | One-line win (what shows on the site) |
| **Date** | Date | When it happened / shipped |
| **Metric** | Text | Optional short receipt, e.g. `17% under`, `Zero downtime` |
| **Project** | Select | Portfolio project id, or `none` |
| **Type** | Select | `highlight` · `milestone` · `currently` |
| **Publish** | Checkbox | Only checked rows go live |
| **Detail** | Text | Optional longer note (not shown on home cards today; kept for later) |

### Project select options (copy these)

```
none
fintech-hq-build-out
klaviyo-office-redesign
klaviyo-coi-tracker
bridge-hq-relocation
bridge-amenity-program
bridge-records-migration
optisign-werqwise
events-culture
```

### Type select options

```
highlight
milestone
currently
```

## 2. Create a Notion integration

1. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. **New integration** → name it `Portfolio Wins Sync`
3. Copy the **Internal Integration Secret** (starts with `secret_`)
4. Open your **Portfolio Wins** database → `⋯` → **Connections** → connect `Portfolio Wins Sync`

## 3. Get the database ID

Open the database as a full page. The URL looks like:

```
https://www.notion.so/workspace/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa?v=…
```

The 32-character hex string is the database ID (`NOTION_WINS_DB_ID`).

## 4. Add GitHub secrets

Repo → **Settings** → **Secrets and variables** → **Actions**:

| Secret | Value |
|---|---|
| `NOTION_TOKEN` | Integration secret |
| `NOTION_WINS_DB_ID` | Database ID |

## 5. Turn it on

- **Actions** → **Sync wins from Notion** → **Run workflow** (manual test)
- Or wait for the Sunday cron
- When `wins.json` changes on `main`, the existing Pages deploy publishes the site

## Local test (optional)

```bash
export NOTION_TOKEN=secret_…
export NOTION_WINS_DB_ID=…
npm run sync:wins          # writes src/data/wins.json
DRY_RUN=1 npm run sync:wins  # print only
```

If secrets are missing, the script **skips safely** and leaves the seed wins in place.

## Habit (30 seconds)

1. Finish something real on site / in ops  
2. New Notion row → Name + Date + Metric + Project + Type  
3. Check **Publish** when it’s clean enough for hiring managers  
4. Site updates on the next sync (or run the workflow now)

**Don’t have Notion set up yet?** Log straight into the site data:

```bash
npm run log-win -- --win "What you shipped" --type currently
```

Full habit guide: [`TRACKING-WINS.md`](./TRACKING-WINS.md)

## What stays manual

- Hero, stats, featured case studies, testimonials  
- Anything with sensitive client / invoice detail — leave **Publish** unchecked  
