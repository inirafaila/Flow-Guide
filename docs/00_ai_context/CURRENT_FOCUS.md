---
owner: product
status: active
last_updated: 2026-04-04
source_of_truth: true
---

# Current focus

**Phase 1 only** — engineering and content **plumbing** (see [`ROADMAP_MASTER.md`](../01_strategy/ROADMAP_MASTER.md) Phase 1).

1. **Route skeleton** — IA hub and slug routes live under **`src/app/[locale]/`** ( **`next-intl`** internal segment; **`localePrefix: "never"`** keeps browser URLs unprefixed); root **`src/app/layout.tsx`** + shell; **`/transport/airport` → `/newcomer/airport-to-city`** (middleware).
2. **Responsive app shell (Phase 1)** — **`SiteHeaderChrome`**: mobile drawer for IA links; desktop inline nav; locale visible on mobile—**no** Phase 2 surfaces.
3. **Page template shells (Phase 1)** — **`page-type-templates.tsx`** + **`RoutePageBanner`**: structural placeholders for hub / guide / calculator / utility / service-form IA routes; **`/start`** and **`/dashboard`** stay generic **`RoutePlaceholder`**. No trust data or Phase 2 behavior.
4. **Content layer** — `src/content/` Markdown + YAML frontmatter validated with **Zod** (`src/lib/schemas/content-page.ts`, `src/lib/content/parse-md.ts`); extend fields toward `DATA_CONTENT_MODEL_SPEC.md` as needed.
5. **Search index (Phase 1)** — `scripts/build-search-index.mjs` runs **`build-search-index.impl.ts`** via **`tsx`** → **`public/search-index.json`** (validated output). **`/search`** loads JSON only as **placeholder** (no grouped / Phase 4 search UX).
6. **Observability (Phase 1 wiring)** — **`@sentry/nextjs`** env-gated via root **`sentry.*.config.ts`** + **`src/instrumentation.ts`** (no init without DSNs). Plausible gated on domain + **no default load in `next dev`** unless **`NEXT_PUBLIC_PLAUSIBLE_ENABLE_DEV=true`**. **Minimal structured server logs:** **`src/lib/observability/logger.ts`** (JSON per line); **release/source-map automation** remains a **later** slice.
7. **Quality baseline** — **`npm run lint`** (ESLint on `src/`), **`npm run build`**, **`npm run test`** (Vitest); **README** run instructions.
8. **i18n (Phase 1, UI-only)** — **`next-intl`** + **`messages/{en,fa,ru}`** + header locale switcher (**`NEXT_LOCALE`**); no locale-prefixed routes; optional **`?lang=`** deferred.

**Explicitly not in focus:** NBA, checklist, `localStorage` guest **behavior**, auth, forms, headless CMS, Docker, real grouped search UI, admin.
