---
owner: engineering
status: active
last_updated: 2026-05-28
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
- **Update Item (§11):** Zod in `src/lib/schemas/update-item.ts`; Markdown under `src/content/updates/*.md`; `parseMarkdownUpdateItem` in `parse-md.ts`. **Impact level** reuses `urgencyTagSchema`. **Contract loader:** `loadValidatedUpdateItems` in `load-checklist-and-updates.ts`. **Product loader (Phase 4.2):** `loadUpdateItems` in `load-update-items.ts` — active items only (`is_active !== false`), **requires** `published_at`, sorts desc, validates `related_page_slugs` (full IA paths), body excerpt when summary &lt; 140 chars (`SUMMARY_EXCERPT_THRESHOLD`). **UI:** `UpdatesPage` + `UpdateCard` on `/updates` — summary + optional excerpt (no full HTML body); no search-index ingestion in 4.2.
- **Source Record (§10, Phase 1 contract only):** Zod in `src/lib/schemas/source-record.ts` (`source_type`, `confidence_level` per spec — **not** `urgencyTagSchema`, which includes `critical`); Markdown under `src/content/sources/*.md`; `parseMarkdownSourceRecord` in `parse-md.ts`. **Node loader (fail-fast):** `loadValidatedSourceRecords` in `load-sources.ts` — no trust UI, no page/runtime wiring, no search-index ingestion.
- **Place (§12, Phase 4.3 Places-lite):** Zod in `src/lib/schemas/place.ts` — adds **`parent_guide_href`**, optional **`maps_url`** (`assertMapsUrlAllowed` in `src/lib/places/assert-maps-url.ts`). **Contract loader:** `loadValidatedPlaces` in `load-places.ts` (all files, including inactive fixture). **Product loader:** `loadPlaceItems` / `loadPlacesForGuide` in `load-place-items.ts` — active only, max **5** active places, requires `notes` + `parent_guide_href`, optional `maps_url` https allowlist; **no** `opening_hours` / `confidence_level` in UI. **UI:** `PlaceCard` + `RelatedPlacesBlock` on three guides (`/payments/terminals`, `/documents/address-registration`, `/transport/public-transport-payments`); max **3** cards per guide. **Search index:** `type: place`, `group: places`, `href` = parent guide, `excerpt` = `normalizeSearchExcerpt(notes, 140)`. **Not in slice:** `/places` routes, `/city` hub, map embeds, visible `place_type` labels.
- **Runtime-facing domain stubs (Epic 1.3, Phase 1 only):** Zod enums + thin non-persistent shapes in `src/lib/schemas/user.ts` (§5: `language`, `nationality`, `location_status`, `primary_goal`, `account_state`), `user-state.ts` (§6 stage enums + optional `userStateStubSchema`), `user-checklist-status.ts` (§8 `userChecklistStatusSchema` + `userChecklistStatusRecordSchema`), `request-submission.ts` (§13 `request_type`, `status`, `requestSubmissionRecordSchema` with `user_id` nullable / `payload_json` as `unknown`). Vitest `*.test.ts` alongside. **No** guest `localStorage`, onboarding, dashboard, forms/API, or search-index wiring.
- **Search index records (v2, Phase 4.1 + 4.3):** `{ id, type, title, excerpt, href, group, tags? }` — Zod in `src/lib/schemas/search-index.ts`, types in `src/types/search-index.ts`. Build: `build-search-index-records.ts` (pages, FAQ, synthetic stay-calculator, **active places** via `loadPlaceItems`) + `normalize-search-excerpt.ts` + `page-slug-to-href.ts`; output `public/search-index.json` via `scripts/build-search-index.mjs` → `build-search-index.impl.ts`. Runtime match: `src/lib/search/match-search-records.ts`.

## i18n fields

- Per-locale fields for title/body; single canonical **slug** (English-first).
