---
owner: product
status: active
last_updated: 2026-04-04
source_of_truth: true
---

# Next actions

## Now (Phase 1 scaffold)

- **Shipped (Source Record content contract, Phase 1 slice, 2026-04-04):** Bounded Zod **`src/lib/schemas/source-record.ts`** (**`DATA_CONTENT_MODEL_SPEC.md`** §10: `source_type`, `confidence_level` as own enums — not `urgencyTagSchema`); **`parseMarkdownSourceRecord`** in **`parse-md.ts`**; Node **`loadValidatedSourceRecords`** in **`load-sources.ts`** (fail-fast, `Invalid source record <path>:` errors). Canonical dir **`src/content/sources/`** with **sample** fixture only. Vitest **`source-record.test.ts`**, **`load-sources.test.ts`**. **No** trust/source blocks on pages, **no** `source_ids` wiring from updates/pages, **no** search-index ingestion, **no** Place contract.
- **Shipped (checklist + update content contracts, Phase 1 slice, 2026-04-04):** Bounded Zod stubs **`src/lib/schemas/checklist-item.ts`** (§7) and **`update-item.ts`** (§11); **`parseMarkdownChecklistItem`** / **`parseMarkdownUpdateItem`** in **`parse-md.ts`**; Node **`loadValidatedChecklistItems`** / **`loadValidatedUpdateItems`** in **`load-checklist-and-updates.ts`** (fail-fast). Canonical dirs **`src/content/checklist-items/`**, **`src/content/updates/`** with **sample** fixtures only. Vitest **`checklist-item.test.ts`**, **`update-item.test.ts`**, **`load-checklist-and-updates.test.ts`**. **`urgencyTagSchema`** reused for checklist **`urgency_level`** and update **`impact_level`**. **No** checklist filtering, dashboard, guest, `/updates` UI, or search-index changes.
- **Shipped (shared UI baseline, Phase 1 slice, 2026-04-04):** Minimal **design tokens** in **`src/app/globals.css`** (`--space-*`, `--radius-*`, `--text-*`, `--surface-muted`; existing neutral palette unchanged in intent). Thin primitives **`Button`**, **`Card`**, **`SectionHeader`** in **`src/components/ui/`** + **`fg-*`** classes; **`SiteHeaderChrome`** menu control and **`LocaleSwitcher`** submit buttons use **`Button`**; **`page-type-templates.tsx`** block + utility shell use **`Card`** + **`SectionHeader`**. Vitest **`primitives.test.ts`**; **`vitest.config.ts`** **`esbuild.jsx: automatic`** for UI imports in tests. **No** Home/Start/Dashboard product layout, trust wiring, grouped search, or Phase 2 behavior. **Phase 1 exit** still not marked done (e.g. optional further Zod/schema alignment per breakdown).
- **Shipped (content schema, Phase 1 slice, 2026-04-03):** **`src/lib/schemas/content-page.ts`** — optional **`DATA_CONTENT_MODEL_SPEC.md`** §9–aligned fields (`intent_type`, `related_page_slugs`, `searchable`, `dashboard_linkable`, `map_linked`, `urgency_tag`, `published_at`, `updated_at`, `is_active`); **`shouldIncludeInSearchIndex`**; search-index build **omits** rows when **`searchable: false`** or **`is_active: false`**. Tests in **`content-page.test.ts`**, **`build-search-index-records.test.ts`**. **`docs/04_engineering/CONTENT_SCHEMA.md`** updated. **No** Source/block-body/trust/dashboard behavior.
- **Shipped:** Git Markdown + YAML under `src/content/**` is validated at build time (shared **Zod** + `src/lib/content/parse-md.ts`); **`public/search-index.json`** is emitted from validated records via **`node scripts/build-search-index.mjs`** → **`tsx`** + `scripts/build-search-index.impl.ts` (invalid frontmatter **fails** `prebuild`). **`/search`** remains a Phase 1 placeholder (fetch + count only).
- **Shipped (routing + i18n):** App routes under **`src/app/[locale]/`** aligned with **`next-intl`** middleware internal rewrite (public URLs still unprefixed).
- **Shipped (i18n, Phase 1 UI-only):** **`next-intl`** request config uses middleware **`requestLocale`** + validated fallback; **`messages/{en,fa,ru}.json`** stay in parity (Vitest key-tree check); header **locale switcher** persists **`NEXT_LOCALE`** via server action (`src/i18n/set-locale.ts`). Optional **`?lang=`** query handling **deferred** (low priority vs middleware-order risk).
- **Shipped (CI, Phase 1):** **GitHub Actions** **`.github/workflows/ci.yml`** — on **pull requests to `main`**: **`npm ci`**, **`npm run lint`**, **`npm run test`**, **`npm run build`** (concurrency cancel in-flight).
- **Shipped (observability, Phase 1 slice, 2026-04-03):** **`@sentry/nextjs`** with env-gated **`Sentry.init`** (root **`sentry.client|server|edge.config.ts`**, **`src/instrumentation.ts`** + **`onRequestError`**). **Plausible** skips **`next dev`** by default; opt-in via **`NEXT_PUBLIC_PLAUSIBLE_ENABLE_DEV`**. **Shipped (structured logging, Phase 1 slice, 2026-04-04):** **`src/lib/observability/logger.ts`** (JSON lines) + Vitest; one **`logInfo`** in **`instrumentation`** after Sentry load. No analytics events, **Phase 1 not closed**.
- **Shipped (IA route skeleton, Phase 1 slice, 2026-04-03):** **`/housing/request`** via existing **`housing/[slug]`** (`request` added to **`HOUSING_SLUGS`** in **`src/lib/routes.ts`**); **`/housing/request/success`** as **`src/app/[locale]/housing/request/success/page.tsx`**. Placeholder shells only—**no** form, submission, or guest logic.
- **Shipped (page template shells, Phase 1 slice, 2026-04-03):** Distinct **structural** placeholder templates for **hub / guide / calculator / utility / service-form** IA routes: **`src/features/routes/page-type-templates.tsx`**, shared header **`RoutePageBanner`**, slug branching via **`src/lib/page-type-routes.ts`** (`stay-calculator` → calculator; `housing/request` → service-form via existing **`housing/[slug]`**). **`messages/{en,fa,ru}.json`** **`pageTemplate`** keys (parity test). Generic **`RoutePlaceholder`** retained for **`/`**, **`/start`**, **`/dashboard`** only. **No** trust data, NBA, checklist, guest behavior, grouped search UX.
- **Shipped (IA Phase 1 route contract, 2026-04-04):** **`src/lib/ia-phase1-routes.ts`** + **`src/lib/ia-phase1-routes.test.ts`** — MVP sitemap §6.1–6.9 page paths (32) + Vitest guard; **`/transport/airport`** redirect sourced from **`PHASE1_IA_AIRPORT_REDIRECT`** in **`src/middleware.ts`**. Does **not** add **`/places/*`** or Phase 4 search UX.
- **Shipped (responsive app shell + mobile nav, Phase 1 slice, 2026-04-04):** **`src/components/shell/SiteHeaderChrome.tsx`** (client) + **`SiteHeader.tsx`** — hamburger + drawer for IA links under **48rem**; desktop horizontal nav unchanged in behavior; **`LocaleSwitcher`** stays visible in header on mobile; Escape / backdrop / route change close drawer; **`messages/{en,fa,ru}.json`** **`shell.primaryNav`**, **`shell.menuOpen`**, **`shell.menuClose`** (parity test). **`src/app/globals.css`** responsive header rules. **No** Phase 2 behavior; **`/start`** / **`/dashboard`** only inherit shared shell chrome.
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
