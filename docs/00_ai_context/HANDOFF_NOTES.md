---
owner: product
status: active
last_updated: 2026-05-28
source_of_truth: true
---

# Handoff notes

## What changed (latest first)

- **Phase 4 — Slice 4.7 — Performance sanity (2026-05-28):** Evidence-driven audit on six launch routes (`/`, `/newcomer/day-one`, `/search`, `/start`, `/dashboard`, `/documents/stay-calculator`); baselines recorded (`search-index.json` 9,440 B / 33 records, `globals.css` 35,766 B); lint/test/build green (329 tests); **0 code fixes**. Report: [`PERF_SANITY_4_7_REPORT.md`](../05_execution/PERF_SANITY_4_7_REPORT.md). **Next:** Phase 4 exit / PRD reconciliation (doc-only); do **not** mark Phase 4 done in `ROADMAP_STATUS` until that pass.
- **Phase 4 — Slice 4.6 — Dashboard enhancement / Resume & reach (2026-05-31):** `/dashboard` adds re-entry intro + edit-answers link, `DashboardQuickActions` (5 routes), `DashboardUpdatesBlock` (≤3 server-fed rows + view all); `selectLatestUpdates`; NBA/checklist unchanged; no alerts, status card, or new persistence. PRD status card **deferred** (needs calculator/guest state). **329** tests; lint/test/build green. **Next:** Slice 4.7 perf.
- **Phase 4 — Slice 4.5 — SEO (2026-05-30):** `src/lib/seo/` (`site-url`, `sitemap-paths`, `noindex-paths`, `build-page-metadata`); `src/app/sitemap.ts` + `robots.ts`; `metadataBase` + per-route `generateMetadata` (English-only, raw titles); 26-url sitemap; noindex `/search`, `/dashboard`, `/start`, `/city`, `/housing/request*`. **323** Vitest tests; lint/test/build green. **Next:** Slice 4.6 Dashboard enhancement. Prod: set `NEXT_PUBLIC_SITE_URL`.
- **Phase 4 — Slice 4.4 — Analytics (2026-05-29):** `src/lib/analytics/track-event.ts` (6 allowlisted Plausible events) + `PlausiblePageview`; Home entry cards, onboarding start/complete (transition-only), dashboard NBA (`checklist_item_slug` target), `search_used` (bucket props, no query text), `stay_calculator_used`. **308** Vitest tests; lint/test/build green. Legal/privacy + production Plausible project still open ([`OPEN_ITEMS.md`](OPEN_ITEMS.md)). **Next:** Slice 4.5 SEO.
- **Phase 4 — Slice 4.3 — Places-lite (2026-05-28):** `loadPlaceItems` (max 5 active), `assertMapsUrlAllowed`, `PlaceCard`, `RelatedPlacesBlock` on 3 guides; 4 curated place seeds; search index +4 place rows (33 total); no `/city`, no `/places` routes, no map embed. **294** Vitest tests; lint/test/build green. **Next:** Slice 4.4 Analytics.
- **Phase 4 — Slice 4.2 — Updates v1 (2026-05-27):** `/updates` static editorial list (`loadUpdateItems`, `UpdatesPage`, `UpdateCard`); 3 seeds; fixture `sample-update.md` inactive; active items require `published_at`; excerpt rule (summary ≥140 → no body excerpt). **Not in slice:** search index, Home preview, Dashboard updates-for-you (**deferred 4.6**). **278** Vitest tests; lint/test/build green. **Next:** Slice 4.3 Places-lite.
- **Phase 4 — Slice 4.1 — Search v1 (2026-05-28):** Search index v2 (`href`, `group`, no bare `slug`); `normalize-search-excerpt.ts`, `page-slug-to-href.ts`, synthetic `tool:stay-calculator`; `match-search-records.ts` (single/multi-token rules, `pickBestMatch` gating); `/search` UI with grouped results. **29** index records.
- **Phase 3 exit verification passed (2026-05-27):** Automated `lint`/`test`/`build` green (255 tests); must-launch routes verified (content + Home/Start/Dashboard/FAQ); `content-internal-links` test; search index 28 records (22 pages + 6 FAQ, no Welcome row); RoutePageBanner has no phase1 shell; `/city` not in header nav. **Phase 3 closed** in `ROADMAP_STATUS`; **Phase 4 active** in `CURRENT_PHASE` / `CURRENT_FOCUS`. **Next:** Slice 4.1 Search v1 (plan then implement).
- **Phase 3 — Group I — bounded exit package (2026-05-27):** `RoutePageBanner` shows title + summary from content or `routeBanner.summaries.*` (no `placeholder.phase1`, no path `<code>`). `welcome.md` `is_active: false` / `searchable: false`; `sample-source.md` → `page_id: _fixture-welcome`. `StayCalculatorRelatedLinks` on stay-calculator; `stayCalculator.*` i18n + variance note. `content-internal-links.test.ts` for pages/faq Markdown. `/city` removed from `SiteHeader` nav (route remains; launch-adjacent deferral). **255** Vitest tests; lint/test/build green. **Next:** Phase 3 exit verification — do not mark Phase 3 done in `ROADMAP_STATUS` until checklist pass.
- **Phase 3 — Group H — Dashboard + Start copy audit (2026-05-28):** `dashboard.checklist.*` + `checklistRow.*` i18n; `ChecklistItemRow` client + `DashboardChecklistBlock` wired; `sample-row.md` `is_active: false`; Start `start-page` wrapper class.
- **Phase 3 — Group G — FAQ page (2026-05-27):** `FaqPage` + `loadFaqItems` + `faq-id.ts`; 6 FAQ Markdown entries; `/faq#<faq_id>` anchors; search-index FAQ slugs `/faq#…`; sample-question removed.
- **Phase 3 — Group F — Home page (2026-04-13):** HomePage + HomeEntryCard + HomeQuickToolItem replace RoutePlaceholder on `/`; includes hero, entry points, guided start, quick tools, trust section.
- **Phase 3 — Group E — housing + daily life guides (2026-04-12):** `owner-vs-agency.md`, `rental-checklist.md`, `essential-apps.md` + primary field sources `owner-vs-agency-field.md`, `rental-checklist-field.md`, `essential-apps-field.md`.
- **Phase 3 — Group D — payments + transport guides (2026-04-12):** `terminals.md`, `service-payments.md`, `public-transport-payments.md` + primary field sources `terminals-field.md`, `service-payments-field.md`, `public-transport-payments-field.md`.
- **Phase 3 — Group C — work guides (2026-04-12):** `quick-income.md`, `yandex-starter.md`, `live-gaming.md` + primary field sources `quick-income-field.md`, `yandex-starter-field.md`, `live-gaming-field.md` (`page_id` matches each slug; trust blocks load per guide).
- **Phase 3 — Groups A+B (2026-04-12):** Hub Markdown for work, payments, transport, daily-life; newcomer guides day-one, first-week, airport-to-city; field-experience source `airport-to-city-field.md` for airport-to-city trust.
- **Full doc sync + execution workflow integration (2026-04-11):** All docs under `docs/` updated for consistency: `CURSOR_NEW_CHAT_PROTOCOL.md` now documents the two-agent execution workflow (planning agent + Composer), checkpoint rules, and Composer prompt structure. `CURSOR_PLANNING_PROTOCOL.md` has new §8 for execution plan integration. `AI_INDEX.md` references the execution plan. `NEXT_ACTIONS.md` restructured for Phase 3 remaining work (Groups A–I). `TEMP_ASSUMPTIONS.md` updated — stack confirmed, CMS confirmed git-based. `FOLDER_STRUCTURE.md` updated with content pipeline and stay-calculator paths. `HANDOFF_NOTES.md` trimmed to actionable state.
- **Phase 3 — documents section guide batch (2026-04-11):** social-card.md + temporary-residency.md guide pages + 4 source records. Documents section **content-complete**.
- **Phase 3 — hub content pipeline + universal content loading (2026-04-11):** HubPageTemplate bodyHtml; all hub + guide routes content-wired. 3 hub pages authored. Universal loading: any new Markdown auto-renders.
- **Phase 3 — guide content pipeline + address-registration (2026-04-11):** renderMarkdownToHtml (unified + remark + rehype). loadPageContent. GuidePageTemplate bodyHtml. First real guide rendered. Phase 3 transition.
- **Phase 2 complete (2026-04-11):** Onboarding (steps 1–6) + guest persistence + dashboard (NBA v1 + checklist block) + trust UI (SourceBlock + LastVerifiedNote + WhatMayVaryNote + guide wiring) + stay calculator (logic + page). All exit criteria met.
- **Phase 1 complete (2026-04-04):** IA route skeleton + Zod contracts + search-index prebuild + CI + observability stubs + design tokens + templates + responsive shell + i18n.

