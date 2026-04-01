---
name: flow-guide-update-protocol
description: Determines which flow-guide documentation must be updated after meaningful project changes. Use after completing tasks, changing product scope, roadmap or phase status, architecture, APIs, UI behavior, locked decisions, or factual content in sensitive domains (residency, payments, transport, banking).
---

# Flow-Guide doc update routing

## First step

Read the canonical source: `docs/00_ai_context/UPDATE_PROTOCOL.md`. Apply **only** the sections that match this change; do not edit unrelated docs.

After substantive edits to any doc, bump its YAML `last_updated` when the file’s **meaning** changes.

## Classify the change → open the matching protocol section

| Situation | Protocol section | Also check |
|-----------|------------------|------------|
| MVP scope, routes, user journeys | Product scope changes | `docs/02_product/PRD_MVP.md`, `docs/02_product/FEATURE_SCOPE_MATRIX.md`, `docs/02_product/USER_FLOWS.md`, roadmap docs, `docs/00_ai_context/PROJECT_STATE.md`, `NEXT_ACTIONS.md`, `HANDOFF_NOTES.md`, `docs/02_product/DECISION_LOG.md` |
| Finished a task / shipped a slice | Task completed | `docs/00_ai_context/NEXT_ACTIONS.md`, sprint packs if used, `HANDOFF_NOTES.md`; UI docs if behavior changed |
| New or reversed product/engineering decision | New decision made | `LOCKED_DECISIONS.md` / `LOCKED_LOGIC.md` if locking, `docs/02_product/DECISION_LOG.md`, `TEMP_ASSUMPTIONS.md`, `PROJECT_STATE.md` |
| Stack, folders, routing, state, deploy shape | Architecture changes | `docs/04_engineering/ENGINEERING_ARCHITECTURE.md`, `FOLDER_STRUCTURE.md`, `ROUTING_PLAN.md`, `STATE_MANAGEMENT_PLAN.md`, `API_CONTRACTS.md`, `CONTENT_SCHEMA.md`, `DEPLOYMENT_READINESS.md`, `HANDOFF_NOTES.md`, `NEXT_ACTIONS.md` |
| Loading/error/empty states or surface behavior | UI states change | `docs/00_ai_context/UI_STATES.md`, `docs/02_product/UI_HANDOFF_SPEC.md`, `docs/03_design/`, `docs/03_design/DESIGN_SYSTEM_NOTES.md` |
| Phase done / in progress / at risk | Roadmap status changes | `docs/01_strategy/ROADMAP_STATUS.md`, `SPRINT_PLAN.md` / `RELEASE_PLAN.md`, `PROJECT_STATE.md`, `NEXT_ACTIONS.md` |
| Residency, money, transport, banking, availability copy | Stale or sensitive content | `docs/00_ai_context/DATA_STALENESS.md` + content source metadata (e.g. frontmatter), not prose only |

Paths without `docs/` above live under `docs/04_engineering/` or `docs/00_ai_context/` as named in `UPDATE_PROTOCOL.md` (e.g. `FOLDER_STRUCTURE.md` → `docs/04_engineering/FOLDER_STRUCTURE.md`).

## Session continuity (typical minimum)

When wrapping up **any** meaningful engineering or product doc work:

- `docs/00_ai_context/HANDOFF_NOTES.md` — what changed, what is next.
- `docs/00_ai_context/NEXT_ACTIONS.md` — check off or add follow-ups.

## Anti-patterns

- Rewriting `ROADMAP_MASTER.md` or PRD for a small implementation-only change unless scope actually moved.
- Editing many context files “just in case” without a protocol trigger.
