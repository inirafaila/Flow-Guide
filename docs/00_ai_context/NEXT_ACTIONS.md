---
owner: product
status: active
last_updated: 2026-04-03
source_of_truth: true
---

# Next actions

## Now (Phase 1 scaffold)

- **Shipped (content schema, Phase 1 slice, 2026-04-03):** **`src/lib/schemas/content-page.ts`** — optional **`DATA_CONTENT_MODEL_SPEC.md`** §9–aligned fields (`intent_type`, `related_page_slugs`, `searchable`, `dashboard_linkable`, `map_linked`, `urgency_tag`, `published_at`, `updated_at`, `is_active`); **`shouldIncludeInSearchIndex`**; search-index build **omits** rows when **`searchable: false`** or **`is_active: false`**. Tests in **`content-page.test.ts`**, **`build-search-index-records.test.ts`**. **`docs/04_engineering/CONTENT_SCHEMA.md`** updated. **No** Source/block-body/trust/dashboard behavior.
- **Shipped:** Git Markdown + YAML under `src/content/**` is validated at build time (shared **Zod** + `src/lib/content/parse-md.ts`); **`public/search-index.json`** is emitted from validated records via **`node scripts/build-search-index.mjs`** → **`tsx`** + `scripts/build-search-index.impl.ts` (invalid frontmatter **fails** `prebuild`). **`/search`** remains a Phase 1 placeholder (fetch + count only).
- **Shipped (routing + i18n):** App routes under **`src/app/[locale]/`** aligned with **`next-intl`** middleware internal rewrite (public URLs still unprefixed).
- **Shipped (i18n, Phase 1 UI-only):** **`next-intl`** request config uses middleware **`requestLocale`** + validated fallback; **`messages/{en,fa,ru}.json`** stay in parity (Vitest key-tree check); header **locale switcher** persists **`NEXT_LOCALE`** via server action (`src/i18n/set-locale.ts`). Optional **`?lang=`** query handling **deferred** (low priority vs middleware-order risk).
- **Shipped (CI, Phase 1):** **GitHub Actions** **`.github/workflows/ci.yml`** — on **pull requests to `main`**: **`npm ci`**, **`npm run lint`**, **`npm run test`**, **`npm run build`** (concurrency cancel in-flight).
- **Shipped (observability, Phase 1 slice, 2026-04-03):** **`@sentry/nextjs`** with env-gated **`Sentry.init`** (root **`sentry.client|server|edge.config.ts`**, **`src/instrumentation.ts`** + **`onRequestError`**). **Plausible** skips **`next dev`** by default; opt-in via **`NEXT_PUBLIC_PLAUSIBLE_ENABLE_DEV`**. **Shipped (structured logging, Phase 1 slice, 2026-04-04):** **`src/lib/observability/logger.ts`** (JSON lines) + Vitest; one **`logInfo`** in **`instrumentation`** after Sentry load. No analytics events, **Phase 1 not closed**.
- **Shipped (IA route skeleton, Phase 1 slice, 2026-04-03):** **`/housing/request`** via existing **`housing/[slug]`** (`request` added to **`HOUSING_SLUGS`** in **`src/lib/routes.ts`**); **`/housing/request/success`** as **`src/app/[locale]/housing/request/success/page.tsx`**. Placeholder shells only—**no** form, submission, or guest logic.
- **Shipped (page template shells, Phase 1 slice, 2026-04-03):** Distinct **structural** placeholder templates for **hub / guide / calculator / utility / service-form** IA routes: **`src/features/routes/page-type-templates.tsx`**, shared header **`RoutePageBanner`**, slug branching via **`src/lib/page-type-routes.ts`** (`stay-calculator` → calculator; `housing/request` → service-form via existing **`housing/[slug]`**). **`messages/{en,fa,ru}.json`** **`pageTemplate`** keys (parity test). Generic **`RoutePlaceholder`** retained for **`/`**, **`/start`**, **`/dashboard`** only. **No** trust data, NBA, checklist, guest behavior, grouped search UX.
- **Shipped (IA Phase 1 route contract, 2026-04-04):** **`src/lib/ia-phase1-routes.ts`** + **`src/lib/ia-phase1-routes.test.ts`** — MVP sitemap §6.1–6.9 page paths (32) + Vitest guard; **`/transport/airport`** redirect sourced from **`PHASE1_IA_AIRPORT_REDIRECT`** in **`src/middleware.ts`**. Does **not** add **`/places/*`** or Phase 4 search UX.
- Run **`npm install`** (pulls **tsx** devDependency), then **`npm run dev`** / **`npm run lint`**, **`npm run test`**, **`npm run build`** from repo root before merge.
- Fill **placeholder copy** on hub pages only where needed for sanity checks; keep **no** trust/legal claims until content review.
- Further frontmatter alignment: add fields only in **small bounded slices**; keep samples passing validation.
- **Done (docs, 2026-04-02):** **`DEVELOPMENT_BREAKDOWN.md`** reconciled with **`ROADMAP_MASTER`** phase boundaries — Phase 1 shipped/remaining, epic tags, §14 launch vs phase note, §19 phase gates (legacy sprints deprecated).

## Next

- Continue **Phase 1** toward exit criteria in [`CURRENT_PHASE.md`](CURRENT_PHASE.md) / [`DEVELOPMENT_BREAKDOWN.md`](../05_execution/DEVELOPMENT_BREAKDOWN.md) §Phase 1 **Remaining** (no CI gap for lint/test/build).

## After Phase 1 exit

- **Phase 2** — onboarding flow, guest state read/write, dashboard stubs → real behavior, trust blocks, per `ROADMAP_MASTER.md`.

## Blockers

- None for **Phase 1** engineering—**pre-prod** items remain in [`OPEN_ITEMS.md`](OPEN_ITEMS.md) (legal, governance names, LAG).
