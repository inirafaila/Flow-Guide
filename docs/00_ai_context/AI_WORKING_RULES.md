---
owner: product
status: active
last_updated: 2026-04-03
source_of_truth: true
---

# AI working rules

Rules for AI assistants working in this repository. Human maintainers may refine; updates should stay aligned with **`UPDATE_PROTOCOL.md`**.

## Context and changes

1. **Read current context before making changes** — follow **`CURSOR_NEW_CHAT_PROTOCOL.md`** and skim **`PROJECT_STATE.md`**, **`CURRENT_FOCUS.md`**, and **`NEXT_ACTIONS.md`** at minimum. For **planning or prioritization**, follow **`CURSOR_PLANNING_PROTOCOL.md`** (phase boundaries, multi-candidate comparison, smallest reviewable slice).
2. **After meaningful changes**, update the smallest set of docs that keeps reality in sync (see **`UPDATE_PROTOCOL.md`**). Typical: `NEXT_ACTIONS.md`, `HANDOFF_NOTES.md`, and any spec that changed.
3. **Prefer existing architecture and patterns** over improvisation. If the repo is still empty, align new code with **`docs/04_engineering/ENGINEERING_ARCHITECTURE.md`** and **`FOLDER_STRUCTURE.md`** once filled in.

## Locked vs temporary

4. **Never reopen locked decisions** (`LOCKED_DECISIONS.md`, `LOCKED_LOGIC.md`) **without explicit human instruction** and a note in `OPEN_ITEMS.md` or `DECISION_LOG.md` that the item is under review.
5. **Clearly distinguish**:
   - **Locked facts** — treat as constraints.
   - **Temporary assumptions** — only in `TEMP_ASSUMPTIONS.md`; label new assumptions there instead of silently baking them into code or PRD.

## Quality and scope

6. **Scope discipline** — implement what the task and PRD require; do not expand scope or refactor unrelated areas without request.
7. **Naming and slugs** — English-first for slugs and routes unless a locked decision says otherwise.
8. **Source-aware content** — when modeling content, preserve **sources** as first-class; do not flatten legal or financial guidance into unverifiable copy.

## Safety and staleness

9. **High-risk domains** (residency, payments, transport, banking, service availability) — see **`DATA_STALENESS.md`**. Prefer linking to authoritative sources and last-verified metadata over hard-coded legal claims.

## Handoff

10. End substantive sessions with a short update to **`HANDOFF_NOTES.md`**: what changed, what is incomplete, and what the next session should do first.
