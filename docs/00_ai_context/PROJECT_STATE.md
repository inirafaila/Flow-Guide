---
owner: product
status: active
last_updated: 2026-04-04
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
- **Phase 1 in progress:** Next.js App Router app under repo root (`package.json`, `src/app/`, …)—**plumbing only** (no NBA/checklist/auth/CMS/Docker). **Routes:** IA shells live under **`src/app/[locale]/`** (required for **`next-intl`** + **`localePrefix: "never"`**); root **`layout.tsx`** + **`globals.css`** stay at **`src/app/`**. **App shell:** **`SiteHeader`** + **`SiteHeaderChrome`** — responsive header; **mobile** hamburger + drawer for IA links (**≥48rem** desktop inline nav); locale switcher stays in header on small viewports. **Shared UI baseline (Phase 1):** minimal design tokens in **`globals.css`**; **`Button`**, **`Card`**, **`SectionHeader`** in **`src/components/ui/`** wired to shell controls and page-type template blocks only (no product surfaces). **Page template shells:** hub / guide / calculator / utility / service-form **structural** placeholders (`src/features/routes/page-type-templates.tsx`, `RoutePageBanner`); generic **`RoutePlaceholder`** for **`/`**, **`/start`**, **`/dashboard`** only. **Content:** `src/content` Markdown is **Zod-validated** at build for **pages** and **FAQ**; **`search-index.json`** is generated from validated records (`scripts/build-search-index.mjs` + `tsx`); **`/search`** is still a placeholder (no grouped client search). **Checklist Item** / **Update Item** fixtures use **`src/content/checklist-items/`** and **`src/content/updates/`** with **`parse-md.ts`** + **`load-checklist-and-updates.ts`** (contract-only; no checklist/dashboard/update UI). **i18n:** `next-intl` with **`messages/en|fa|ru`**, English-only URLs, **`NEXT_LOCALE`** cookie via header switcher + middleware `requestLocale` resolution (**`?lang=`** not wired yet). **Observability (Phase 1 slice):** **`@sentry/nextjs`** env-gated (no DSN → no init); Plausible **not** loaded in **`next dev`** by default (opt-in env); minimal **JSON-line** server logger in **`src/lib/observability/logger.ts`** (instrumentation hook only in this slice).

## Approved roadmap backbone

**0A–0B** ✅ → **1** in progress → **2** product behavior → **3** MVP content → **4** utilities + hardening → **5** QA → **LAG** → **6** deploy → **7** stabilize → **8** admin → **9** expansion.

## Current roadmap phase

**Phase 1 — Engineering and content foundation (plumbing only).** Goal: route skeleton per `IA_SPEC.md`, typed content stubs, search-index build stub, minimal styles, CI-ready scripts, env-gated **Sentry** + dev-safe **Plausible** wiring—**no** Phase 2 business logic.

**Strategic constraint:** public production target **&lt; one month** after Phase 1–5 completion per roadmap.

## What is not yet decided

See [`OPEN_ITEMS.md`](OPEN_ITEMS.md): **pre-production** items (governance names, legal/privacy before prod, housing/casino if promoted, auth provider at account slice). **Architecture** for v1 is **not** open.

## Next execution-critical decisions

1. **Complete Phase 1 exit criteria** (routes, schemas, CI, stubs)—then start **Phase 2**.
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
