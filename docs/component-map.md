# Component map

This page shows what each file does and who is allowed to talk to whom.

    views  ->  tools components  ->  ui primitives
      |             |
      |             +-> props in, events out
      +-> composables / store
                |
                +-> services/tools.js  ->  the data endpoint

Rules I followed:

- **Views** own a route, fetch what the page needs and hold page-level state.
- **`components/tools`** know what a tool looks like. They receive a tool through
  props and never fetch.
- **`components/ui`** know nothing about tools. They are generic building blocks.
- **`composables`** hold reusable behaviour. **`stores`** hold state shared across
  views. **`services`** is the only place that builds a URL or reads a response.

## Views

| File | Route | Job | Data |
|---|---|---|---|
| `views/HomeView.vue` | `/` | Hero, search, filters, sort, results | `useTools`, `useFilters`, shortlist store |
| `views/ToolDetailView.vue` | `/tool/:id` | One tool in full, plus related tools | `useTools`, shortlist store |
| `views/SavedView.vue` | `/saved` | Saved tools and the compare picker | `useTools`, shortlist store |
| `views/CompareView.vue` | `/compare?ids=a,b` | Table of two or three tools | `useTools`, shortlist store, route query |
| `views/NotFoundView.vue` | any other path | 404 message and a way home | none |

## Layout

| Component | Props | Emits | Job |
|---|---|---|---|
| `layout/AppHeader.vue` | `isDark`, `savedCount` | `toggle-theme` | Brand, main nav, theme button |
| `layout/AppFooter.vue` | `savedCount` | none | Shortlist count |

## Tools components

| Component | Props | Emits | Job |
|---|---|---|---|
| `tools/SearchBar.vue` | `v-model` | `submit` | Labelled search field and clear button |
| `tools/FilterGroup.vue` | `legend`, `options`, `active` | `toggle` | Filter chips in a fieldset |
| `tools/SortSelect.vue` | `v-model` | none | Sort order |
| `tools/ToolGrid.vue` | `tools`, `savedIds` | `toggle-save` | Responsive list of cards |
| `tools/ToolCard.vue` | `tool`, `saved` | `toggle-save` | One tool, price badge and actions |
| `tools/EmptyState.vue` | `title`, `message`, `actionLabel` | `action` | Friendly "nothing here" panel |
| `tools/LoadingState.vue` | none | none | Six skeleton cards with a status |
| `tools/ErrorState.vue` | `message` | `retry` | Error panel with a retry button |

## UI primitives

These are small on purpose. They do not fetch, route or know about tools.

| Component | Main props | Renders |
|---|---|---|
| `ui/Button.vue` | `variant` (`primary`, `secondary`, `ghost`, `danger`, `chip`), `size` (`sm`, `md`, `lg`, `icon`), `to`, `href`, `type` | `button`, `a` or `RouterLink` |
| `ui/Badge.vue` | `variant` (`neutral`, `info`, `success`, `warning`, `danger`), `size` (`sm`, `md`) | Inline status pill |
| `ui/Card.vue` | `as`, `padded`, `interactive` | Any container with the shared card style |
| `ui/Input.vue` | `v-model`, `id`, `label`, `labelHidden`, `size`, `type`, `hint`, `placeholder`, plus `leading` and `trailing` slots | Label, input and hint |

`Button` chooses its element from the props:

- `to` renders a `RouterLink` (internal navigation).
- `href` renders an `a` (external links).
- neither renders a `button`.

`aria-pressed` is passed through to the chip variant, so a filter button styles
itself when it is on. No extra state class is needed.

## State

| File | What it holds | Lifecycle |
|---|---|---|
| `composables/useTools.js` | `tools`, `loading`, `error`, `retry` | Per view. Aborts the old request when retry is pressed |
| `composables/useFilters.js` | Query, active filters, sort, filtered list | Per view. Resets when you leave the home page |
| `composables/useTheme.js` | `isDark`, `toggle` | App-wide. Reads the OS setting, then `localStorage` |
| `stores/shortlist.js` | Saved ids, count, `has`, `toggle`, `remove`, `clear` | App-wide. Writes to `localStorage` on every change |

The compare selection is not in a store. It lives in the URL (`?ids=a,b`), so a
comparison can be bookmarked, shared and reloaded without extra state.

## Data and routing

| File | Job |
|---|---|
| `services/tools.js` | Builds the endpoint, fetches, checks the shape and drops bad records |
| `router/index.js` | Route table, page titles, scroll position and focus after navigation |

## Tests

| File | Covers |
|---|---|
| `tests/Button.test.js` | Button render in three forms: button, link, router link |
| `tests/ToolCard.test.js` | Card render, Save click, saved state |
| `tests/shortlist.test.js` | Store toggle, persistence, bad stored data |
| `tests/tools-service.test.js` | Valid and malformed payloads, HTTP error, wrong shape |

`scripts/check-app.mjs` is not a unit test. It drives the built site in Chrome
and checks keyboard use, routing, persistence and layout.
`scripts/check-a11y.mjs` runs axe on every screen in light and dark mode.
