---
owner: product
status: active
last_updated: 2026-04-11
source_of_truth: false
---

# Temporary assumptions

Explicit guesses **until validated**. Replace with facts or move to locked docs when decided.

- ~~**Stack:** A modern React-based web stack (e.g. Next.js) is *likely*~~ → **Confirmed:** Next.js App Router + TypeScript + React (Phase 0B approved, shipped in Phase 1).
- **Hosting:** Single primary region acceptable for MVP if CDN covers static assets — confirm latency for target users. Vercel is the expected host per `ENGINEERING_ARCHITECTURE.md`.
- ~~**CMS:** Headless CMS *likely* for editorial workflow~~ → **Confirmed not for v1:** content is git-based Markdown + YAML with Zod validation. CMS-ready module boundaries in `lib/content/*` for future swap.
- **Languages:** FA/RU/EN priority implied by research — exact launch set TBD. i18n infrastructure shipped (next-intl), message parity enforced by Vitest.
- **Auth:** Email magic link or OAuth *candidate* — not locked until `OPEN_ITEMS.md` closed. Auth.js is default candidate per `OPEN_ITEMS.md`.
- **Payments info:** Educational / how-to only in MVP — no in-app payment processing assumed unless PRD extended.

When an assumption is wrong, delete or strike it and update specs that depended on it.
