---
owner: product
status: active
last_updated: 2026-04-11
source_of_truth: true
---

# AI working rules

Rules for AI assistants working in this repository. Human maintainers may refine; updates should stay aligned with **`UPDATE_PROTOCOL.md`**.

## Context and changes

1. **Read current context before making changes** — follow **`CURSOR_NEW_CHAT_PROTOCOL.md`** and skim **`PROJECT_STATE.md`**, **`CURRENT_FOCUS.md`**, and **`NEXT_ACTIONS.md`** at minimum. For **planning or prioritization**, follow **`CURSOR_PLANNING_PROTOCOL.md`** (phase boundaries, multi-candidate comparison, smallest reviewable slice). For **writing or refining prompts**, also follow **`PROMPT_AUTHORING_PROTOCOL.md`**.
2. **After meaningful changes**, update the smallest set of docs that keeps reality in sync (see **`UPDATE_PROTOCOL.md`**). Typical: `NEXT_ACTIONS.md`, `HANDOFF_NOTES.md`, and any spec that changed.
3. **Prefer existing architecture and patterns** over improvisation. If the repo is still empty, align new code with **`docs/04_engineering/ENGINEERING_ARCHITECTURE.md`** and **`FOLDER_STRUCTURE.md`** once filled in.
4. **Do not pre-lock tasks in prompts** — unless the human explicitly says implementation of that exact slice is approved, planning prompts must stay discovery-first and allow candidate rejection or replacement.
5. **Use canonical repo naming** — if a user phrase does not match docs, validate and rename it instead of building prompts around an unverified abstraction.

## Locked vs temporary

6. **Never reopen locked decisions** (`LOCKED_DECISIONS.md`, `LOCKED_LOGIC.md`) **without explicit human instruction** and a note in `OPEN_ITEMS.md` or `DECISION_LOG.md` that the item is under review.
7. **Clearly distinguish**:
   - **Locked facts** — treat as constraints.
   - **Temporary assumptions** — only in `TEMP_ASSUMPTIONS.md`; label new assumptions there instead of silently baking them into code or PRD.

## Quality and scope

8. **Scope discipline** — implement what the task and PRD require; do not expand scope or refactor unrelated areas without request.
9. **Naming and slugs** — English-first for slugs and routes unless a locked decision says otherwise.
10. **Source-aware content** — when modeling content, preserve **sources** as first-class; do not flatten legal or financial guidance into unverifiable copy.
11. **Separate now vs later** — in planning and prompt-writing, explicitly distinguish exit-criteria gaps, optional cleanup, and deferred/post-exit work.

## Safety and staleness

12. **High-risk domains** (residency, payments, transport, banking, service availability) — see **`DATA_STALENESS.md`**. Prefer linking to authoritative sources and last-verified metadata over hard-coded legal claims.

## Handoff

13. End substantive sessions with a short update to **`HANDOFF_NOTES.md`**: what changed, what is incomplete, and what the next session should do first.
