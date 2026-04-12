---
owner: product
status: active
last_updated: 2026-04-11
source_of_truth: true
---

# Project state

## What the product is

**Flow-Guide** is a **web app**: structured **newcomer guide** + **short guided onboarding** + **dashboard** (next best action, checklist, alerts) for people starting life in **Armenia**, with **source-aware** trust metadata on sensitive topics. **Guest-first, account-later**; **newcomer-first**; **English-first slugs**; **mobile-first**. Not a marketplace, super-app, full map platform, or events/community platform in MVP (per locked direction + PRD).

## What is already completed

- **Product / UX / content specs** under `docs/02_product/`, `docs/03_design/`, `docs/06_research/`.
- **Execution backlog shape** in `docs/05_execution/DEVELOPMENT_BREAKDOWN.md`.
- **AI context pack** (`docs/00_ai_context/`) with locked decisions/logic and protocols.
- **Master roadmap:** [`docs/01_strategy/ROADMAP_MASTER.md`](../01_strategy/ROADMAP_MASTER.md).
- **Phase 0 closed (2026-04-01):** [`docs/04_engineering/PHASE_0_DECISION_RECORD.md`](../04_engineering/PHASE_0_DECISION_RECORD.md) **approved**; [`docs/04_engineering/ENGINEERING_ARCHITECTURE.md`](../04_engineering/ENGINEERING_ARCHITECTURE.md) is the build source of truth.
- **Phase 1 complete (2026-04-04):** Next.js App Router app under repo root (`package.json`, `src/app/`, …)—**plumbing only** (no NBA/checklist/auth/CMS/Docker product logic). **Routes:** IA shells under **`src/app/[locale]/`** (**`next-intl`** + **`localePrefix: "never"`**); **`src/lib/ia-phase1-routes.ts`** + tests; **`/transport/airport` → `/newcomer/airport-to-city`** in middleware. **App shell:** **`SiteHeader`** + **`SiteHeaderChrome`** (responsive + mobile drawer). **Shared UI baseline:** design tokens **`globals.css`**; **`Button`**, **`Card`**, **`SectionHeader`** on shell + template placeholders only. **Page template shells:** hub / guide / calculator / utility / service-form (`page-type-templates.tsx`, `RoutePageBanner`); **`RoutePlaceholder`** for **`/`** only; **`/start`** = Phase 2 onboarding (guest blob); **`/dashboard`** = Phase 2 product UI in later slices (not Phase 1 placeholder). **Content:** `src/content` **Zod-validated** at build (pages + FAQ); **`search-index.json`** via `prebuild` (`scripts/build-search-index.mjs` + `tsx`); **`/search`** placeholder only. **Contracts (no product UI wiring):** checklist/update/source/place loaders + canonical dirs; Epic **1.3** stubs **`user.ts`**, **`user-state.ts`**, **`user-checklist-status.ts`**, **`request-submission.ts`**. **i18n:** `next-intl`, **`NEXT_LOCALE`**, **`?lang=`** deferred. **Observability:** env-gated **Sentry** + dev-safe **Plausible**; **`logger.ts`** JSON lines + instrumentation **`logInfo`**. **CI:** PR **`lint` / `test` / `build`** on `main`.
- **Phase 2 complete (2026-04-11):** Guest persistence, onboarding (steps 1–6), dashboard NBA v1 + checklist block (**`ChecklistItemRow`** + **`filterChecklistItems`**), trust UI (**SourceBlock**, **LastVerifiedNote**, **WhatMayVaryNote**) + guide trust wiring, stay calculator (**`calculateStay`** + **`StayCalculatorBlock`** on **`/documents/stay-calculator`**). **Pure emphasis v1** / **signals v2** / **outcome preview v1** unchanged in lib. Incremental follow-ups (not Phase 2 exit blockers): full dashboard shell, i18n, UserChecklistStatus, more trust seeding, residency card — see [`ROADMAP_MASTER.md`](../01_strategy/ROADMAP_MASTER.md).
- **Phase 3 in progress (content track):** Guide + hub content pipelines — Markdown rendering (**unified** / **remark-parse** / **remark-rehype** / **rehype-stringify**), **`renderMarkdownToHtml`**, **`loadPageContent`**, **`GuidePageTemplate`** / **`HubPageTemplate`** optional **`bodyHtml`** + **`.guide-body`** / **`.hub-body`** CSS. All hub and guide **[slug]** routes load content (and trust on guides); first real guide: **`/documents/address-registration`**; first hub Markdown: **`/newcomer`**, **`/documents`**, **`/housing`**. **Universal route wiring:** new **`src/content/pages/*.md`** files render on the matching slug without extra route code. **Remaining:** Home page, remaining hub copy (work, payments, transport, daily-life), all other must-launch guide pages, cross-links, editorial + trust review per governance — [`CURRENT_PHASE.md`](CURRENT_PHASE.md).

## Approved roadmap backbone

**0A–0B** ✅ → **1** ✅ (2026-04-04) → **2** ✅ (2026-04-11) → **3** in progress → **4** utilities + hardening → **5** QA → **LAG** → **6** deploy → **7** stabilize → **8** admin → **9** expansion.

## Current roadmap phase

**Phase 3 — MVP content and journey implementation.** Ship must-launch guides and hubs with substantive copy, working cross-links, and editorial/trust review for sensitive topics — per [`ROADMAP_MASTER.md`](../01_strategy/ROADMAP_MASTER.md) Phase 3 and [`CURRENT_PHASE.md`](CURRENT_PHASE.md).

**Strategic constraint:** public production target **&lt; one month** after Phase 1–5 completion per roadmap.

## What is not yet decided

See [`OPEN_ITEMS.md`](OPEN_ITEMS.md): **pre-production** items (governance names, legal/privacy before prod, housing/casino if promoted, auth provider at account slice). **Architecture** for v1 is **not** open.

## Next execution-critical decisions

1. **Execute Phase 3** per [`CURRENT_PHASE.md`](CURRENT_PHASE.md) / [`DEVELOPMENT_BREAKDOWN.md`](../05_execution/DEVELOPMENT_BREAKDOWN.md)—must-launch content and journeys; no regressions on Phase 1–2 plumbing.
2. **Assign content governance names** before shipping sensitive verified copy.
3. **Legal / privacy** sign-off before **LAG** / production.

## Source-of-truth map

| Area | Doc |
|------|-----|
| **Master roadmap** | `docs/01_strategy/ROADMAP_MASTER.md` |
| **Roadmap progress** | `docs/01_strategy/ROADMAP_STATUS.md` |
| **Phase 0 (approved)** | `docs/04_engineering/PHASE_0_DECISION_RECORD.md` |
| **MVP engineering architecture** | `docs/04_engineering/ENGINEERING_ARCHITECTURE.md` |
| MVP requirements | `docs/02_product/PRD_MVP.md` |
| IA / routing | `docs/02_product/IA_SPEC.md` |
| Entities & contracts | `docs/02_product/DATA_CONTENT_MODEL_SPEC.md` |
| UI structure | `docs/02_product/UI_HANDOFF_SPEC.md` |
| Locked product rules | `LOCKED_DECISIONS.md`, `LOCKED_LOGIC.md` |
| Ticket plan | `docs/05_execution/DEVELOPMENT_BREAKDOWN.md` |
