---
owner: product
status: active
last_updated: 2026-04-03
source_of_truth: true
---

# Prompt authoring protocol

**Use this file when writing or refining prompts** for:

- next-task planning
- candidate-task evaluation
- plan refinement
- implementation after plan approval

This protocol governs **how prompts should frame the work**. It does **not** change product scope, roadmap substance, or locked decisions.

## 1. Core rule: discovery before lock

1. **Do not lock the task in advance** unless the human explicitly says the exact task is already approved for implementation.
2. If the human suggests a task ("I think X should be next"), treat it as a **candidate hypothesis**, not a confirmed answer.
3. Prompt wording must let the model decide that:
   - the candidate is correct,
   - the candidate is valid but not best next,
   - the candidate uses non-canonical naming and needs renaming,
   - or a different slice is safer.
4. Prompts for next-task choice must be **discovery-first**, not **defense-first**.

## 2. Canonical prompt-authoring rules

Every planning or prioritization prompt must require the model to:

1. identify the **current roadmap phase**
2. extract the **remaining gaps for the active phase**
3. separate:
   - **exit-criteria gaps**
   - **optional cleanup / nice-to-have**
   - **deferred / post-exit / Phase 2+ work**
4. generate **2-4 candidate tasks** when multiple legitimate options exist
5. compare candidates by:
   - **phase safety**
   - **dependency order**
   - **smallest safe slice**
   - **exit impact**
   - **implementation risk**
6. choose **one** best next task
7. keep implementation scope to **one primary slice**

## 3. Naming and abstraction discipline

Prompt authors must explicitly require the model to:

- verify that task names and abstractions are **canonical in repo docs**
- rename proposed work if the user uses a non-canonical label
- avoid inventing new epics, systems, layers, or abstractions without doc support
- cite the repo concept that the task maps to when naming matters

If a task name cannot be verified in repo docs, the prompt should ask for:

1. the closest canonical repo term
2. whether the user term is just shorthand
3. whether the task should be re-sliced before approval

## 4. Deterministic read order

When a prompt depends on repo context, use a **deterministic read order**.

Do:

- say **"Read these files in order"**
- list the exact files in sequence
- explain why a later file is added if the prompt is task-specific

Do not:

- say **"at least read these files"**
- leave read order ambiguous
- mix required and optional files without labeling them

## 5. Prompt type rules

### A. Next-task planning prompts

These prompts must:

- keep the choice **open** unless the human already approved the exact task
- allow the model to reject the user's candidate
- require candidate comparison when more than one plausible slice exists
- force explicit labeling of deferred or post-exit work

**Required output shape**

1. current phase
2. remaining active-phase gaps
3. candidate tasks considered
4. comparison
5. best next task
6. smallest safe slice
7. deferred items with labels

### B. Candidate-task evaluation prompts

If the user says **"I think task X should be next"**, the prompt must ask:

1. Is this candidate valid for the current phase?
2. Is the naming canonical in repo docs?
3. Is this the best next slice?
4. If not, what is a better next task and why?
5. What part of the user's idea is:
   - current-phase exit work
   - optional cleanup
   - post-exit or later-phase work

### C. Plan refinement prompts

Use these after a candidate is chosen but **before** implementation is approved.

They should:

- refine the chosen slice into the **smallest reviewable plan**
- preserve the phase label
- split bundled work into **now** vs **deferred**
- keep anti-scope explicit
- avoid silently expanding into adjacent slices

### D. Implementation prompts after approval

Only lock the task once the plan is reviewed and explicitly approved.

Implementation prompts must include:

1. the **approved task name**
2. exact **context files to read in order**
3. explicit **in-scope** outcome
4. explicit **non-scope / anti-scope**
5. required **verification**
6. required **update-protocol sync before finishing**

## 6. Required anti-patterns to avoid

Do **not** write prompts that:

- force the model to defend a preselected task
- assume the user's candidate is correct without evaluation
- invent new repo abstractions without checking docs
- combine multiple meaningful slices into one implementation task
- skip candidate comparison when tradeoffs exist
- skip phase labeling
- skip deferred-item labeling
- use ambiguous read instructions like **"at least read these files"**

## 7. Reusable templates

### Template 1: next-task selection prompt

