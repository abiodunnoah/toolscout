# ToolScout

Find the right AI tool for a specific task — compare options side by side and keep a shortlist.

> Track: Frontend Development · Week 1 of 3 · _status: in progress_

## What it is

ToolScout helps a student or early-career researcher who has one specific task to get
done — summarise papers, transcribe interviews, generate diagrams, clean up survey
data — find and compare AI tools for it, instead of wading through thousands of
listings written in marketing copy.

## Who it's for

A student or early-career researcher who has a specific task and doesn't know which AI
tool to trust, or which are free / student-friendly.

## The problem

Choosing an AI tool for one specific task is slow and noisy. Directories list thousands
of tools with no easy way to compare shortlisted options side by side, or to remember
promising ones for later.

## Core flow

    task search  →  filter results  →  compare 2–3 tools  →  tool detail  →  save to shortlist

## Tech stack

- **Vue 3** (Composition API) + **Vite**
- **Vue Router** — multiple views, deep links
- **Pinia** — shortlist / compare state
- **Tailwind CSS** — styling
- **Vitest** + **Vue Test Utils** — tests (from Week 3)
- **JSON Server** — mock API for the curated tool dataset (from Week 2)
- Hosting: Vercel / Netlify  _(TODO: confirm)_

## Getting started

### Prerequisites
- Node.js 18+ and npm

### Run locally

    npm install
    npm run dev        # start dev server (Vite)

Then open the local URL it prints (usually http://localhost:5173).

### Other scripts

    npm run build      # production build
    npm run preview    # preview the production build
    npm run test       # run tests (Vitest) — added in Week 3
    npm run mock       # serve the mock API — added in Week 2

> Live URL: _TODO_  ·  Backup release: git tag `week-1`

## Project structure

    src/
      components/   # reusable UI (added Week 2)
      views/        # routed views (added Week 3)
      stores/       # Pinia stores
      assets/
    data/           # curated tools dataset (added Week 2)
    docs/           # idea one-pager, work plan, reflection

## Roadmap (3 weeks)

| Week | Focus | Status |
|------|-------|--------|
| 1 | Idea one-pager, work plan, responsive + accessible key screen, JS interactivity | in progress |
| 2 | Component build, data integration (loading / empty / error states) | not started |
| 3 | Routing + state, accessibility pass, tests, deploy, final package | not started |

---

## Idea one-pager

**Stack:** Vue 3 + Vite + Vue Router + Pinia, Tailwind CSS, Vitest + Vue Test Utils; deployed on Vercel/Netlify

**Target user:** A student or early-career researcher who has a specific task — summarise
papers, transcribe interviews, generate diagrams, clean up survey data — and doesn't
know which AI tool to trust, or which are free / student-friendly.

**Problem:** Choosing an AI tool for one specific task is slow and noisy. Directories list
thousands of tools in dense marketing copy, with no easy way to compare shortlisted
options side by side or remember promising ones for later.

**Core flow:** task search → filter results → compare 2–3 tools → tool detail → save to shortlist.

**Data source:** a curated JSON dataset (~40–60 tools), served through a JSON Server mock API.

**In scope:**
- Task-first search + filtering by category, price (free/freemium/paid) and student-friendliness
- Tool detail: pricing, platforms, best-for, notes/pros, link out
- Side-by-side comparison of 2–3 tools
- "Shortlist" of saved tools, persisted locally
- Responsive, accessible, deployed, tested

**Out of scope:**
- Accounts, login, server-side persistence
- Real-time data or scraping third-party directories
- Submitting/moderating new tools (admin panel)
- Payments or subscriptions
- LLM-generated recommendations

**Top 3 risks:**
1. **Dataset authoring time** — fix the schema first, then batch entries.
2. **Compare feature scope** — cap at 3 tools and a fixed attribute set.
3. **"Mock data" perception** — real async loading/empty/error+retry states, honest docs.

## Work plan

| Week | Deliverables | Notes |
|------|--------------|-------|
| 1 | Idea one-pager + work plan; repo + README; key screen mobile-first, semantic, accessible; JS interactivity (live search/filter + empty state); tag `week-1`; 5-min mentor demo | Sketch the screen before coding |
| 2 | Feedback response; issue log (≥5); components (`SearchBar`, `ToolCard`, `TagFilter`, `CompareTable`); async data with loading/empty/error+retry; component map | Data integration is the focus |
| 3 | Routes `/`, `/tool/:slug`, `/compare?ids=a,b`, `/saved`, 404; shortlist + compare state persisted; Lighthouse/axe before/after; ≥3 tests; deploy; final README, video, reflection, declaration; tag `week-3` | Deep-linked compare is the showcase |

## Key decisions

- _TODO (from Week 1): why Vue, why Tailwind, why a curated dataset._
- Week 1 interactivity: _TODO — explain how each behaviour works (required for task 1.2)._

## Known limitations

- _TODO_

## Licence

MIT — see [LICENSE](LICENSE).
