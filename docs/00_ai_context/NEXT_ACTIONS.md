---
owner: product
status: active
last_updated: 2026-05-28
source_of_truth: true
---

# Next actions

## Now (Phase 4 — utility, instrumentation, launch-scope hardening)

### Next up

**Phase 4 exit — PRD/MVP reconciliation** (doc-only waivers; then `ROADMAP_STATUS` Phase 4 → Done). Report: [`PERF_SANITY_4_7_REPORT.md`](../05_execution/PERF_SANITY_4_7_REPORT.md). Do **not** bundle Phase 5 full QA.

### Recently shipped (Phase 4)

- **Slice 4.7 — Performance sanity (2026-05-28):** Six-route mobile smoke + baselines; lint/test/build green (329 tests); **0 code fixes**. Evidence: [`PERF_SANITY_4_7_REPORT.md`](../05_execution/PERF_SANITY_4_7_REPORT.md).
- **Slice 4.6 — Dashboard enhancement / Resume & reach (2026-05-31):** `DashboardReentryNote`, `DashboardQuickActions`, `DashboardUpdatesBlock`, `DashboardUpdateRow`, `selectLatestUpdates`; server-fed latest 3 updates; 5 quick links; no new storage/analytics; PRD **residency/status card** deferred (waiver for Phase 5 reconciliation). **329** Vitest tests; lint/test/build green.
- **Slice 4.5 — SEO (2026-05-30):** `src/lib/seo/*` (English-only metadata, canonicals via `NEXT_PUBLIC_SITE_URL`), `sitemap.xml` (26 paths from `PHASE1_IA_PAGE_PATHS`), `robots.txt`, noindex on utility/thin/form routes; minimal OG/Twitter mirroring; **323** Vitest tests; lint/test/build green. Set prod `NEXT_PUBLIC_SITE_URL` before launch.
- **Slice 4.4 — Analytics (2026-05-29):** `trackEvent` allowlist (6 events) + `PlausiblePageview` SPA helper; instrumented Home entry cards, onboarding start/complete, dashboard NBA clicks, search buckets, stay calculator; no raw queries; legal/Plausible prod remain [`OPEN_ITEMS.md`](OPEN_ITEMS.md).
- **Slice 4.3 — Places-lite (2026-05-28):** `loadPlaceItems` + `assertMapsUrlAllowed`; 4 curated places (max 5); `PlaceCard` + `RelatedPlacesBlock` on terminals / address-registration / public-transport-payments; search index Places group (`href` = parent guide); `sample-place.md` inactive; `/city` untouched.
- **Slice 4.2 — Updates v1 (2026-05-27):** `loadUpdateItems` + `UpdatesPage` / `UpdateCard` on `/updates`; 3 editorial seeds; `sample-update.md` inactive; calm impact badges; no search index / Home / Dashboard teasers (4.6).
- **Slice 4.1 — Search v1 (2026-05-28):** Enriched `search-index.json` v2 (`href`, `group`, synthetic stay-calculator); grouped client search on `/search` (`SearchPage`, token match, best-match gating); removed `SearchStub` + utility placeholder shell.

### Pre-LAG (unchanged — not Phase 4 blockers)

See [`OPEN_ITEMS.md`](OPEN_ITEMS.md): governance names, legal/privacy, production Sentry/Plausible projects.

### Recently shipped (Phase 3 — closed 2026-05-27)

- **Phase 3 exit verification (2026-05-27):** `lint` / `test` / `build` green; checklist §2 satisfied; `ROADMAP_STATUS` Phase 3 → Done; Phase 4 active.
- **Group I — Cross-link audit + bounded exit package (2026-05-27):** `RoutePageBanner` product-facing title + summary (no phase1/path code); `route-path-to-slug` + `content-internal-links` test; `welcome.md` deactivated from search index; `sample-source` fixture `page_id`; stay-calculator i18n variance + `StayCalculatorRelatedLinks`; `/city` removed from header nav; FAQ intro deduped with banner.
- **Group H — Dashboard + Start copy audit (2026-05-28):** Checklist chrome i18n (`dashboard.checklist.*`, `checklistRow.*`); `sample-checklist-row` deactivated; Start wrapper class `start-page`; dashboard/onboarding message audit (en/fa/ru).
- **Group G — FAQ page (2026-05-27):** `loadFaqItems` + `faq-id.ts` (SSOT) + `FaqPage` on `/`; 6 FAQ entries under `src/content/faq/`; anchor deep links `/faq#<faq_id>`; search-index FAQ slugs aligned; no jump nav (deferred).
- **Group F — Home page (2026-04-13):** `HomePage`, `HomeEntryCard`, `HomeQuickToolItem` replace `RoutePlaceholder` on `/`; hero, entry points, guided start, quick tools, trust section; `home.*` i18n (en/fa/ru).
- **Group E — housing + daily life (2026-04-12):** `owner-vs-agency.md`, `rental-checklist.md`, `essential-apps.md` + primary field sources `owner-vs-agency-field.md`, `rental-checklist-field.md`, `essential-apps-field.md`. Housing P0/P1-style guides + daily-life P1 guide content- and trust-complete; hubs already linked. (`housing/request` not in scope.)
- **Group D — payments + transport (2026-04-12):** `terminals.md`, `service-payments.md`, `public-transport-payments.md` + primary field sources `terminals-field.md`, `service-payments-field.md`, `public-transport-payments-field.md`. Payments P0 guides + transport P0 guide content- and trust-complete; hubs already linked.
- **Group C — work section (2026-04-12):** 3 work guides (`quick-income.md`, `yandex-starter.md`, `live-gaming.md`) + 3 field-experience source records (`quick-income-field.md`, `yandex-starter-field.md`, `live-gaming-field.md`). Work hub links were already present; guides + trust wiring complete for P0 work slugs.
- **Groups A+B hub + newcomer batch (2026-04-12):** 4 hub pages (work.md, payments.md, transport.md, daily-life.md) + 3 newcomer guides (day-one.md, first-week.md, airport-to-city.md) + 1 source record (airport-to-city-field.md). All 7 hubs authored; newcomer section guides content-complete for P0 slugs.
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

## After Phase 4 exit

- **Phase 5** — full QA pass (responsive, trust, nav, security/privacy, analytics).
- **LAG** — close all gates (governance names, legal/privacy, production Sentry/Plausible).
- **Phase 6** — Vercel production deployment.
- **Phase 7** — post-launch stabilization.

## Blockers

- None for Phase 4 implementation start (Phase 3 pipeline complete).
- **Pre-prod / LAG items** remain in [`OPEN_ITEMS.md`](OPEN_ITEMS.md): legal/privacy, governance names, production env projects.
