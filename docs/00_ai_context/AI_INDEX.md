---
owner: product
status: active
last_updated: 2026-04-03
source_of_truth: true
---

# AI context index

Central map for long-running Cursor collaboration on **flow-guide**. Use this file to decide **what to read** and **in what order**.

## Start here in every new chat

1. Skim this index (30 seconds).
2. Follow **`CURSOR_NEW_CHAT_PROTOCOL.md`** for the exact read order.
3. If the session is **planning / prioritization / next-task selection**, follow **`CURSOR_PLANNING_PROTOCOL.md`** (phase boundaries, candidates, smallest slice).
4. Before editing code or docs, confirm **`LOCKED_DECISIONS.md`** and **`LOCKED_LOGIC.md`** still apply.

## Authority order (highest first)

| Priority | File / area | Use when |
|----------|-------------|----------|
| 1 | `LOCKED_DECISIONS.md` | Product rules that must not drift without explicit reopening |
| 2 | `LOCKED_LOGIC.md` | Behavioral / data rules (filters, guest mode, entities) |
| 3 | `PROJECT_STATE.md` | One-screen snapshot: what we are building, readiness |
| 4 | `docs/02_product/PRD_MVP.md` | MVP scope and requirements (existing PRD) |
| 5 | `docs/01_strategy/ROADMAP_MASTER.md` | Phases, MVP matrix, LAG, execution sequencing |
| 6 | `docs/01_strategy/ROADMAP_STATUS.md` | **Status only** — which phase is active/done (definitions stay in master roadmap) |
| 7 | `docs/04_engineering/PHASE_0_DECISION_RECORD.md` | **Approved** Phase 0A/0B contract (stack, launch bundle, governance cadence) |
| 8 | `docs/04_engineering/ENGINEERING_ARCHITECTURE.md` | **v1 implementation** architecture (Next, content, search, hosting, observability) |
| 9 | `docs/01_strategy/` (other), `docs/02_product/` (other) | Vision, IA, data model, flows |
| 10 | `TEMP_ASSUMPTIONS.md` | May change; verify before treating as fact |
| 11 | `OPEN_ITEMS.md` | **Pre-production / ops gates** (governance names, legal, env projects); Phase 0 tech choices are **not** open here |

If two sources conflict, **locked docs win** unless humans update them via **`UPDATE_PROTOCOL.md`**.

## What each context file is for

| File | Purpose | When AI should read |
|------|---------|---------------------|
| `AI_INDEX.md` | Navigation and authority | Every session start |
| `AI_WORKING_RULES.md` | Operating rules for AI | Before substantive edits |
| `CURSOR_NEW_CHAT_PROTOCOL.md` | Fixed read order for new Composer/sessions | Every new chat |
| `CURSOR_PLANNING_PROTOCOL.md` | Phase-safe planning: candidates, exit-criteria vs nice-to-have, smallest slice | Plan / prioritize / “what next” |
| `UPDATE_PROTOCOL.md` | How to update docs after events | After scope/task/decision/architecture/UI/roadmap changes |
| `PROJECT_STATE.md` | Current snapshot of product + execution | Every new chat; before planning |
| `CURRENT_PHASE.md` | Phase goals, entry/exit criteria | Planning work; reporting progress |
| `CURRENT_FOCUS.md` | Active focus areas (short list) | Task selection |
| `NEXT_ACTIONS.md` | Now / next / later / blockers | Execution queue |
| `OPEN_ITEMS.md` | Unresolved decisions | Before proposing stack, CMS, auth, deploy |
| `LOCKED_DECISIONS.md` | Non-negotiable product decisions | Before any product or UX change |
| `LOCKED_LOGIC.md` | Non-negotiable logic rules | Before algorithms, data model, guest flows |
| `TEMP_ASSUMPTIONS.md` | Explicit assumptions (mutable) | When reasoning about risks or dependencies |
| `DATA_STALENESS.md` | Domains that go stale; re-verify | Content touching law, money, transport, residency |
| `HANDOFF_NOTES.md` | Last-session summary for the next AI | End of session; start of next |
| `UI_STATES.md` | Canonical UI states per surface | Frontend, design-system work |
| `GLOSSARY.md` | Shared vocabulary | Naming, copy, APIs |

## Related canonical docs (outside `00_ai_context/`)

- **Strategy:** `docs/01_strategy/ROADMAP_MASTER.md` (master execution roadmap), `ROADMAP_STATUS.md`, `PROJECT_OVERVIEW.md`, `PRODUCT_VISION.md`, metrics.
- **Product:** `docs/02_product/` (PRD, IA, data model, UI handoff, flows, scope matrix).
- **Design:** `docs/03_design/`.
- **Engineering:** `docs/04_engineering/` — start with **`PHASE_0_DECISION_RECORD.md`** (approved defaults) and **`ENGINEERING_ARCHITECTURE.md`** (build truth), then folders, routing, schema, deploy notes.
- **Execution:** `docs/05_execution/` (breakdown, sprints, release, QA, task packs, post-launch protocol).
- **Research:** `docs/06_research/`.

## When task-specific docs override generic context

Task-specific specs (e.g. a spike in `docs/04_engineering/`, a sprint slice in `docs/05_execution/`) apply **for that task** but must remain **consistent** with locked decisions and PRD. If a task doc conflicts with locked material, **stop** and surface the conflict in `OPEN_ITEMS.md` or `HANDOFF_NOTES.md`.
