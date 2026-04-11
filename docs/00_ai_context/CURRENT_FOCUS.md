---
owner: product
status: active
last_updated: 2026-04-11
source_of_truth: true
---

# Current focus

**Phase 2** — core product **behavior** and **trust layer** (see [`ROADMAP_MASTER.md`](../01_strategy/ROADMAP_MASTER.md) Phase 2). Phase 1 plumbing is **complete** (2026-04-04); do not re-scope foundation work unless a regression forces a minimal fix.

1. **Onboarding** — ✅ shipped: steps 1–5 + Step 6 Result Summary + guest persistence + emphasis/signals/outcome preview derivation.
2. **Guest persistence** — ✅ shipped: `localStorage` blob + TTL / schema version.
3. **Dashboard** — ✅ partial: NBA v1 consumer + checklist block (category-grouped, filtered by guest state). **Remaining:** full shell (header summary, residency card, alerts, quick actions, updates feed).
4. **Next best action v1** — ✅ shipped: one primary + capped secondary.
5. **Checklist v1** — ✅ shipped: filtering logic + 8 seed items + row component + dashboard block. **Remaining:** UserChecklistStatus wiring (per-user done/in-progress tracking), i18n.
6. **Trust UI** — ❌ not started: source / last verified / variance blocks on guides. **Next focus.**
7. **Stay calculator** — ❌ not started: page behavior per product spec.

**Still Phase 1–legal / not product logic:** optional **`?lang=`**, Sentry release/source-map automation, grouped **`/search`** UX, places-lite product surface, housing/casino form submit, full analytics events—see [`CURRENT_PHASE.md`](CURRENT_PHASE.md) and master roadmap Phase 4 where applicable.

**Explicitly defer to later phases:** Phase 3 copy explosion, Phase 4 search/updates/places instrumentation bundle, auth/save-path (until account slice), admin (Phase 8).
