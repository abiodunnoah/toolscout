# Accessibility pass (Week 3)

This page records what I measured, what failed, what I changed and what I still
have not tested.

## How I measured

- Tool: Lighthouse 12.8.2, accessibility category only.
- Browser: Chrome, headless, on Windows.
- **Before:** the live Week 2 site, <https://toolscoutt.netlify.app/>.
- **After:** the Week 3 production build, served with `npm run preview` at
  <http://localhost:4173>.
- The computer was in dark mode, so both runs tested the dark theme. Light-mode
  colours were checked by hand against the WCAG contrast formula.
- Raw reports are in this folder: `lighthouse-before-*.json` and
  `lighthouse-after-*.json`.

Command used for each page:

    npx lighthouse <url> --only-categories=accessibility --output=json --output-path=<file> --chrome-flags="--headless=new"

## Scores

| Page | Before | After |
|---|---|---|
| `/` | 0.96 | 1.00 |
| `/tool/:id` | not built | 1.00 |
| `/saved` | not built | 1.00 |
| `/compare?ids=...` | not built | 1.00 |
| 404 page | not built | 1.00 |

Lighthouse only runs automated checks. It cannot tell whether a focus ring is
easy to see, whether the order makes sense, or whether a screen reader reads the
right thing. The manual checks below try to cover those gaps.

## Redesign pass (28 October)

The page was rebuilt with a near-monochrome palette and one blue accent after a
design review. Every surface changed, so I re-ran the same checks.

- Lighthouse: **1.00** on all five screens. The `lighthouse-after-*.json` reports
  in this folder were regenerated for the redesign.
- axe: **0 violations** in light and dark mode.
- Keyboard and layout script: **20 of 20** checks pass at 320px.
- Console: no errors or warnings.

The redesign does not use colour alone to carry meaning. Price is written as text,
the saved state adds a check icon and `aria-pressed`, and the error state is
labelled in words.

## Final pass (1 November)

I re-ran the full audit on the current build after the palette and 404 changes.

- Lighthouse: **1.00** on all five screens. The `lighthouse-after-*.json`
  reports were regenerated.
- axe: **0 violations** in light and dark mode.
- Keyboard and layout: **20 of 20** checks at 320px.
- Reduced motion: with the OS setting on, `scroll-behavior` is `auto` and
  transitions run at 0.01ms.
- Compare checkbox labels measure **28px** tall, above the 24px target minimum.

### Contrast results

| Pair | Light | Dark | Needs |
|---|---|---|---|
| Body text on cards | 17.43:1 | 16.18:1 | 4.5:1 |
| Secondary text on canvas | 6.11:1 | 8.14:1 | 4.5:1 |
| Accent link on cards | 4.82:1 | 7.49:1 | 4.5:1 |
| Button text on accent | 4.82:1 | 7.49:1 | 4.5:1 |
| Focus ring on canvas | 4.54:1 | 8.19:1 | 3:1 |
| Input border on cards | 6.50:1 | 7.44:1 | 3:1 |

## Live check (1 November)

The final build was deployed from `main` at `bc28d84` to
<https://toolscoutt.netlify.app/>. I re-ran Lighthouse on the live URLs:

| URL | Score |
|---|---|
| `/` | 1.00 |
| `/tool/chatgpt` | 1.00 |
| `/saved` | 1.00 |
| `/compare?ids=chatgpt,claude` | 1.00 |
| `/nope` | 1.00 |

No scored accessibility audit failed. This also confirms that deep links and
the Netlify redirect work in production, not just in the local preview.

## What failed in the before run

The only automated failure was text contrast. These elements used `slate-500` on
a `slate-900` card in dark mode. That is a ratio of **3.74:1**. WCAG AA asks for
**4.5:1** for normal text.

- the Category and Price filter legends
- the category label on each tool card

Because the labels are 12px, they count as normal text and need the full 4.5:1.

## What changed

