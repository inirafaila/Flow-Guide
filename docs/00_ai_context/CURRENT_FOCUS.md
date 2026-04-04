---
owner: product
status: active
last_updated: 2026-04-04
source_of_truth: true
---

# Current focus

**Phase 2** — core product **behavior** and **trust layer** (see [`ROADMAP_MASTER.md`](../01_strategy/ROADMAP_MASTER.md) Phase 2). Phase 1 plumbing is **complete** (2026-04-04); do not re-scope foundation work unless a regression forces a minimal fix.

1. **Onboarding** — guided steps framework + mapping to user state (guest-first; no forced auth at entry).
2. **Guest persistence** — `localStorage` blob + TTL / schema version per [`PHASE_0_DECISION_RECORD.md`](../04_engineering/PHASE_0_DECISION_RECORD.md) and [`ENGINEERING_ARCHITECTURE.md`](../04_engineering/ENGINEERING_ARCHITECTURE.md) (behavior in Phase 2, not stubs only).
3. **Dashboard** — populated from guest state; coherent layout vs placeholders on `/dashboard`.
4. **Next best action v1** — one primary + capped secondary per locked direction.
5. **Checklist v1** — filter/sort using checklist item contracts + user checklist status (rule-based, not ad hoc).
6. **Trust UI** — source / last verified / variance blocks consuming real content-shaped data on guides where spec requires.
7. **Stay calculator** — page behavior per product spec when scheduled in Phase 2 scope.

**Still Phase 1–legal / not product logic:** optional **`?lang=`**, Sentry release/source-map automation, grouped **`/search`** UX, places-lite product surface, housing/casino form submit, full analytics events—see [`CURRENT_PHASE.md`](CURRENT_PHASE.md) and master roadmap Phase 4 where applicable.

**Explicitly defer to later phases:** Phase 3 copy explosion, Phase 4 search/updates/places instrumentation bundle, auth/save-path (until account slice), admin (Phase 8).
