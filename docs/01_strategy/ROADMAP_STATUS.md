---
owner: product
status: active
last_updated: 2026-04-01
source_of_truth: false
---

# Roadmap status

Live tracking of phases defined in [`ROADMAP_MASTER.md`](ROADMAP_MASTER.md). **Authoritative phase definitions and gates** stay in that file; this table is **status only**.

## Where we are now

- **Phase 0A** and **0B** are **done** (2026-04-01)—see [`PHASE_0_DECISION_RECORD.md`](../04_engineering/PHASE_0_DECISION_RECORD.md) §0.
- **Phase 1 — Engineering and content foundation** is **in progress**: Next.js scaffold, route skeleton, content/search stubs, observability placeholders per [`ENGINEERING_ARCHITECTURE.md`](../04_engineering/ENGINEERING_ARCHITECTURE.md).

## What must happen before Phase 2

Per `ROADMAP_MASTER.md` Phase 1 exit: route/schema alignment, CI green, **no** product logic beyond stubs—then Phase 2 (onboarding, guest state, NBA, checklist, trust UI).

## Phase status

| Phase | Name | Status | Notes |
|-------|------|--------|-------|
| **0A** | Product scope and MVP contract | **Done** | 2026-04-01 — `PHASE_0_DECISION_RECORD` approved |
| **0B** | Technical architecture lock | **Done** | 2026-04-01 — same record + `ENGINEERING_ARCHITECTURE.md` |
| **1** | Engineering and content foundation | **In progress** | App scaffold, IA routes, content + search-index pipeline stubs |
| **2** | Core product behavior and trust layer | **Later** | After Phase 1 exit |
| **3** | MVP content and journey implementation | **Later** | Depends on Phase 2 |
| **4** | MVP utility, instrumentation, launch-scope hardening | **Later** | Required before launch |
| **5** | Verification, QA, release readiness | **Later** | Before LAG |
| **LAG** | Launch Approval Gate | **Later** | After Phase 5 |
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

- **2026-04-01** — Phase 0 closed; Phase 1 scaffold started.
- **2026-04-01** — Pre-commit pass: ESLint CLI for `npm run lint`; context/AI index aligned with roadmap + engineering authority docs.
