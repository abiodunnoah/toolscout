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
- Repo: github.com/abiodunnoah/toolscout · Live URL: _<paste Netlify URL>_

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
