# ToolScout — Key Screen Sketch (Week 1)

> Deliverable for Week 1 task 1.1. Drawn before coding, per the guide.
> Key screen = **the task-search + tool-list screen** (`/`).

## Purpose of this screen

Let a student/researcher type what they need to do, see matching AI tools as cards,
narrow them with filters, and save the ones worth a closer look.

The detail view, comparison view and shortlist page are **later weeks** — Week 1 only
needs this screen, responsive and accessible, with working interactivity.

---

## Mobile wireframe (320–767px)

```
┌─────────────────────────────────────────┐
│  [logo] ToolScout          [☾ theme]     │  ← <header>
├─────────────────────────────────────────┤
│                                         │
│  Find the right tool for your task      │  ← <h1>
│  Describe what you need to get done.    │  ← <p> subtitle
│                                         │
│  ┌───────────────────────────┬────────┐ │
│  │ Search: summarise a PDF…  │ Search │ │  ← <form> <label> <input type=search> <button>
│  └───────────────────────────┴────────┘ │
│                                         │
│  [ All ] [ Writing ] [ Research ]       │  ← filter chips (<ul> of <button aria-pressed>)
│  [ Free ] [ Freemium ] [ Paid ]         │
│                                         │
│  8 tools found                          │  ← results count (aria-live="polite")
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ ChatPDF            [Free]  [Save] │  │  ← <article> card
│  │ Chat with a PDF and get summaries │  │    h3 + category + price badge + save <button>
│  │ #writing #research                │  │    tags
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │ Scholarcy        [Freemium][Save] │  │
│  │ Extracts key points from papers   │  │
│  │ #research #study                  │  │
│  └───────────────────────────────────┘  │
│  …                                      │
│                                         │
├─────────────────────────────────────────┤
│  Shortlist: 2   ·  Built with Vue 3     │  ← <footer> (shortlist count from Behaviour 2)
└─────────────────────────────────────────┘
```

## Desktop wireframe (≥768px)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  [logo] ToolScout                                        [☾ theme]        │  ← <header>
├──────────────────────────────────────────────────────────────────────────┤
│  Find the right tool for your task                                       │  ← <h1>
│  ┌────────────────────────────────────────────────────────────────────┐  │  ← search spans full width
│  │ Search: summarise a PDF…                                  [Search]  │  │
│  └────────────────────────────────────────────────────────────────────┘  │
├────────────────────┬─────────────────────────────────────────────────────┤
│  FILTERS           │  8 tools found                                      │
│                    │  ┌───────────────┐ ┌───────────────┐ ┌─────────────┐│
│  Category          │  │ ChatPDF       │ │ Scholarcy     │ │ …           ││  ← results in a grid
│  ☐ Writing         │  │ [Free] [Save] │ │ [Freemium]    │ │             ││     2–3 columns
│  ☐ Research        │  │ Chat with a   │ │ [Save]        │ │             ││
│  ☐ Coding          │  │ PDF and get   │ │ Extracts key  │ │             ││
│                    │  │ summaries     │ │ points…       │ │             ││
│  Price             │  │ #writing      │ │ #research     │ │             ││
│  ☐ Free            │  └───────────────┘ └───────────────┘ └─────────────┘│
│  ☐ Freemium        │                                                     │
│  ☐ Paid            │                                                     │
├────────────────────┴─────────────────────────────────────────────────────┤
│  Shortlist: 2                                                             │  ← <footer>
└──────────────────────────────────────────────────────────────────────────┘
```

**Breakpoint:** the `Filters` sidebar + results grid layout activates at **768px**.
Below that, filters collapse to horizontal chips and cards stack in one column.

---

## Element inventory (semantic markup — task 1.1)

| Area          | Element(s)                                      | Notes                                             |
|---------------|-------------------------------------------------|---------------------------------------------------|
| Page chrome   | `header`, `main`, `footer`                      | one `main` per page                               |
| Branding      | `header` > logo text/`svg`                      | `aria-label` on the home link                     |
| Theme toggle  | `button` with `aria-pressed`                    | behaviour 3 / a11y                                 |
| Title         | `h1` (and `h2` for section headings)            | one `h1`                                          |
| Search        | `form` > `label` + `input[type=search]` + `button` | label tied via `for`/`id`; `button type=submit` |
| Filters       | `fieldset`/`legend` or a labelled group of `button`s | `aria-pressed` reflects on/off state          |
| Results count | `p` with `aria-live="polite"`                   | announces "N tools found" to screen readers       |
| Results list  | `ul` > `li` > `article` per tool                | list semantics for count/keyboard order           |
| Tool card     | `article` > `h3`, `p` (desc), tags, price badge, `button` (Save) | `button` not a clickable `div`        |
| Empty state   | `p`/`div` role="status"                          | "No tools match …" message                        |
| Footer        | `footer`                                        | shows shortlist count                             |

**Rules:** no `div`-for-everything; every control is a real `button`/`input`; visible
focus outline on all interactive elements; body-text contrast ≥ 4.5:1.

---

## Accessibility checklist (task 1.1)

- [ ] One `h1`; headings descend in order (`h1 → h2 → h3`)
- [ ] Search field has a visible, associated `label`
- [ ] All interactive elements reachable by `Tab`, with a **visible focus ring**
- [ ] Filter chips use `aria-pressed`; Save buttons use `aria-pressed` (or `aria-label`)
- [ ] Results count announced via `aria-live="polite"`
- [ ] Empty state is announced, not just visual
- [ ] Body text / background contrast ≥ 4.5:1 (verify with axe or a contrast checker)
- [ ] Layout holds from 320px → wide desktop with no horizontal scroll
- [ ] Works keyboard-only: reach search, chips, Save, theme toggle without a mouse

---

## Three interactive behaviours (task 1.2)

**Behaviour 1 — Live search + category/price filter**
- Typing in the search box filters the visible tool cards by name, description and tags.
- Clicking a filter chip toggles that category/price on or off (`aria-pressed`).
- **Empty input** → show all tools. **No matches** → show the empty state with a
  "Clear filters" button.
- Logic written by hand over an in-memory array; no plugin.

**Behaviour 2 — Save to shortlist**
- Each card's **Save** button toggles that tool in a shortlist; the footer shows the
  live count and the button's `aria-pressed` reflects state.
- Clicking already-saved removes it.
- *(Week 3 will lift this state into Pinia and persist it; Week 1 keeps it in the view.)*

**Behaviour 3 — Theme toggle**
- A header button flips the `dark` class on `<html>` (Tailwind's class-based dark mode);
  its `aria-pressed` reflects the current state.
- *(Persistence via `localStorage` arrives in Week 3.)*

### Edge cases to handle
- Empty search + no filters → full list, count correct.
- Search with only whitespace → treated as empty.
- No matches → friendly empty state, never a blank page or crash.
- Filter combination that matches nothing → same empty state.

---

## Data for Week 1

- A small in-memory array of ~8 tools in `src/data/tools.js`
  (`id, name, category, price, description, tags, url`).
- **Week 2** replaces this with a fetch to the JSON Server mock API, adding real
  loading / empty / error states.

## Out of scope for this screen (later weeks)
- Tool detail view (`/tool/:slug`) — Week 3
- Compare view (`/compare?ids=`) — Week 3
- Shortlist page (`/saved`) — Week 3
- Async loading/error states — Week 2
