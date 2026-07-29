# Collin Brown — Portfolio

A data-driven portfolio for Collin Brown’s workplace operations and employee
experience work delivered through a global commercial real estate firm for a
technology client. Employer and client identities remain generalized until
public naming is explicitly cleared. The site is a static Next.js export built
for GitHub Pages.

## Target roles

- Office Manager
- Workplace Coordinator
- Workplace Manager
- Employee Experience Coordinator
- Employee Experience Manager

## Approval gate

Work-derived accomplishments arrive only after work-side sanitization. Every
candidate receives a recommendation and exact proposed wording. Collin must
approve that wording before it is added to `projects.json`, committed, pushed,
or published. Client names, street addresses, floor identifiers, internal
links, security mechanics, and other restricted details stay out of this public
repository unless separately cleared.

## Weekly update workflow

1. Review the sanitized candidate accomplishments.
2. Recommend posting, revising, combining, or skipping each candidate.
3. Wait for Collin’s approval of the exact public wording.
4. Add approved wins, stats, tags, narratives, or image paths to
   `projects.json`.
5. Put separately approved project images in `public/assets/`.
6. Build and test the site.
7. Ask before committing, pushing, or publishing.

The page layout reads from `projects.json`, so approved content updates do not
require editing the React or CSS files.

## Local preview

```bash
pnpm install
pnpm dev
```

## GitHub Pages setup

After publication is approved and the repository is pushed to GitHub, open
**Settings → Pages** and set the source to **GitHub Actions**. Later approved
pushes to `main` will deploy the static site automatically.
