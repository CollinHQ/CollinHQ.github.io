# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single static portfolio site — a Vite + React 18 + Tailwind CSS SPA
(no backend, no database, no test suite, no lint config). Content lives as JSON in
`src/data/` (see `EDITING.md` for the content-editing guide).

Standard commands (defined in `package.json`):

- `npm run dev` — Vite dev server at http://localhost:5173 (use this while developing).
- `npm run build` — production build to `dist/`.
- `npm run preview` — serve the built `dist/` locally.

The update script already runs `npm install`, so dependencies are ready when a session
starts. There is no lint or test command; "verifying" means running `npm run build`
(it fails on real errors) and loading the app via `npm run dev`.

Non-obvious notes:

- Client-side routing uses `react-router-dom`. Deep links like `/projects` work in the
  dev server; on GitHub Pages they rely on the `public/404.html` + `index.html` SPA
  redirect shim, so don't remove that.
- `scripts/process-project-photos.mjs` and `scripts/generate-og-image.mjs` are one-off
  asset tools that use `sharp` and read source files from `$HOME`; they are not part of
  the dev/build flow and are not needed to run the site.
- Deployment is automatic via `.github/workflows/deploy.yml` (Node 20) on push to `main`.
- Privacy: the GitHub repo and the published GitHub Pages site are intentionally **public**
  (it's a portfolio). The owner keeps only their **Cursor Cloud environment and secrets
  personal-scoped** (not team-shared) — set scope to Personal in the Cursor dashboard.
