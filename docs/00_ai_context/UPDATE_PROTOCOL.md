---
owner: product
status: active
last_updated: 2026-04-11
source_of_truth: true
---

# Update protocol

Deterministic rules for keeping docs aligned with reality. After updates, bump `last_updated` in touched files when the change is substantive.

## Product scope changes

1. Update `docs/02_product/PRD_MVP.md` (or add a dated addendum section if the PRD is frozen).
2. Sync `FEATURE_SCOPE_MATRIX.md`, `USER_FLOWS.md` if routes or flows shift.
3. Update `ROADMAP_MASTER.md` / `ROADMAP_STATUS.md` if timeline or phases change.
4. Log the decision in `DECISION_LOG.md`; if it reverses prior intent, note in `OPEN_ITEMS.md` or reopen via human instruction in `LOCKED_DECISIONS.md`.
5. Refresh `PROJECT_STATE.md`, `NEXT_ACTIONS.md`, `HANDOFF_NOTES.md`.

## Task completed

1. Check off or archive the item in `NEXT_ACTIONS.md` and any sprint/task pack (`CURSOR_TASK_PACKS.md`, `SPRINT_PLAN.md`).
2. If behavior or UI changed, update `UI_STATES.md` or `docs/02_product/UI_HANDOFF_SPEC.md` as needed.
3. One-line handoff in `HANDOFF_NOTES.md` (what shipped, what remains).
4. **AI context pack:** when phase focus, execution queue, or canonical “start here” behavior changes, bump `last_updated` on touched navigation files (`AI_INDEX.md`, `CURSOR_NEW_CHAT_PROTOCOL.md`, `AI_WORKING_RULES.md` as applicable) and ensure `CURRENT_PHASE.md` / `CURRENT_FOCUS.md` match `ROADMAP_STATUS.md` (if the roadmap phase table moved, also follow **Roadmap status changes** below).

## New decision made

1. If **locking** a rule: append to `LOCKED_DECISIONS.md` or `LOCKED_LOGIC.md` with date and rationale (one short paragraph).
2. Always append a row to `DECISION_LOG.md` (what, why, who/when if known).
3. Remove or adjust any conflicting `TEMP_ASSUMPTIONS.md` entries.
4. Update `PROJECT_STATE.md` if the decision changes MVP shape or readiness.

## Architecture changes

1. Update `docs/04_engineering/ENGINEERING_ARCHITECTURE.md`, `FOLDER_STRUCTURE.md`, `ROUTING_PLAN.md`, and/or `STATE_MANAGEMENT_PLAN.md` — whichever layers changed.
2. If APIs or payloads change, update `API_CONTRACTS.md` and `CONTENT_SCHEMA.md`.
3. Note migration or rollout impact in `DEPLOYMENT_READINESS.md` if relevant.
4. `HANDOFF_NOTES.md` + `NEXT_ACTIONS.md` for follow-up work.

## UI states change

1. Update `UI_STATES.md` (canonical states per surface).
2. Align `docs/03_design/` and `docs/02_product/UI_HANDOFF_SPEC.md` if mocks or copy differ.
3. If new empty/error/loading patterns appear globally, mention in `DESIGN_SYSTEM_NOTES.md`.

## Roadmap status changes

1. Update `ROADMAP_STATUS.md` (what is done / in progress / at risk).
2. Adjust `SPRINT_PLAN.md` or `RELEASE_PLAN.md` if dates or scope shift.
3. `PROJECT_STATE.md` summary and `NEXT_ACTIONS.md` queue.

## Stale or sensitive content

1. If touching residency, payments, transport, banking, or service availability, see `DATA_STALENESS.md` — update last-verified metadata in content source records where applicable, not only prose.

## AI / planning guidance changes

1. Update the guidance file(s) that changed; bump `last_updated` in YAML frontmatter when **meaning** changes.
2. Add a short line to `HANDOFF_NOTES.md` so the next session knows new planning rules exist.
3. Do **not** use this path to change product scope, phase definitions, or locked decisions—those follow **Product scope changes** / **New decision made** above.
