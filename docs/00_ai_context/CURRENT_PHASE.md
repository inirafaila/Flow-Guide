---
owner: product
status: active
last_updated: 2026-05-28
source_of_truth: true
---

# Current phase

## Name

**Phase 5 — Verification, QA, and release readiness**

## Why we are here

**Phase 4 — MVP utility, instrumentation, and launch-scope hardening** exited **2026-05-28** after slices **4.1–4.7** shipped and **PRD/MVP reconciliation** published [`MVP_LAUNCH_CONTRACT.md`](../02_product/MVP_LAUNCH_CONTRACT.md). Evidence: [`ROADMAP_STATUS.md`](../01_strategy/ROADMAP_STATUS.md) Phase 4 = Done; [`HANDOFF_NOTES.md`](HANDOFF_NOTES.md).

Per [`ROADMAP_MASTER.md`](../01_strategy/ROADMAP_MASTER.md) Phase 5: prove quality, safety, and operability **before** Launch Approval Gate (LAG)—not by adding MVP feature scope.

## Entry criteria (met)

- Phase 4 exit criteria met (2026-05-28): search v1, updates, places-lite, analytics subset, SEO, perf sanity, MVP launch contract + waivers documented.

## Exit criteria (Phase 5)

Per master roadmap Phase 5:

- Responsive QA on core flows (see [`EXECUTION_ROADMAP.md`](../05_execution/EXECUTION_ROADMAP.md) §5, [`QA_CHECKLIST.md`](../05_execution/QA_CHECKLIST.md)).
- Checklist / NBA behavior QA across guest states.
- Trust-layer QA on sensitive guides.
- Security / privacy review (guest blob, analytics, env)—align [`OPEN_ITEMS.md`](OPEN_ITEMS.md).
- Analytics smoke tests (Plausible / Sentry in preview).
- Release checklist: known issues, rollback exercise, README/handoff current.
- **No open launch-blocker bugs** unless explicitly waived with owner + mitigation.

**Phase 5 exit does not imply LAG GO or production deploy.**

## What counts as done

- **`ROADMAP_STATUS.md`**: Phase 5 marked **done** with date when exit criteria met; **LAG** is the next gate (not Phase 6 until LAG GO).

## After this phase

**Launch Approval Gate (LAG)** — then **Phase 6** production deployment per roadmap.
