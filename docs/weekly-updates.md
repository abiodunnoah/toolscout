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