```md
Read these files in order:
1. `docs/00_ai_context/CURSOR_PLANNING_PROTOCOL.md`
2. `docs/00_ai_context/PROMPT_AUTHORING_PROTOCOL.md`
3. `docs/01_strategy/ROADMAP_MASTER.md`
4. `docs/01_strategy/ROADMAP_STATUS.md`
5. `docs/00_ai_context/PROJECT_STATE.md`
6. `docs/00_ai_context/CURRENT_PHASE.md`
7. `docs/00_ai_context/CURRENT_FOCUS.md`
8. `docs/00_ai_context/NEXT_ACTIONS.md`
9. `docs/00_ai_context/HANDOFF_NOTES.md`
10. `docs/00_ai_context/LOCKED_DECISIONS.md`
11. `docs/00_ai_context/LOCKED_LOGIC.md`
12. `docs/05_execution/DEVELOPMENT_BREAKDOWN.md`

Then determine the best next task for the active phase.

Rules:
- Do not assume any candidate is already approved.
- If I mention a possible next task, treat it as a candidate to evaluate, not the answer.
- Stay inside the active roadmap phase.
- Separate exit-criteria gaps, optional cleanup, and deferred/post-exit work.
- When more than one plausible task exists, produce 2-4 candidates and compare them by phase safety, dependency order, smallest safe slice, exit impact, and implementation risk.
- Choose one best next task and define the smallest safe slice.
- Label anything not chosen as deferred with phase-appropriate reasoning.
```

### Template 2: candidate-task evaluation prompt

```md
Read these files in order:
1. `docs/00_ai_context/CURSOR_PLANNING_PROTOCOL.md`
2. `docs/00_ai_context/PROMPT_AUTHORING_PROTOCOL.md`
3. `docs/01_strategy/ROADMAP_STATUS.md`
4. `docs/00_ai_context/CURRENT_PHASE.md`
5. `docs/00_ai_context/CURRENT_FOCUS.md`
6. `docs/00_ai_context/NEXT_ACTIONS.md`
7. `docs/00_ai_context/LOCKED_DECISIONS.md`
8. `docs/00_ai_context/LOCKED_LOGIC.md`
9. `docs/05_execution/DEVELOPMENT_BREAKDOWN.md`

I think this task should be next: `<candidate task>`.

Evaluate it without assuming it is correct.

Answer:
1. Is this candidate valid for the active phase?
2. Is the naming canonical in repo docs?
3. Is this the best next slice?
4. If not, what is a better next task and why?
5. Which parts are exit-criteria work, optional cleanup, or deferred/post-exit work?
6. What is the smallest safe slice if we proceed?
```

### Template 3: plan refinement prompt

```md
Read these files in order:
1. `docs/00_ai_context/CURSOR_PLANNING_PROTOCOL.md`
2. `docs/00_ai_context/PROMPT_AUTHORING_PROTOCOL.md`
3. `docs/00_ai_context/CURRENT_PHASE.md`
4. `docs/00_ai_context/CURRENT_FOCUS.md`
5. `docs/00_ai_context/LOCKED_DECISIONS.md`
6. `docs/00_ai_context/LOCKED_LOGIC.md`
7. `docs/05_execution/DEVELOPMENT_BREAKDOWN.md`
8. `<task-specific docs>`

Refine this approved planning direction into one implementation-ready plan:
`<chosen task>`

Rules:
- Keep the task inside the active phase.
- Keep only one primary slice in scope.
- Split adjacent work into deferred follow-ups.
- Use canonical repo naming.
- Make anti-scope explicit.
- Define concrete verification.
```

### Template 4: implementation prompt after approval

```md
The following task is approved. Do not re-open task selection.

Approved task:
`<exact approved task>`

Read these files in order:
1. `docs/00_ai_context/CURSOR_NEW_CHAT_PROTOCOL.md`
2. `docs/00_ai_context/PROMPT_AUTHORING_PROTOCOL.md`
3. `docs/00_ai_context/PROJECT_STATE.md`
4. `docs/00_ai_context/CURRENT_PHASE.md`
5. `docs/00_ai_context/CURRENT_FOCUS.md`
6. `docs/00_ai_context/NEXT_ACTIONS.md`
7. `docs/00_ai_context/LOCKED_DECISIONS.md`
8. `docs/00_ai_context/LOCKED_LOGIC.md`
9. `docs/00_ai_context/HANDOFF_NOTES.md`
10. `<task-specific docs>`
11. `docs/00_ai_context/UPDATE_PROTOCOL.md`

Implement only the approved slice.

Non-scope / anti-scope:
- Do not expand into adjacent tasks.
- Do not change roadmap substance.
- Do not reopen locked decisions.
- Do not invent new abstractions unless the docs require them.

Before finishing:
- run the required verification for the touched area
- update docs only as required by `UPDATE_PROTOCOL.md`
- sync `HANDOFF_NOTES.md` if the change is meaningful
```

## 8. Relationship to other AI docs

- `CURSOR_NEW_CHAT_PROTOCOL.md` tells the model **what to read at session start**.
- `CURSOR_PLANNING_PROTOCOL.md` governs **phase-safe planning decisions**.
- This file governs **how prompts should be written** so those protocols are applied consistently.
