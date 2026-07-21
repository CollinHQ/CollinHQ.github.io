# How to Edit My Own Copy (No AI Needed)

Most "make this sound more like me" changes are just editing text. You can do it yourself on GitHub in about a minute, and the site updates automatically. No terminal, no AI.

## The basic steps (works for any text change)

1. Go to **github.com/CollinHQ/CollinHQ.github.io**
2. Click into the folder **`src`**, then **`data`**
3. Open the file you need (see the map below)
4. Click the **pencil icon** (✏️, top-right of the file) to edit
5. Press **Cmd+F** to find the text you want to change
6. Change **only the words between the quotation marks** `" "`
7. Scroll down → **Commit changes** (green button)
8. Wait ~1 minute. The live site updates on its own.

## The one golden rule

Only change the **words inside the quotes**. Leave the punctuation *structure* alone:
- Keep the `"` at the start and end of each piece of text
- Keep the commas `,` between items
- Keep the curly braces `{ }` and square brackets `[ ]`

If you only retype words inside `" "`, you can't break anything.

## Where everything lives (what you see on the site → which file)

All of these are in `src/data/`:

| What you want to change | File | Field to look for |
|---|---|---|
| Your **bio** paragraph (About) | `about.json` | `"bio"` |
| The **4 big stat numbers** + labels | `about.json` | `"stats"` |
| The **"Currently building..."** badge at the top | `about.json` | `"currently"` |
| Your **name / title** | `about.json` | `"name"` / `"title"` |
| Roles you're **open to** (hire pills) | `about.json` | `"target_roles"` |
| Subtitle under your title | `about.json` | `"title_line"` |
| The **one-liner** under your name | `about.json` | `"one_liner"` |
| **Skills** list | `about.json` | `"skills"` |
| **Tools** list | `about.json` | `"tools"` |
| What a skill says when clicked (Skills page) | `about.json` | `"skill_descriptions"` |
| **Resume bullets** (Experience page) | `resume.json` | `"short"` (the bullet) / `"detail"` (the expanded story) |
| **Timeline** entries (Experience page) | `experience.json` | `"description"` / `"highlights"` |
| **Project cards** text | `projects.json` | `"description"` / `"key_highlights"` |
| **Endorsements / testimonials** | `testimonials.json` | `"quote"` |
| **Recent wins** (home feed) | `wins.json` | `"wins"` — or check **Publish** in the Notion DB (see `docs/WINS-NOTION.md`) |

## Tip: preview before you commit

On the edit screen there's a **"Preview"** tab next to "Edit." It won't show the styled site, but it lets you eyeball that you didn't accidentally delete a quote or comma.

## If something looks broken after editing

You probably deleted a `"`, `,`, or `}` by accident. Easiest fix: on GitHub, open the file's **History** (clock icon), find your last good version, and revert — or just start a fresh AI chat and say "I broke about.json, fix the syntax."

## When to use an AI instead

Use a chat (and point it at this repo) for the bigger stuff:
- Rewriting a whole section or finding the right words
- Adding new sections, photos, or testimonials
- Anything involving the layout or code, not just words

## Tracking work accomplishments (wins)

Day-to-day wins show on the home page **Recent wins** feed (`src/data/wins.json`).

**Fast (today):**
```bash
npm run log-win -- --win "What you finished" --type currently
```

**Notion (weekly auto-sync):** set up once → **`docs/WINS-NOTION.md`**

**Habit + examples:** **`docs/TRACKING-WINS.md`**  
**Scratch pad:** **`docs/wins-inbox.md`** (not on the live site)

Until Notion secrets are connected, use `log-win` or edit `wins.json` on GitHub.

## Full improvements backlog

See **`docs/PORTFOLIO-IMPROVEMENTS.md`** for everything shipped, research notes, photo list, and open follow-ups.
