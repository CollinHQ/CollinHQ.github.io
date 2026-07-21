# `projects.json` schema

Canonical shape for entries in [`src/data/projects.json`](../src/data/projects.json). The UI (`ProjectCard`, `CaseStudyPage`, Featured Work) already expects these keys — do not rename them for harvest prompts.

## Required fields

| Field | Type | Notes |
|---|---|---|
| `id` | string | Stable kebab-case slug (e.g. `vanta-sf-hq-ops`, `bridge-hq-relocation`). Used in routes and image paths — **never rename one that is already published**, it is a live URL and a sitemap entry. |
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
| `company` | string | Employer and/or client (e.g. `Rho`, or `Cushman & Wakefield · Vanta` for the current placement). Check `docs/agents/accomplishments-collector.md` before newly naming a client. |
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

## Example (current role seed)

```json
{
  "id": "vanta-sf-hq-ops",
  "icon": "🏢",
  "title": "Vanta SF HQ Workplace Ops & Relocation",
  "status": "In Progress",
  "company": "Cushman & Wakefield · Vanta",
  "location": "San Francisco, CA",
  "role": "On-site workplace coordinator for Vanta's SF headquarters via Cushman & Wakefield",
  "description": "…",
  "tags": ["Office Move", "Vendor Mgmt", "Employee Experience", "Events"],
  "key_highlights": ["…"],
  "numbers": {
    "workstation_monitors": "~100",
    "holiday_party_guests": "~300"
  },
  "images": {
    "hero": "/assets/images/projects/vanta-sf-hq-ops/hero.jpg",
    "before": "/assets/images/projects/vanta-sf-hq-ops/before.jpg",
    "after": "/assets/images/projects/vanta-sf-hq-ops/after.jpg"
  },
  "photos_needed": ["…"],
  "milestones_completed": [],
  "case_study_ready": false
}
```

## Harvest rules

1. Prefer **appending** to `key_highlights` / `milestones_completed` over rewriting history.
2. Update `numbers` only when you have a defensible delta (count, $, %, headcount).
3. Keep client/employer naming consistent with published copy: **Vanta** + **Cushman & Wakefield** for this role. For other clients, follow `docs/agents/accomplishments-collector.md`.
4. Never invent photos — leave paths declared and track gaps in `photos_needed`.
5. Set `case_study_ready` to `true` only after a real hero image and a tight narrative exist.
