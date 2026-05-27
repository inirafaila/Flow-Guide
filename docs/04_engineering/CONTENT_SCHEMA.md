---
owner: engineering
status: active
last_updated: 2026-04-04
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
- **Checklist Item (§7, Phase 1 contract only):** Zod in `src/lib/schemas/checklist-item.ts`; Markdown under `src/content/checklist-items/*.md`; `parseMarkdownChecklistItem` in `parse-md.ts`. **Urgency** reuses `urgencyTagSchema` from `content-page.ts`. **Node loaders** (fail-fast): `loadValidatedChecklistItems` in `src/lib/content/load-checklist-and-updates.ts` — no checklist filtering or dashboard wiring.
- **Update Item (§11, Phase 1 contract only):** Zod in `src/lib/schemas/update-item.ts`; Markdown under `src/content/updates/*.md`; `parseMarkdownUpdateItem` in `parse-md.ts`. **Impact level** reuses `urgencyTagSchema`. **Node loaders:** `loadValidatedUpdateItems` in `load-checklist-and-updates.ts` — no `/updates` UI or surfacing.
- **Source Record (§10, Phase 1 contract only):** Zod in `src/lib/schemas/source-record.ts` (`source_type`, `confidence_level` per spec — **not** `urgencyTagSchema`, which includes `critical`); Markdown under `src/content/sources/*.md`; `parseMarkdownSourceRecord` in `parse-md.ts`. **Node loader (fail-fast):** `loadValidatedSourceRecords` in `load-sources.ts` — no trust UI, no page/runtime wiring, no search-index ingestion.
- **Place (§12, Phase 1 contract only):** Zod in `src/lib/schemas/place.ts` (`place_type`, `payment_methods` per spec §12; **`confidence_level`** reuses `sourceConfidenceLevelSchema` from `source-record.ts`). YAML uses **`place_type`** (not §21 shorthand `type`). Markdown under `src/content/places/*.md`; `parseMarkdownPlace` in `parse-md.ts`. **Node loader (fail-fast):** `loadValidatedPlaces` in `load-places.ts` — no `/places` routes, map UI, page `related_place_ids` wiring, or search-index ingestion.
- **Runtime-facing domain stubs (Epic 1.3, Phase 1 only):** Zod enums + thin non-persistent shapes in `src/lib/schemas/user.ts` (§5: `language`, `nationality`, `location_status`, `primary_goal`, `account_state`), `user-state.ts` (§6 stage enums + optional `userStateStubSchema`), `user-checklist-status.ts` (§8 `userChecklistStatusSchema` + `userChecklistStatusRecordSchema`), `request-submission.ts` (§13 `request_type`, `status`, `requestSubmissionRecordSchema` with `user_id` nullable / `payload_json` as `unknown`). Vitest `*.test.ts` alongside. **No** guest `localStorage`, onboarding, dashboard, forms/API, or search-index wiring.
- **Search index records (v2, Phase 4.1):** `{ id, type, title, excerpt, href, group, tags? }` — Zod in `src/lib/schemas/search-index.ts`, types in `src/types/search-index.ts`. Build: `build-search-index-records.ts` + `normalize-search-excerpt.ts` + `page-slug-to-href.ts` + synthetic `tool:stay-calculator`; output `public/search-index.json` via `scripts/build-search-index.mjs` → `build-search-index.impl.ts`. Runtime match: `src/lib/search/match-search-records.ts`.

## i18n fields

- Per-locale fields for title/body; single canonical **slug** (English-first).
