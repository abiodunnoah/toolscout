# ToolScout — Work Plan

Track: Frontend Development

## Week 1 — Foundations

- Idea one-pager and one-page work plan
- Public repo with a starter README
- Key screen: responsive, mobile-first, semantic and accessible
- JavaScript interactivity (live search/filter + empty state)
- Tag `week-1`; 5-minute presentation to mentors

## Week 2 — Components and data

- Respond to Week 1 feedback; keep an issue log (5+ entries)
- Componentise the UI: `SearchBar`, `ToolCard`, `TagFilter`, `CompareTable`
- Load data via JSON Server with loading, empty and error + retry states
- Filter by category and price; add a component map to the README
- Tag `week-2`

## Week 3 — Quality and delivery

- Routed views: `/`, `/tool/:slug`, `/compare?ids=a,b`, `/saved`, and a 404 view
- Persist shortlist and comparison state across views (and reloads)
- Accessibility pass with before/after Lighthouse or axe scores
- 3+ automated tests; deploy to Netlify
- Final README, walkthrough video, reflection and declaration
- Tag `week-3`

## Top 3 risks

1. Dataset authoring time — fix the schema first, then batch entries.
2. Compare feature scope — cap at 3 tools and a fixed attribute set.
3. "Mock data" perception — real loading/empty/error states and honest docs.
