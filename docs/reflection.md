# Technical reflection (Week 3)

## What I set out to do

The mentor gave two main notes:

1. The documentation was hard to understand.
2. The code structure could be cleaner.

The guide also asked for routing, shared state, an accessibility pass and tests.
I did the work in that order: docs, structure, then features.

## What I think went well

**The structure is easier to explain now.** A view owns a route. A tool component
renders a tool. A UI component knows nothing about tools. The data service is the
only file that talks to the network. That sentence is the whole map, and
[`component-map.md`](component-map.md) can point to it.

**The refactor stayed boring.** I moved files in a separate commit before I
changed them. Git shows those commits as renames, not delete-and-add. The build
ran before every commit, so a broken import could not reach `main`.

**The accessibility work was measured, not guessed.** Lighthouse scored the old
site at 0.96 and named one real problem: dark-mode labels at 3.74:1. After the
fix, all five screens score 1.00. I also wrote a script that presses keys, because
Lighthouse cannot. It caught a real bug the score could not see.

**Plain local components were the right call.** shadcn/ui is a React library.
shadcn-vue exists, but adding a component library in the last week would have
added generated code I did not understand. Four small components gave the same
consistency and a much smaller surface.

## What was hard

**Writing simply is slow.** My first README draft still used words like
"componentise" and "state handling". I cut them, shortened the sentences and added
a glossary. The guide asks for a plain "why" for each decision, so the decisions
table also says what each choice costs.

**Contrast in dark mode is easy to miss.** `slate-500` looks fine on a white card
and fails on a dark card. The automated check found it because the measure is
mechanical. I now check both themes, not just the one I am looking at.

**Single-page apps move content without moving focus.** When a route changes, the
browser stays where it was. The fix is to focus the `main` region. My first
version also did this on the first page load, which broke the skip link: Tab
started inside `main`, not at the skip link. The keyboard script failed the first
check and showed me the mistake. The condition is now "do not move focus on the
first load".

**A false positive cost time.** My 375px check read
`document.documentElement.scrollWidth` and reported 149px of overflow on the
compare page. The page could not actually scroll: `window.scrollX` stayed at 0.
The number was the inner table's scroll width. I switched the check to
`document.body.scrollWidth`, which matches what the user sees.

**One bulk edit broke `package.json`.** A scripted find-and-replace wrote a
literal `\n` into the file. `npm run build` refused to run. That is a good reason
to keep the build step before every commit: it caught the mistake immediately.

## What I would do next

1. Put the search and filters in the URL, so a filtered list can be shared.
2. Test with a real screen reader and a real phone. The script uses Chrome at
   375px, which is not the same thing.
3. Add a "last checked" badge and a small process for refreshing stale tool data.
4. Lazy-load the views if the bundle grows. At 48KB gzipped it does not matter yet.
5. Add an axe check to the script. Lighthouse covers most of it, but axe has a few
   extra rules.

## What I would do differently

I would write the README after the refactor, not before. I rewrote it twice
because the file structure changed underneath it. The plain-language decisions
and glossary could have been written first; the structure section should follow
the code.

I would also add the keyboard script earlier. It found the focus bug in minutes,
and it would have been useful in Week 2 as well.
