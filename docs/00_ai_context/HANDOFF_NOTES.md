---
owner: product
status: active
last_updated: 2026-04-13
source_of_truth: true
---

# Handoff notes

## What changed (latest first)

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

- **Phase 1** done (2026-04-04), **Phase 2** done (2026-04-11), **Phase 3** in progress.
- Content pipeline fully operational: `loadPageContent` + `loadTrustDataForPage` + `renderMarkdownToHtml`. Any new `.md` in `src/content/pages/` auto-renders on matching route.
- 233 Vitest tests, lint/test/build green.
- Documents section content-complete (3 guides + 6 source records + trust blocks).
- 7/7 hub pages authored; newcomer P0 guides (day-one, first-week, airport-to-city) authored with trust source on airport-to-city.
- Work section P0 guides authored (quick-income, yandex-starter, live-gaming) each with a primary field-experience source record.
- Payments P0 guides (terminals, service-payments) and transport P0 guide (public-transport-payments) authored, each with a primary field-experience source record.
- Housing guides (owner-vs-agency, rental-checklist) and daily-life guide (essential-apps) authored, each with a primary field-experience source record.
- Remaining Phase 3: FAQ, Dashboard/Start copy audit, cross-link + editorial review — see `CURRENT_FOCUS.md`.

## What the next session should do

1. Read **`CURSOR_NEW_CHAT_PROTOCOL.md`** — it now contains the full execution workflow (two-agent model, checkpoint rules, Composer prompt structure).
2. Read **`CURRENT_FOCUS.md`** — Phase 3 remaining work is listed with shipped/remaining items.
3. Cross-reference with the **execution plan** (Groups A–I for Phase 3) to identify the next slice.
4. Write Composer implementation prompt for **Group G (FAQ)** or the next approved slice.
5. After every ~5 slices or group completion, trigger full doc sync.
6. Before commit/push: `npm run lint`, `npm run test`, `npm run build`.

## Still incomplete / watch

- **OPEN_ITEMS.md** pre-production gates: governance names, legal/privacy, production Sentry/Plausible projects.
- Replace placeholder research `.docx` with a repo-readable export when available (ops, not blocking).
