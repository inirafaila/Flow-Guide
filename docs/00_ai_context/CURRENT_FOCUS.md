---
owner: product
status: active
last_updated: 2026-05-29
source_of_truth: true
---

# Current focus

**Phase 4** — MVP **utility**, **instrumentation**, and **launch-scope hardening** (see [`ROADMAP_MASTER.md`](../01_strategy/ROADMAP_MASTER.md) Phase 4). Phase 3 content/journey work is **complete** (2026-05-27).

## Phase 4 priorities (from execution plan)

1. ~~**Search v1 (Slice 4.1)**~~ — **shipped 2026-05-28** (enriched index + grouped client UI on `/search`).
2. ~~**Updates surface (4.2)**~~ — **shipped 2026-05-27** (`loadUpdateItems`, `/updates` list, 3 seeds).
3. ~~**Places-lite (4.3)**~~ — **shipped 2026-05-28** (`loadPlaceItems`, `PlaceCard`, `RelatedPlacesBlock`, search index places).
4. ~~**Analytics (4.4)**~~ — **shipped 2026-05-29** (six Plausible funnel events + SPA pageviews).
5. **SEO (4.5)** — **next up:** metadata, sitemap.xml, robots.txt.
6. **Dashboard enhancement (4.6)** — alerts, quick actions, updates-for-you (scoped).
7. **Perf sanity (4.7)** — mobile performance check.

**Do not start** until a slice is chosen via planning; default next candidate per [`EXECUTION_ROADMAP.md`](../05_execution/EXECUTION_ROADMAP.md) is **4.5 SEO**.

## Phase 3 shipped (reference)

- **Infrastructure:** Markdown pipeline, universal hub/guide loading, trust wiring, search-index prebuild.
- **Content:** 7 hubs, all must-launch guides, Home, FAQ (6 entries), Dashboard/Start copy (en/fa/ru).
- **Group I (2026-05-27):** RoutePageBanner product summaries; internal-link test; fixture cleanup; stay-calculator related links; `/city` nav deferred.

## Explicitly deferred (not Phase 4 unless escalated)

- Full dashboard shell, UserChecklistStatus, guide body i18n, admin, auth, `/city` tourism content, housing/request operational forms — see master roadmap and [`OPEN_ITEMS.md`](OPEN_ITEMS.md).
