# ToolScout — Weekly Update Notes

Submitted with the weekly submission form (repo, live URL, tag, update note).

---

## Week 1

Week 1 - Noah - Frontend - ToolScout

**Delivered:**
- Idea one-pager
- One-page work plan
- Key screen: responsive, accessible search + tool list (task 1.1)
- Interactivity: live search, category/price filters with empty state, shortlist, theme toggle (task 1.2)
- Repo: github.com/abiodunnoah/toolscout · Live URL: https://toolscoutt.netlify.app/

**Changed after feedback:**
- N/A this week (first submission). Mentor feedback from the 5-minute demo will be logged here and actioned at the start of Week 2.

**Key technical decisions:**
- Vue 3 + Vite — component model and a fast dev loop
- Tailwind CSS — keeps mobile-first responsive work explicit
- Curated JSON dataset — no free public AI-tools API exists, so the compare fields need to be ones I control

**Blockers / risks:**
- Dataset authoring time → fix the schema first, then batch entries
- Compare feature scope → cap at 3 tools and a fixed attribute set
- "Mock data" perception → real loading/empty/error states and honest docs

**AI and sources used:**
- AI assistant (opencode) used to scaffold the Vite project, draft the README and the initial App.vue structure; I reviewed and adapted all the code myself.
- Sources: Vue 3 docs, Tailwind CSS docs, MDN (semantic HTML and ARIA).

---

## Week 2

Week 2 - Noah - Frontend - ToolScout

**Delivered:**
- Curated dataset of 48 tools with a JSON Server mock API (task 2.2)
- Reusable components: AppHeader, SearchBar, FilterGroup, SortSelect, ToolGrid, ToolCard, EmptyState, LoadingState, ErrorState and AppFooter (task 2.1)
- Composable state: useFilters, useShortlist, useTheme and useTools
- Async data with loading, empty, error and retry states
- Static production data endpoint and a `dev:full` script
- Repo: github.com/abiodunnoah/toolscout · Live URL: https://toolscoutt.netlify.app/

**Changed after feedback:**
- Mentor check-in pending; no feedback received at the time of writing. Any feedback received before submission will be actioned and recorded here.

**Key technical decisions:**
- JSON Server for development and a generated static endpoint for production, so the live site needs no server
- Composables keep search, filter, sort and shortlist state out of the components
- Defensive parsing drops malformed records so bad data cannot crash the UI

**Blockers / risks:**
- No mentor feedback yet, so the feedback-response section is provisional
- The dataset is curated and static; it can go stale and is not live data
- No automated tests until Week 3, so regressions rely on manual QA
- Shortlist state is in-memory until Week 3

**AI and sources used:**
- AI assistant (opencode) used for scaffolding, component extraction, dataset authoring and documentation; I reviewed and adapted the code.
- Sources: Vue 3 docs, Tailwind CSS docs, JSON Server docs, MDN (fetch, AbortController, ARIA).

---

## Week 3

Week 3 - Noah - Frontend - ToolScout

**Delivered:**
- Docs rewritten in plain language: short sentences, a plain reason for each decision and a glossary.
  New pages: component map, accessibility record, technical reflection and AI-use declaration.
- Code reorganised into `components/ui`, `components/layout`, `components/tools`, `views` and
  `services/tools.js`. Four small UI primitives with variants: Button, Badge, Card and Input.
- Vue Router with `/`, `/tool/:id`, `/compare?ids=a,b`, `/saved` and a 404 view.
- Pinia shortlist, saved in `localStorage`, plus the theme choice.
- Compare view for two or three tools; the selection lives in the URL.
- Accessibility pass: Lighthouse 0.96 before, 1.00 after on five screens. Contrast, skip link,
  visible labels, focus after route changes, page titles.
- 13 Vitest tests in 4 files, plus a 20-check keyboard and layout script.
- axe run on five screens in both light and dark mode: no violations.
- Repo: github.com/abiodunnoah/toolscout (tag `week-3`) · Live URL: https://toolscoutt.netlify.app/

**Changed after feedback:**
- **Mentor: "some of the AI-generated documentation is difficult to understand".** I rewrote the
  README and added a glossary. Each decision now has a plain reason and a cost. I removed the
  marketing tone and the long nested lists.
- **Mentor: "the code structure could be cleaner".** Components now sit in `ui/`, `layout/` and
  `tools/`, views have one file per route, and data access is in one service. The component map
  explains the rule: views fetch, tool components receive props, UI components know nothing about tools.
- **Mentor: "consider using shadcn/ui".** shadcn/ui is React. The Vue port is shadcn-vue. I did not
  add it in the last week. Four local primitives with variants give the same consistency with less
  risk. The trade-off is written in the README.
- **Peer: check keyboard use.** Added a script that presses Tab and Enter in Chrome, checks focus
  order, toggles a filter, saves a tool and removes a compare column. It found a real focus bug on
  first load. All 20 checks pass.
- **Peer: test on real mobile and desktop.** The script checks 375px and 1280px. A real phone and
  a screen reader are still open; they are listed in the accessibility page.

**Key technical decisions:**
- Vue Router with real paths, so deep links and the back button work.
- Pinia for the shortlist because three views need it; `localStorage` because there is no server.
- Compare ids in the URL (`?ids=a,b`) instead of a second store, so a comparison can be shared.
- Local UI primitives instead of shadcn-vue, to keep the last week low-risk.

**Blockers / risks:**
- The dataset is hand-written and can go stale.
- No screen-reader or physical-device test yet.
- Search and filters are not in the URL, so a filtered list cannot be shared.
- The deployed site is still the Week 2 build until `main` is pushed.

**AI and sources used:**
- AI assistant (opencode) used for the docs rewrite, the file move, the first versions of the
  components and views, and the test scaffolding. I reviewed every change and ran the checks.
  The full statement is in [`ai-use.md`](ai-use.md).
- Sources: Vue 3 docs, Vue Router docs, Pinia docs, Vitest docs, Vue Test Utils docs,
  Tailwind CSS docs, WCAG 2.2 quick reference, MDN (ARIA, localStorage, focus), Lighthouse docs.

