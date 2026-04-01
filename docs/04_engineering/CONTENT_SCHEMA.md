---
owner: engineering
status: active
last_updated: 2026-04-01
source_of_truth: false
---

# Content schema

**Canonical detail:** `docs/02_product/DATA_CONTENT_MODEL_SPEC.md`.

## Implementation checklist

- Mirror entities: **Page**, **Source**, **Update**, **Place** (lite), **Checklist item**, **User profile** (when auth).
- Ensure **source** and **last verified** fields exist in CMS models for sensitive content.
- **Updates** must reference affected pages/slugs.

## Delivery

- Types generated or hand-written in `src/types/` should stay in sync with this doc and CMS.

## Phase 1 implementation (git Markdown)

- **Frontmatter schema:** `src/lib/schemas/content-page.ts` (Zod); **shared parse:** `src/lib/content/parse-md.ts`.
- **Search index records:** `src/lib/schemas/search-index.ts`, `src/types/search-index.ts`; **build:** `scripts/build-search-index.mjs` → `scripts/build-search-index.impl.ts` → `public/search-index.json`.

## i18n fields

- Per-locale fields for title/body; single canonical **slug** (English-first).
