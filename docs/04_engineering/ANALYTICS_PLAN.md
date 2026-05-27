---
owner: engineering
status: active
last_updated: 2026-05-29
source_of_truth: false
---

# Analytics plan

## Principles

- **Privacy-first:** minimize PII; no raw search queries; no consent UI in MVP code (legal sign-off remains [`OPEN_ITEMS.md`](../00_ai_context/OPEN_ITEMS.md)).
- **Vendor:** **Plausible** (locked Phase 0B).
- **Event naming:** snake_case custom goals matching PRD funnel subset.

## Shipped custom events (Phase 4.4)

1. `home_entry_point_clicked` — `{ target: newcomer | work | housing }`
2. `onboarding_started` — no props
3. `onboarding_completed` — no props (transition-only, not hydrate)
4. `next_action_clicked` — `{ role, target }` where `target` is `checklist_item_slug`
5. `search_used` — `{ has_results, result_count_bucket }` only
6. `stay_calculator_used` — `{ has_valid_entries }`

**Pageviews:** Plausible script + SPA `pageview` helper on route change.

## Deferred (not v1)

- Full PRD §24 list (signup, housing/casino forms, `content_page_viewed`, `dashboard_viewed`, updates/places/maps/source/checklist/locale events).
- Locale dimension, session replay, warehouse/BI.

Update when `SUCCESS_METRICS.md` is baselined post-launch.
