---
owner: product
status: active
last_updated: 2026-04-11
source_of_truth: true
---

# Next actions

## Now (Phase 3 — content and journey implementation)

### Next up

Continue Phase 3 content authoring per execution plan. Next groups:

- **Group A:** 4 remaining hub pages (work, payments, transport, daily-life) — content-only, no code
- **Group B:** 3 newcomer guides (day-one, first-week, airport-to-city + 1 source record)
- **Group C:** 3 work guides (quick-income, yandex-starter, live-gaming + 3 source records)
- **Group D:** 3 payments/transport guides (terminals, service-payments, public-transport-payments + source records)
- **Group E:** 3 housing/daily-life guides (owner-vs-agency, rental-checklist, essential-apps + source records)
- **Group F:** Home page (replace RoutePlaceholder with real components — code change)
- **Group G:** FAQ content
- **Group H:** Dashboard + Start copy audit
- **Group I:** Cross-link audit + editorial/trust review (depends on all above)

Groups A–E are parallelizable. Group F can start its skeleton alongside content. Groups G–I depend on A–E.

### Recently shipped (Phase 3)

- **Documents section guide batch (2026-04-11):** social-card.md + temporary-residency.md — full guide content + 4 source records. Documents section content-complete.
- **Hub content pipeline + universal loading (2026-04-11):** HubPageTemplate bodyHtml; all 7 hub + 6 guide routes content-wired. 3 hub pages (newcomer, documents, housing). Universal loading: new Markdown auto-renders.
- **Guide content pipeline + Phase 3 transition (2026-04-11):** Markdown rendering pipeline (unified/remark/rehype), renderMarkdownToHtml, loadPageContent, GuidePageTemplate bodyHtml. First real guide: /documents/address-registration. CURRENT_PHASE transitioned to Phase 3.

### Recently shipped (Phase 2)

- **Stay calculator page wiring (2026-04-11):** StayCalculatorBlock on /documents/stay-calculator — interactive form + result display.
- **Stay calculator logic v1 (2026-04-11):** calculateStay — 90-in-180 rolling window, module-only.
- **Guide trust wiring (2026-04-11):** loadTrustDataForPage + GuidePageTemplate trust props + 2 seed sources + address-registration page.
- **Trust UI components (2026-04-11):** SourceBlock, LastVerifiedNote, WhatMayVaryNote — presentational.
- **Dashboard checklist block (2026-04-11):** DashboardChecklistBlock + ChecklistItemRow + 8 seed items + filtering logic.
- **Dashboard NBA v1 (2026-04-06):** DashboardNextBestAction on /dashboard.
- **Onboarding complete (2026-04-04–2026-04-05):** Steps 1–6, guest persistence, emphasis/signals/outcome-preview pipeline.

## After Phase 3 exit

- **Phase 4** — search v1, updates surface, places-lite, analytics events, SEO, dashboard enhancement, perf check.
- **Phase 5** — full QA pass (responsive, trust, nav, security, analytics).
- **LAG** — close all gates (governance names, legal/privacy, production Sentry/Plausible).
- **Phase 6** — Vercel production deployment.
- **Phase 7** — post-launch stabilization.

## Blockers

- None for Phase 3 content authoring (pipeline is fully operational).
- **Pre-prod items** remain in [`OPEN_ITEMS.md`](OPEN_ITEMS.md): legal/privacy, governance names, production env projects.
