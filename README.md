# Collin Brown — Portfolio

**Workplace Operations & Project Management**  
Live site: [collinhq.github.io](https://collinhq.github.io)

---

## About

This portfolio documents workplace operations work across office build-outs, vendor management, internal communications, and process development. Projects are drawn from real engagements and framed around outcomes: what the challenge was, what was done, and what it delivered.

The site is built to stay current — project data lives in a single JSON file that updates the site automatically on push, keeping maintenance low-friction.

---

## Featured Projects

| Project | Focus |
|---------|-------|
| 325 Pacific Office Build-Out | Multi-floor construction management, vendor coordination, scheduling |
| Vendor & Budget Operations | Invoice auditing, COI compliance, financial oversight |
| Internal Comms & Culture | Newsletters, events, cross-functional team alignment |
| Office Ops Playbook | Repeatable processes and documentation for scaling new offices |

---

## Tech Stack

- **Framework:** React
- **Styling:** Tailwind CSS
- **Hosting:** GitHub Pages
- **Data:** `src/data/projects.json` — single source of truth for all project content
- **Deploy:** Automatic on push to `main`

---

## Project Structure

```
├── public/
│   └── assets/images/
│       ├── projects/       # Per-project photography
│       ├── hero/           # Hero and banner images
│       └── headshot/       # Profile photo
├── src/
│   ├── data/
│   │   └── projects.json   # All project content lives here
│   └── components/         # React components
├── .gitignore
└── README.md
```

---

## Updating Content

Project content is managed through `src/data/projects.json`. Adding or updating a project case study requires only editing that file and pushing — no changes to the site's HTML or components needed.

---

*Built and maintained by Collin Brown.*
