# Capture Hub — create this once (Notion)

Do this in your **personal** Notion (not work). ~15–20 minutes.

Work laptop writes here on Fridays. Personal laptop reads from here later.
Do **not** connect this repo’s GitHub from the work laptop.

---

## Step 1 — Parent page

1. In Notion: **New page**
2. Title: `Capture Hub`
3. Paste this at the top:

```
Friday packet from Vanta SF HQ (via Cushman & Wakefield).
Work side writes. Personal side harvests into CollinHQ.github.io.
Primary project id: vanta-sf-hq-ops
```

---

## Step 2 — Weekly Summary (child page)

1. Inside Capture Hub, type `/page` → create a subpage named `Weekly Summary`
2. Paste this template:

```
## Week of YYYY-MM-DD
- (portfolio-ready impact bullet)
- (portfolio-ready impact bullet)
```

Each Friday the Work Agent **appends** a new dated section. No raw Slack/email dumps.

---

## Step 3 — Tracks (database)

1. Inside Capture Hub, type `/database` → **New database — Full page**
2. Name it `Tracks`
3. Add these properties (names must match):

| Property | Type | Options |
|---|---|---|
| Name | Title | (default) |
| Impact Line | Text | |
| Track | Select | `Relocation` · `Vendor/Spend` · `Space Readiness` · `Events/Holiday Party` |
| Tags | Multi-select | `Office Move` · `Vendor Mgmt` · `Employee Experience` · `Events` · `Facilities` · `Budget` |
| Metric Delta | Text | |
| Source | Select | `Gmail` · `Slack` · `Granola` · `Other` |
| Week Of | Date | |
| Asset Needed | Text | |
| Status | Select | `Captured` · `Ready for personal` · `Harvested` · `Parked` |

4. Create two views:
   - **Board** — group by `Track`
   - **Table** — sort by `Week Of` descending
5. Optional: add one empty row per Track for this week so the board isn’t blank.

**Status meaning**
- `Captured` — Work Agent just wrote it
- `Ready for personal` — sanitized; personal side should review
- `Harvested` — already applied to portfolio / experience bank
- `Parked` — not using for now

---

## Step 4 — Asset Gaps (database)

1. Inside Capture Hub: another **Full page** database named `Asset Gaps`
2. Properties:

| Property | Type | Options / notes |
|---|---|---|
| Name | Title | e.g. `Staged workstation / monitor install` |
| Project Id | Select | `vanta-sf-hq-ops` (add more later) |
| Keyword Trigger | Text | what triggered it |
| Status | Select | `Needed` · `Shot` · `In repo` · `Dropped` |
| Week Of | Date | |
| Notes | Text | where the file lives / permissions |

3. Seed these five rows as **Needed** (matches the live project’s `photos_needed`):

1. Staged workstation / monitor install  
2. Move-day operations  
3. Pantry / amenity program  
4. Holiday party venue or production (when allowed)  
5. Anonymized walkthrough SOP checklist screenshot  

---

## Step 5 — Experience Bank (database)

This is the long-term vault — bigger than one portfolio card. Personal side promotes from here into resume / experience / wins.

1. Inside Capture Hub: full-page database named `Experience Bank`
2. Properties:

| Property | Type | Options / notes |
|---|---|---|
| Name | Title | Short accomplishment title |
| Impact Line | Text | Portfolio / resume-ready sentence |
| Destination | Select | `Portfolio project` · `Resume bullet` · `Experience highlight` · `Homepage win` · `Hold` |
| Project Id | Select | `vanta-sf-hq-ops` · `none` · (other project ids later) |
| Track | Select | same four tracks as Tracks DB |
| Metric | Text | optional receipt |
| Week Of | Date | |
| Status | Select | `Candidate` · `Approved` · `Published` · `Dropped` |
| Source Week | Text | e.g. link or “Week of 2026-08-15” |

Work side may **suggest** rows. Personal side sets Destination + Status.

---

## Step 6 — Tyler Brief (child page)

1. Subpage named `Tyler Brief`
2. Template:

```
# Tyler Brief — Week of YYYY-MM-DD
Client: Vanta SF HQ (via Cushman & Wakefield)

## What moved
- …

## Blockers
- …

## Next week
- …
```

Keep it 5–8 lines. Refresh every Friday after the Work Agent run.

---

## Step 7 — Share with the Work Agent (important)

The Work Agent on the **work laptop** needs write access to this personal Notion page.

Pick one:

**A. Notion connect (cleanest)**  
1. [notion.so/my-integrations](https://www.notion.so/my-integrations) → New integration (e.g. `Friday Capture`)  
2. Open **Capture Hub** → `⋯` → **Connections** → connect that integration  
3. On the work laptop, give Cursor/Notion MCP that integration (or paste page/DB IDs into the Friday prompt)

**B. Manual bridge (fine to start)**  
1. Work Agent outputs a Friday packet as Markdown in chat  
2. You paste it into Weekly Summary + Tracks yourself (2 minutes)  
3. Personal laptop harvests from Notion as usual  

**Do not** put work VPN-only docs or confidential attachments in this hub. Impact lines + light source pointers only. Photos stay local until you decide they’re publishable.

---

## Done when

- [ ] Capture Hub parent exists  
- [ ] Weekly Summary page exists  
- [ ] Tracks DB exists with the properties above  
- [ ] Asset Gaps DB seeded with 5 Needed rows  
- [ ] Experience Bank DB exists  
- [ ] Tyler Brief page exists  
- [ ] You know how Work will write here (integration **or** paste)

Then follow the Friday loop in [`../PIPELINE.md`](../PIPELINE.md).
