# AI use declaration

## What I used

An AI coding assistant (OpenCode) during Week 3. In Weeks 1 and 2 I used the
same tool for scaffolding, dataset authoring and documentation drafts.

## What the assistant did in Week 3

- Rewrote the README and the new docs in plain language.
- Moved components into `ui/`, `layout/` and `tools/`.
- Wrote the first versions of the UI primitives, the router, the views, the Pinia
  store and the tests.
- Ran the production build, Vitest, Lighthouse and the keyboard script.
- Rebuilt the interface in a near-monochrome palette with one blue accent after
  the design review, using design tokens and the existing primitives rather than
  new components.
- Drafted this declaration and the weekly note.

## What I did

- Set the requirements: no extension, no library added in the last week, do not
  move the frozen tags, ask before a large refactor.
- Chose the near-monochrome direction with a blue accent and supplied the reference sites.
- Chose the compare limit (three tools) and the decision to keep the comparison
  in the URL rather than in a store.
- Read the diffs before each commit and rejected or changed parts that were
  unclear or too clever.
- Ran the checks myself and looked at the results, including the failed ones.
- Wrote the final wording for the decisions, limitations and reflection.

## How the result was checked

| Check | Result |
|---|---|
| `npm run build` before each commit | passes |
| `npm run test` | 4 files, 13 tests, all pass |
| `npm run check:app` | 20 of 20 checks pass |
| `npm run check:a11y` | 0 axe violations in light and dark |
| Lighthouse accessibility, five screens | 1.00 each (home was 0.96 before) |
| Manual colour-contrast calculation, light and dark | passes 4.5:1 for body text |

The reports are in [`docs/`](.) and the checks are described in
[`accessibility.md`](accessibility.md).

## Limits

- The assistant cannot hear a screen reader or use a real phone. Those tests are
  still open and are listed in the accessibility page.
- Assistant text can be confident and wrong. I checked the docs against the code
  and the code against the build and tests.
- Everything in this repository was reviewed before it was committed. No
  unreviewed generated code is included.
