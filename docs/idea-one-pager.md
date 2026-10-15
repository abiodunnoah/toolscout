# ToolScout

Track: Frontend Development   Stack: Vue 3 + Vite + Vue Router + Pinia, Tailwind CSS, Vitest + Vue Test Utils

Target user: A student or early-career researcher who has a specific task — summarise papers, transcribe interviews, generate diagrams, clean up survey data — and doesn't know which AI tool to trust, or which are free / student-friendly.

Problem: Choosing an AI tool for one specific task is slow and noisy, because directories list thousands of tools with no easy way to compare shortlisted options side by side or remember promising ones.

Core flow: search tools -> filter results -> compare 2-3 tools -> view tool detail -> save to shortlist

Data source: mock (curated JSON dataset served through a JSON Server API)

In scope:
- Task-first search and filtering by category, price and student-friendliness
- Tool detail with pricing, platforms, best-for and notes
- Side-by-side comparison of 2-3 tools
- Shortlist of saved tools, persisted locally
- Responsive, accessible, deployed and tested

Out of scope:
- Accounts, login or server-side persistence
- Real-time data or scraping third-party directories
- Submitting or moderating new tools (admin panel)
- Payments or subscriptions
- LLM-generated recommendations

Top 3 risks:
1. Dataset authoring time — fix the schema first, then batch entries.
2. Compare feature scope — cap at 3 tools and a fixed attribute set.
3. "Mock data" perception — real loading/empty/error states and honest docs.