## Repository reality

- **Phase 1** done (2026-04-04), **Phase 2** done (2026-04-11), **Phase 3** done (2026-05-27), **Phase 4** in progress.
- Content pipeline fully operational: `loadPageContent` + `loadTrustDataForPage` + `renderMarkdownToHtml`. Any new `.md` in `src/content/pages/` auto-renders on matching route.
- 329 Vitest tests, lint/test/build green.
- Documents section content-complete (3 guides + 6 source records + trust blocks).
- 7/7 hub pages authored; newcomer P0 guides (day-one, first-week, airport-to-city) authored with trust source on airport-to-city.
- Work section P0 guides authored (quick-income, yandex-starter, live-gaming) each with a primary field-experience source record.
- Payments P0 guides (terminals, service-payments) and transport P0 guide (public-transport-payments) authored, each with a primary field-experience source record.
- Housing guides (owner-vs-agency, rental-checklist) and daily-life guide (essential-apps) authored, each with a primary field-experience source record.
- FAQ, Home, all must-launch hubs/guides, Dashboard/Start copy, Group I banner/links — Phase 3 complete.
- **`/search`** — Search v1 shipped (includes Places group when indexed). **`/updates`** — Updates v1 shipped. **Places-lite** on three guides. **`/city`** launch-adjacent stub (unchanged).

## What the next session should do

1. Read **`CURRENT_PHASE.md`** and **`EXECUTION_ROADMAP.md`** §3 (Phase 4 slices).
2. Run **Phase 4 exit / PRD reconciliation** (doc-only waivers: status card, Home updates teaser, save-path, etc.) then mark Phase 4 done in `ROADMAP_STATUS`.
3. Keep **OPEN_ITEMS** / LAG gates separate from Phase 4 feature work.
4. Before commit: `npm run lint`, `npm run test`, `npm run build`.

## Still incomplete / watch
- **OPEN_ITEMS.md** pre-production gates: governance names, legal/privacy, production Sentry/Plausible projects.
- Replace placeholder research `.docx` with a repo-readable export when available (ops, not blocking).
