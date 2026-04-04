---
owner: product
status: active
last_updated: 2026-04-03
source_of_truth: true
---

# Cursor new chat protocol

**Use this file** at the start of every new Composer session or chat that may change code, docs, product behavior, or **execution priorities**.

## Planning, prioritization, or “what next”

If the user asks for a **plan**, **roadmap-aligned next steps**, or **task choice** (including plan-only chats), read **`CURSOR_PLANNING_PROTOCOL.md`** and follow its **source stack + workflow** **before** recommending work. For **plan then implement** in one session, run that protocol **first**, then use the read order below for the chosen slice.

## Prompt writing or prompt refinement

If the user asks you to **write**, **improve**, or **refine** a prompt for planning, next-task choice, candidate validation, plan refinement, or implementation, read **`PROMPT_AUTHORING_PROTOCOL.md`** after the relevant planning/session protocol.

Rules:

- Do **not** lock a task in the prompt unless the human explicitly says that exact task is already approved.
- If the human proposes a task, treat it as a **candidate to evaluate**, not a decision to defend.
- Use **deterministic read order** wording: say **"Read these files in order"**, not **"at least read these files"**.
- Keep planning prompts **discovery-first** and implementation prompts **approval-first**.

## Read order (implementation and general sessions)

1. `docs/00_ai_context/AI_INDEX.md` — authority map and “start here.”
2. `docs/00_ai_context/PROJECT_STATE.md` — current snapshot.
3. `docs/00_ai_context/CURRENT_PHASE.md` — phase and criteria.
4. `docs/00_ai_context/CURRENT_FOCUS.md` — what we are optimizing for right now.
5. `docs/00_ai_context/NEXT_ACTIONS.md` — execution queue.
6. `docs/00_ai_context/LOCKED_DECISIONS.md` — non-negotiables.
7. `docs/00_ai_context/OPEN_ITEMS.md` — unresolved decisions (do not invent answers).
8. `docs/00_ai_context/HANDOFF_NOTES.md` — last session continuity.
9. **Task-specific docs** — e.g. `docs/02_product/PRD_MVP.md`, relevant `docs/04_engineering/*`, `docs/05_execution/CURSOR_TASK_PACKS.md`, or files named in the user message.

## Optional quick pass (if touching content or compliance)

- `docs/00_ai_context/DATA_STALENESS.md`
- `docs/00_ai_context/LOCKED_LOGIC.md`
- `docs/00_ai_context/UI_STATES.md` (if UI work)

## After reading

- State assumptions explicitly if `OPEN_ITEMS.md` blocks a technical choice.
- If the user’s request conflicts with locked docs, **flag the conflict** before implementing.
