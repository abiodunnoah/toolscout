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
- **Hosting:** Netlify

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

### Deploy (Netlify)

- Build command: `npm run build`
- Publish directory: `dist`
- Config lives in [`netlify.toml`](netlify.toml), which also holds the SPA redirect
  needed once Vue Router views land in Week 3.

## Project structure

    src/
      components/   # ToolCard (more extracted in Week 2)
      data/         # seed dataset for Week 1 (JSON Server mock in Week 2)
      App.vue       # key screen: search, filters, results, shortlist
      main.js
      style.css     # Tailwind entry + base focus styles
    docs/           # idea one-pager, key-screen sketch, reflection (later)
    public/

## Roadmap (3 weeks)

| Week | Focus | Status |
|------|-------|--------|
| 1 | Idea one-pager, work plan, responsive + accessible key screen, JS interactivity | in progress |
| 2 | Component build, data integration (loading / empty / error states) | not started |
| 3 | Routing + state, accessibility pass, tests, deploy, final package | not started |

---

## Planning docs

- [Idea one-pager](docs/idea-one-pager.md) — problem, target user, core flow, scope, risks
- [Work plan](docs/work-plan.md) — deliverables for Weeks 1–3 and top risks
- [Key-screen sketch](docs/key-screen-sketch.md) — the Week 1 screen design
- [Weekly update notes](docs/weekly-updates.md) — the status note submitted each week

## Key decisions

- **Vue 3 + Vite** — component model and a fast dev loop; the team/guide stack I know best.
- **Tailwind CSS** — utility classes keep the responsive work (mobile-first + one breakpoint) explicit and avoid a separate stylesheet to maintain.
- **Curated dataset** — no free public "AI tools" API exists, so I author a small JSON dataset (Week 2) that I fully control; the fields I need for comparison are guaranteed to be present.

## How the interaction works (Week 1, task 1.2)

All three behaviours are hand-written in `src/App.vue` — no plugin does the work for me.

1. **Live search** — a `computed` (`filteredTools`) runs on every keystroke and matches the
   query against a tool's name, description and tags. Empty or whitespace-only input is
   treated as "no query" and shows everything.
2. **Filters (category + price)** — clicking a filter button toggles that value in an array
   of active filters (via `toggleValue`). Multiple filters combine with AND, and each button
   reflects its state through `aria-pressed`.
   - **Edge cases:** when the search and filters match nothing, the list is replaced by a
     friendly empty state with a **Clear filters** button, rather than a blank page or a crash.
3. **Shortlist** — the **Save** button on each card toggles the tool's id in a `savedIds`
   array; the footer shows the live count and each button's `aria-pressed` tracks its state.
4. **Theme toggle** — flips a `dark` class on `<html>` (Tailwind's class-based dark mode).
   The choice is *not* persisted yet — that arrives in Week 3 with `localStorage`.

## Known limitations

- _TODO_

## Licence

MIT — see [LICENSE](LICENSE).
