# `projects.json` schema

Canonical shape for entries in [`src/data/projects.json`](../src/data/projects.json). The UI (`ProjectCard`, `CaseStudyPage`, Featured Work) already expects these keys — do not rename them for harvest prompts.

## Required fields

| Field | Type | Notes |
|---|---|---|
| `id` | string | Stable kebab-case slug (e.g. `bridge-hq-relocation`). Used in routes and image paths — **never rename one that is already published**, it is a live URL and a sitemap entry. |
| `title` | string | Card headline (= sketch `project_name`). |
| `status` | string | `In Progress` · `Ongoing` · `Completed`. |
| `description` | string | 1–3 sentence brief (= sketch narrative challenge/context). |
| `tags` | string[] | Skills / themes shown on the card back. Prefer existing skill language when possible. |
| `key_highlights` | string[] | Portfolio-ready wins. Card front shows the first two. |
| `numbers` | object | Metric map (= sketch `stats`). Values may be numbers or short strings. Avoid bare booleans for display stats. |
| `images` | object | Paths under `/assets/images/projects/<id>/`. Keys: `hero`, optional `before`, `after`. |

## Recommended fields

| Field | Type | Notes |
|---|---|---|
| `icon` | string | Emoji fallback when hero image is missing. |
| `company` | string | Employer and/or client (e.g. `Rho`, or `Cushman & Wakefield · <client>` for placements). Check docs/agents/accomplishments-collector.md before naming a client. |
| `location` | string | Usually `San Francisco, CA`. |
| `role` | string | One-line scope. |
| `outcome_headline` | `{ value, label }` | Big number for case-study / card emphasis. |
| `milestones_completed` | string[] | Chronological proof points (good home for weekly harvest appends). |
| `photos_needed` | string[] | Asset gaps the Work Agent / harvest should chase. |
| `case_study_ready` | boolean | Only `true` when narrative + images are ready for `/projects/:id`. |
| `completion_target` | string | Optional timing note for in-progress work. |

## Sketch → repo map

| Sketch | This repo |
|---|---|
| `project_name` | `title` |
| `tags` | `tags` |
| `stats` | `numbers` (+ `outcome_headline` for the hero metric) |
| `narrative.challenge` | `description` |
| `narrative.solution` | `key_highlights` / `milestones_completed` |
| `images.hero` / `before` | `images.hero` / `before` / `after` |

## Example

Shape only — this mirrors the real `fintech-hq-build-out` entry.

```json
{
  "id": "fintech-hq-build-out",
  "icon": "🏗️",
  "title": "Rho HQ Office Build-Out",
  "status": "Completed",
  "company": "Rho",
  "location": "San Francisco, CA",
  "role": "On-site operations lead for multi-floor commercial office construction",
  "description": "…",
  "tags": ["Construction", "Vendor Mgmt", "Space Planning"],
  "key_highlights": ["…"],
  "numbers": {
    "floors": "3",
    "square_feet": "13,000"
  },
  "images": {
    "hero": "/assets/images/projects/fintech-hq-build-out/hero.jpg",
    "before": "/assets/images/projects/fintech-hq-build-out/before.jpg",
    "after": "/assets/images/projects/fintech-hq-build-out/after.jpg"
  },
  "photos_needed": ["…"],
  "milestones_completed": [],
  "case_study_ready": false
}
```

Note `id` and display name are decoupled: the slug stays `fintech-hq-build-out`
(it is the published URL and sitemap entry) while the title names Rho.

## Harvest rules

1. Prefer **appending** to `key_highlights` / `milestones_completed` over rewriting history.
2. Update `numbers` only when you have a defensible delta (count, $, %, headcount).
3. Client naming is not automatic — see the rules in `agents/accomplishments-collector.md`. The current C&W client stays anonymized.
4. Never invent photos — leave paths declared and track gaps in `photos_needed`.
5. Set `case_study_ready` to `true` only after a real hero image and a tight narrative exist.
