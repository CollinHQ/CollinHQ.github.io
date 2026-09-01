# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single static portfolio site — a Vite + React 18 + Tailwind CSS SPA
(no backend, no database, no lint config). Content lives as JSON in `src/data/`
(see `EDITING.md` for the content-editing guide).

Standard commands (defined in `package.json`):

- `npm run dev` — Vite dev server at http://localhost:5173 (use this while developing).
- `npm test` — run the privacy scanner's focused Node regression suite.
- `npm run check:privacy` — scan Git-eligible public paths plus both staged and
  working-tree contents for personal Notion page links and raw object IDs without
  printing any matched value. Public symlinks, gitlinks, and other non-regular
  entries are rejected because the production builder may follow them.
- `npm run build` — run privacy tests and the live scan, then build `dist/`.
- `npm run preview` — serve the built `dist/` locally.

The update script already runs `npm install`, so dependencies are ready when a session
starts. There is no lint command; "verifying" means running `npm run build` (it fails
on test, privacy, or production-build errors) and loading the app via `npm run dev`.

Non-obvious notes:

- Client-side routing uses `react-router-dom`. Deep links like `/projects` work in the
  dev server; on GitHub Pages they rely on the `public/404.html` + `index.html` SPA
  redirect shim, so don't remove that.
- `scripts/process-project-photos.mjs` and `scripts/generate-og-image.mjs` are one-off
  asset tools that use `sharp` and read source files from `$HOME`; they are not part of
  the dev/build flow and are not needed to run the site.
- Pull requests run the privacy regression suite, live scan, and production build through
  `.github/workflows/acceptance.yml`. Deployment remains automatic via
  `.github/workflows/deploy.yml` (Node 20) on push to `main`.
- The scheduled Notion wins sync publishes a stable SHA-256-derived display key,
  never a Notion page ID, and reruns privacy tests plus the live scan before its
  bot commit.
- Privacy: the GitHub repo and the published GitHub Pages site are intentionally **public**
  (it's a portfolio). The owner keeps only their **Cursor Cloud environment and secrets
  personal-scoped** (not team-shared) — set scope to Personal in the Cursor dashboard.
