---
owner: engineering
status: active
last_updated: 2026-04-03
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
- **Bounded optional fields (Phase 1 slice, toward `DATA_CONTENT_MODEL_SPEC.md` §9):** `intent_type`, `related_page_slugs`, `searchable`, `dashboard_linkable`, `map_linked`, `urgency_tag`, `published_at`, `updated_at`, `is_active` — all optional; legacy files without them still validate. **`faq`** remains a valid `page_type` for `src/content/faq/`. **Search index:** rows are omitted when `searchable: false` or `is_active: false` (`shouldIncludeInSearchIndex` in `content-page.ts`); default is include.
- **Search index records:** `src/lib/schemas/search-index.ts`, `src/types/search-index.ts`; **build:** `scripts/build-search-index.mjs` → `scripts/build-search-index.impl.ts` → `public/search-index.json`.

## i18n fields

- Per-locale fields for title/body; single canonical **slug** (English-first).
