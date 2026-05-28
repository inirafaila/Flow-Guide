---
owner: product
status: active
last_updated: 2026-05-28
source_of_truth: false
---

# Roadmap status

Live tracking of phases defined in [`ROADMAP_MASTER.md`](ROADMAP_MASTER.md). **Authoritative phase definitions and gates** stay in that file; this table is **status only**.

## Where we are now

- **Phase 0A** and **0B** are **done** (2026-04-01)—see [`PHASE_0_DECISION_RECORD.md`](../04_engineering/PHASE_0_DECISION_RECORD.md) §0.
- **Phases 1–4** are **done** (Phase 4 closed **2026-05-28** after PRD/MVP reconciliation — [`MVP_LAUNCH_CONTRACT.md`](../02_product/MVP_LAUNCH_CONTRACT.md)).
- **Phase 5 — Verification, QA, and release readiness** is **in progress** (2026-05-28): active track before LAG.
- **LAG**, **Phase 6 deploy**, and post-launch phases remain **later** until Phase 5 exit.

## Phase status

| Phase | Name | Status | Notes |
|-------|------|--------|-------|
| **0A** | Product scope and MVP contract | **Done** | 2026-04-01 — `PHASE_0_DECISION_RECORD` approved |
| **0B** | Technical architecture lock | **Done** | 2026-04-01 — same record + `ENGINEERING_ARCHITECTURE.md` |
| **1** | Engineering and content foundation | **Done** | 2026-04-04 — exit audit passed; IA + templates + Zod contracts + `search-index.json` prebuild + CI + observability stubs |
| **2** | Core product behavior and trust layer | **Done** | Onboarding ✅, guest persistence ✅, NBA v1 ✅, checklist v1 ✅, trust UI ✅, stay calculator (logic + page) ✅ |
| **3** | MVP content and journey implementation | **Done** | 2026-05-27 — Groups A–I + exit verification |
| **4** | MVP utility, instrumentation, launch-scope hardening | **Done** | 2026-05-28 — slices 4.1–4.7 + [`MVP_LAUNCH_CONTRACT.md`](../02_product/MVP_LAUNCH_CONTRACT.md) |
| **5** | Verification, QA, and release readiness | **In progress** | 2026-05-28 — active; see [`EXECUTION_ROADMAP.md`](../05_execution/EXECUTION_ROADMAP.md) §5 |
| **LAG** | Launch Approval Gate | **Later** | After Phase 5; [`OPEN_ITEMS.md`](../00_ai_context/OPEN_ITEMS.md) gates |
| **6** | Production deployment and infrastructure hardening | **Later** | After LAG GO |
| **7** | Post-launch stabilization | **Later** | After first production release |
| **8** | Admin operations and controlled service expansion | **Later** | After Phase 7 stability gate |
| **9** | Platform and ecosystem growth | **Later** | Future expansion |

### Status legend

- **Done** — exit criteria met; recorded with date in handoff or changelog when you maintain one.
- **In progress** — active work underway.
- **Next** — immediate successor after current in-progress phase.
- **Blocked** — cannot proceed until an external dependency or decision clears (use notes column).
- **Later** — not started; sequenced after upstream phases.

## Last review

- **2026-05-28** — **Phase 4 closed; Phase 5 active.** PRD/MVP reconciliation: [`MVP_LAUNCH_CONTRACT.md`](../02_product/MVP_LAUNCH_CONTRACT.md) + waivers W-001–W-011 in [`DECISION_LOG.md`](../02_product/DECISION_LOG.md). Phase 4 Done **≠** production launch. Pre-LAG items unchanged in `OPEN_ITEMS.md`.
- **2026-05-28** — Phase 4.7 performance sanity pass (0 code fixes); [`PERF_SANITY_4_7_REPORT.md`](../05_execution/PERF_SANITY_4_7_REPORT.md).
- **2026-05-27** — Phase 3 exit verification passed; Phase 4 implementation started (slices 4.1+).
