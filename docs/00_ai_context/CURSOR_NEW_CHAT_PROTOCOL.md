---
owner: product
status: active
last_updated: 2026-04-11
source_of_truth: true
---

# Cursor new chat protocol

**Use this file** at the start of every new Composer session or chat that may change code, docs, product behavior, or **execution priorities**.

## Execution workflow (how we build)

This project uses a **two-agent workflow**:

1. **Planning agent** (dedicated chat) — reads context, identifies next slice from the execution plan, writes implementation prompts, verifies Composer reports, triggers doc sync.
2. **Composer agent** (separate chat) — receives implementation prompts and executes them. Does NOT plan or choose tasks.

### Execution plan

A full execution roadmap covering Phases 3–7 + LAG was generated and lives alongside the repo context. The planning agent uses it to determine the next slice. Key reference: content slices are grouped into **Groups A–I** for Phase 3, then **Slices 4.1–4.7** for Phase 4. See `CURRENT_FOCUS.md` for the remaining work list.

### Workflow per slice

1. Planning agent reads core state files (§Read order below)
2. Planning agent cross-references `CURRENT_FOCUS.md` with execution plan to find next slice
3. Planning agent writes implementation prompt (see `PROMPT_AUTHORING_PROTOCOL.md` Templates)
4. User gives prompt to Composer in separate chat
5. Composer executes and reports back
6. Planning agent verifies report against prompt's verification checklist
7. User commits and pushes
8. If checkpoint reached → planning agent writes doc sync prompt
9. Repeat for next slice

### Checkpoint rules

| Checkpoint type | When | Docs to update |
|-----------------|------|----------------|
| **Per-slice** | Every batch | `NEXT_ACTIONS.md` (shipped line), `HANDOFF_NOTES.md` (bullet) |
| **Per-checkpoint** | After every ~5 batches | Above + `PROJECT_STATE.md`, `CURRENT_FOCUS.md`, `ROADMAP_STATUS.md`, `FOLDER_STRUCTURE.md`, `UI_STATES.md` |
| **Phase transition** | Phase N done → Phase N+1 | Above + `CURRENT_PHASE.md` (full rewrite), `DEVELOPMENT_BREAKDOWN.md` (gate status) |

### Composer prompt structure

Every implementation prompt written for Composer MUST include:

1. **Mode** — "Composer — Agent mode, full codebase access"
2. **Slice identity** — name + one paragraph description
3. **Read order** — numbered list of files to read before coding
4. **Scope** — exact files to create/modify with content guidelines
5. **Out of scope** — explicit list of what NOT to do
6. **Execution steps** — ordered list
7. **Verification checklist** — checkboxes for every deliverable
8. **Doc sync** — which docs to update (per-slice level minimum)
9. **Report format** — template for Composer's output
10. **Hard stops** — conditions where Composer must stop and report

## Planning, prioritization, or "what next"

If the user asks for a **plan**, **roadmap-aligned next steps**, or **task choice** (including plan-only chats), read **`CURSOR_PLANNING_PROTOCOL.md`** and follow its **source stack + workflow** **before** recommending work. For **plan then implement** in one session, run that protocol **first**, then use the read order below for the chosen slice.

## Prompt writing or prompt refinement

If the user asks you to **write**, **improve**, or **refine** a prompt for planning, next-task choice, candidate validation, plan refinement, or implementation, read **`PROMPT_AUTHORING_PROTOCOL.md`** after the relevant planning/session protocol.

Rules:

- Do **not** lock a task in the prompt unless the human explicitly says that exact task is already approved.
- If the human proposes a task, treat it as a **candidate to evaluate**, not a decision to defend.
- Use **deterministic read order** wording: say **"Read these files in order"**, not **"at least read these files"**.
- Keep planning prompts **discovery-first** and implementation prompts **approval-first**.

## Read order (implementation and general sessions)

1. `docs/00_ai_context/AI_INDEX.md` — authority map and "start here."
2. `docs/00_ai_context/PROJECT_STATE.md` — current snapshot.
3. `docs/00_ai_context/CURRENT_PHASE.md` — phase and criteria.
4. `docs/00_ai_context/CURRENT_FOCUS.md` — what we are optimizing for right now.
5. `docs/00_ai_context/NEXT_ACTIONS.md` — execution queue (read shipped lines for continuity).
6. `docs/00_ai_context/LOCKED_DECISIONS.md` — non-negotiables.
7. `docs/00_ai_context/OPEN_ITEMS.md` — unresolved decisions (do not invent answers).
8. `docs/00_ai_context/HANDOFF_NOTES.md` — last session continuity.
9. `docs/01_strategy/ROADMAP_STATUS.md` — phase completion tracking.
10. **Task-specific docs** — e.g. `docs/02_product/PRD_MVP.md`, relevant `docs/04_engineering/*`, `docs/05_execution/DEVELOPMENT_BREAKDOWN.md`, or files named in the user message.

### Technical reference (read when writing implementation prompts)

- `src/lib/routes.ts` — all route slug arrays
- `src/lib/schemas/content-page.ts` — page frontmatter schema
- `src/lib/schemas/source-record.ts` — source record schema
- `docs/04_engineering/FOLDER_STRUCTURE.md` — current file structure
- `src/content/pages/address-registration.md` — reference guide content pattern
- `src/content/sources/address-reg-gov.md` — reference source record pattern
- `src/content/pages/newcomer.md` — reference hub content pattern

## Optional quick pass (if touching content or compliance)

- `docs/00_ai_context/DATA_STALENESS.md`
- `docs/00_ai_context/LOCKED_LOGIC.md`
- `docs/00_ai_context/UI_STATES.md` (if UI work)

## After reading

- State the **current phase**, **last completed slice**, and **next slice** from execution plan.
- State assumptions explicitly if `OPEN_ITEMS.md` blocks a technical choice.
- If the user's request conflicts with locked docs, **flag the conflict** before implementing.
