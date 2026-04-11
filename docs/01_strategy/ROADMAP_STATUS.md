---
owner: product
status: active
last_updated: 2026-04-11
source_of_truth: false
---

# Roadmap status

Live tracking of phases defined in [`ROADMAP_MASTER.md`](ROADMAP_MASTER.md). **Authoritative phase definitions and gates** stay in that file; this table is **status only**.

## Where we are now

- **Phase 0A** and **0B** are **done** (2026-04-01)—see [`PHASE_0_DECISION_RECORD.md`](../04_engineering/PHASE_0_DECISION_RECORD.md) §0.
- **Phase 1 — Engineering and content foundation** is **done** (2026-04-04): criterion audit + regression pass (`npm run lint` / `test` / `build`); context docs synced. Plumbing deliverables per [`CURRENT_PHASE.md`](../00_ai_context/CURRENT_PHASE.md) (historical Phase 1 bullets) and [`ENGINEERING_ARCHITECTURE.md`](../04_engineering/ENGINEERING_ARCHITECTURE.md).
- **Phase 2 — Core product behavior and trust layer** — **exit criteria met** (2026-04-11): onboarding, guest persistence, dashboard NBA + checklist, guide trust blocks, stay calculator page shipped; see Phase status table and [`CURRENT_PHASE.md`](../00_ai_context/CURRENT_PHASE.md) for any follow-up alignment.

## What must happen before Phase 3

Per `ROADMAP_MASTER.md` Phase 2 exit: onboarding, guest state, dashboard, NBA v1, checklist v1, trust UI wired to real behavior—then Phase 3 (must-launch content).

## Phase status

| Phase | Name | Status | Notes |
|-------|------|--------|-------|
| **0A** | Product scope and MVP contract | **Done** | 2026-04-01 — `PHASE_0_DECISION_RECORD` approved |
| **0B** | Technical architecture lock | **Done** | 2026-04-01 — same record + `ENGINEERING_ARCHITECTURE.md` |
| **1** | Engineering and content foundation | **Done** | 2026-04-04 — exit audit passed; IA + templates + Zod contracts + `search-index.json` prebuild + CI + observability stubs |
| **2** | Core product behavior and trust layer | **Done** | Onboarding ✅, guest persistence ✅, NBA v1 ✅, checklist v1 ✅, trust UI ✅, stay calculator (logic + page) ✅ — **Phase 2 exit criteria met** |
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

- **2026-04-11** — Phase 2 exit criteria met: onboarding → dashboard (NBA + checklist) → guide with trust blocks → stay calculator page (`StayCalculatorBlock` on `/documents/stay-calculator`). Remaining enhancements (dashboard shell, i18n, more trust wiring) are incremental, not exit-blocking.
- **2026-04-04** — Phase 1 marked **done** after exit audit + `lint` / `test` / `build`; Phase 2 active track; `CURRENT_PHASE`, `PROJECT_STATE`, `NEXT_ACTIONS`, `HANDOFF_NOTES`, `DEVELOPMENT_BREAKDOWN` updated.
- **2026-04-01** — Phase 0 closed; Phase 1 scaffold started.
- **2026-04-01** — Pre-commit pass: ESLint CLI for `npm run lint`; context/AI index aligned with roadmap + engineering authority docs.
- **2026-04-01** — Content pipeline: shared validation + `search-index.json` from validated records; `ENGINEERING_ARCHITECTURE` / `CONTENT_SCHEMA` / context docs synced.
