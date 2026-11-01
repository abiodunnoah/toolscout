# Dataset research: six general assistants

**Date checked:** 1 November 2026.

## Why this was added

The 48-tool dataset was built task-first: research, writing, coding, study,
design and productivity. That left out the assistants people ask for by name:
ChatGPT, Claude, Gemini, DeepSeek, Microsoft Copilot and Grok. Searching
"Claude" returned nothing, which is a product gap, not a technical one.

## Sources checked

Official pages only:

- ChatGPT plans: <https://chatgpt.com/pricing/>
- ChatGPT help, Work and Codex: <https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex>
- Claude plans: <https://claude.com/pricing>
- Claude Code: <https://claude.com/product/claude-code>
- Gemini plans: <https://gemini.google/subscriptions/>
- Gemini student offer: <https://blog.google/innovation-and-ai/products/gemini-app/student-offer-google-ai/>
- DeepSeek download and app: <https://www.deepseek.com/en/download/>
- DeepSeek API pricing: <https://api-docs.deepseek.com/quick_start/pricing>
- Microsoft Copilot plans: <https://www.microsoft.com/en-us/copilot/pricing/individuals>
- Microsoft Copilot free vs Microsoft 365: <https://support.microsoft.com/en-us/microsoft-365-copilot/what-s-the-difference-between-microsoft-copilot-free-and-copilot-in-microsoft-365>
- Grok plans: <https://x.ai/pricing>
- Grok overview: <https://docs.x.ai/grok/overview>

## What the sources say

| Tool | Free tier | Paid route | Main strengths | Also under Coding |
|---|---|---|---|---|
| **ChatGPT** | GPT-6 text chat, limited files, images, voice, deep research and Codex | Go, Plus, Pro, Business, Enterprise | General chat, writing, research, Codex coding | Yes |
| **Claude** | Chat, file analysis, code execution, artifacts, limited usage | Pro (Claude Code, projects, research), Max, Ultra | Long documents, careful writing, coding agent | Yes |
| **Gemini** | Flash-Lite chat, limited image creation, Deep Research, Canvas, Gems | Google AI Plus, Pro, Ultra; student offer | Google Workspace, deep research, multimodal, coding | Yes |
| **DeepSeek** | Free web, iOS and Android chat; no ads | API billed per token | Reasoning, maths, coding, 1M context | Yes |
| **Microsoft Copilot** | Free chat, web answers, images, Windows/Edge | Microsoft 365 Personal/Family/Premium/Pro | Office files, Windows, web research | No |
| **Grok** | Limited chat and agent requests | X Premium plans | Live web and X search, multi-agent, image/video | No |

## Decisions

- **One primary category, plus `categories`.** A card still has one clear label,
  but the category filter now matches every entry in `categories`. This is why
  ChatGPT, Claude, Gemini and DeepSeek appear under Coding as well as their
  primary group.
- **Copilot and Grok stay out of Coding.** They can write code, but their
  official positioning is productivity and research. Their `tasks` and `tags`
  still mention code, so search finds them.
- **Qualitative pricing.** Exact prices change often. The dataset says "free
  plan", "paid plan" and what the paid route adds, not a price.
- **`editorScore` stays subjective.** It is my own rating, as the README says.
- **Student flag.** All six have a usable free tier, so `studentFriendly` is true
  under the project's definition. Gemini also had a one-year student offer on the
  date checked.

## What changed in the data

- 48 tools become **54**.
- Primary category counts become: Research 11, Writing 9, Coding 9, Study 7,
  Design 7, Productivity 11.
- The six new records are first in the file, so the default "Featured" order
  leads with the assistants people expect to see.