| Problem | Where | Fix |
|---|---|---|
| Dark labels at 3.74:1 | filter legends, card category | `slate-500` becomes `slate-400` in dark mode (about 6.9:1). Light mode moves from `slate-400` to `slate-600`. |
| The search label was only visible to screen readers | home | Added a visible label: "What do you need to do?" |
| No way to jump past the header | every page | Added a "Skip to content" link. It is hidden until it receives focus. |
| The skip link was not the first stop | page load | The router no longer moves focus on the first load, so Tab reaches the skip link first. |
| Focus stayed on the old page after a route change | all views | The router moves focus to the `main` region after a real route change. |
| Focus was lost after removing a compare column | `/compare` | Focus returns to the page heading, which is stable. |
| Input and select borders were too faint | search, sort | Borders use the `muted` token (6.5:1 on white), which is at least 3:1 against the page. |
| The empty state appeared silently | results | The empty state has `role="status"`, so it is announced. |
| Every page had the same document title | all views | Each route sets a title. The tool page uses the tool name. |
| The theme choice was forgotten | every page | The choice is stored in `localStorage` and restored on the next visit. |
| The active nav link looked like the others | header | The active link uses `aria-current="page"` and the full ink colour. |
| The page scrolled sideways at 320px | home, tool, saved | Bare `grid` containers let their track grow to the widest child. `grid-cols-1` at the base and `minmax(0,1fr)` on the wide layout keep every track inside the viewport. |
| Control borders were too faint to see | search, sort | Inputs and selects use the `muted` token (6.5:1 on white). Decorative card rules stay on the lighter `line` token. |
| Colour used to mark price and saved state | cards, detail | Price is plain text. The saved state adds a check icon, the word "Saved" and `aria-pressed`. Nothing depends on colour alone. |
| The first monochrome pass felt flat | whole page | Added Tesla's layered greys and one blue accent. The accent is limited to primary actions, active filters, links and focus, and measures 4.8:1 on white. |
| Smooth scrolling ignored reduced motion | home, hash links | CSS and JS check `prefers-reduced-motion`; scrolling becomes instant and transitions drop to 0.01ms. |
| Compare checkboxes were a 20px target | `/saved` | Labels now have `py-1`, giving a 28px target. WCAG 2.2 asks for 24px. |

## Keyboard and layout check

Lighthouse cannot press keys. I wrote a small script,
[`scripts/check-app.mjs`](../scripts/check-app.mjs), that drives the built site
in Chrome. It runs 20 checks and all 20 pass.

What it checks:

- the first Tab reveals the skip link
- the search field is reachable with Tab and shows a 2px outline
- typing filters the list and updates the live result count
- a filter chip toggles with Enter and updates `aria-pressed`
- `/tool/chatpdf` works as a deep link and the page title changes
- Save works from the keyboard and survives a reload
- `/saved` lists the saved tools
- two tools can be picked for compare with checkboxes
- the compare button is disabled until two tools are picked
- `/compare?ids=a,b` is a real deep link and renders a real table
- removing a compare column moves focus to the heading
- an unknown path shows the 404 view
- no horizontal page scroll at 320px on any of the four main screens

Run it with the preview server up:

    npm run build
    npm run preview          # in one terminal
    npm run check:app        # in another

## axe check

Lighthouse covers one colour scheme at a time. I also ran **axe-core** on every
screen in both light and dark mode. The check is in
[`scripts/check-a11y.mjs`](../scripts/check-a11y.mjs).

It visits `/`, `/tool/chatpdf`, `/saved`, `/compare?ids=chatpdf,elicit` and a
404 path. On each page it runs the WCAG 2.0, 2.1 and 2.2 A and AA rules, then
looks for console errors and warnings.

    npm run check:a11y

Result: **0 violations, 0 console errors** in both colour schemes.

## Still not tested

- **Screen readers.** I did not run NVDA, VoiceOver or TalkBack. The markup uses
  native elements and standard ARIA, but a real screen-reader test is still the
  best next step.
- **Real phones.** The script uses Chrome's 320px viewport, not a physical
  device. Safari on iOS may handle focus and sticky headers differently.
- **Zoom and reflow.** The layout was checked at 320px, not at 400% zoom.
