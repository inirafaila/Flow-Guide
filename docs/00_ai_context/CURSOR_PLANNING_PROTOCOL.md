---
owner: product
status: active
last_updated: 2026-04-11
source_of_truth: true
---

# Cursor planning protocol

**When to use this file:** the user asks for a **plan**, **priorities**, **roadmap-aligned next steps**, **sprint slice**, **what to do next**, or a **candidate-task evaluation**—including “plan only” sessions with **no** code changes.

**What this file is not:** permission to change product scope, edit `ROADMAP_MASTER.md` substance, or reopen `LOCKED_DECISIONS.md` / `LOCKED_LOGIC.md`. Planning **consumes** those sources; it does not override them.

---

## 1) Hard constraints (non-negotiable)

1. **Phase boundaries are strict.** Work you schedule for “now” must match the **active phase** in `ROADMAP_STATUS.md` and the exit criteria in `CURRENT_PHASE.md`. If a user asks for Phase 2+ behavior while Phase 1 is active, **say so explicitly** and either (a) frame it as **post–Phase 1 exit** backlog, or (b) scope a **Phase 1–legal** slice (e.g. types/stubs only) without smuggling product logic.
2. **Authoritative sequencing** lives in `ROADMAP_MASTER.md`; **status only** in `ROADMAP_STATUS.md`. Do not “reinterpret” phases using epic labels from `DEVELOPMENT_BREAKDOWN.md` without cross-checking the **Canonical roadmap phases** table there.
3. **Locked docs win.** If a plan conflicts with `LOCKED_DECISIONS.md`, `LOCKED_LOGIC.md`, or approved `PHASE_0_DECISION_RECORD.md`, **stop** and surface the conflict; do not plan around it silently.
4. **Open items are not defaults.** `OPEN_ITEMS.md` lists unresolved **human/ops** gates. Plans may note dependencies (“blocked until legal sign-off”) but must **not** invent resolutions.
5. **User-proposed tasks are hypotheses, not answers.** If the user says “I think X should be next,” evaluate whether **X** is valid, canonically named, and actually the best next slice. Do **not** force the analysis to defend it.
6. **Planning stays unlocked until approval.** Do not write planning output or planning prompts as if implementation of a candidate is already approved unless the human explicitly says so.

---

## 2) Read this source stack **before** choosing next work

Read **top to bottom** once per planning session (skip files only if the session is a pure repeat in the same hour and nothing changed).

| Order | File | Why |
|------:|------|-----|
| 1 | `AI_INDEX.md` | Authority map |
| 2 | `CURSOR_NEW_CHAT_PROTOCOL.md` | Default session read order |
| 3 | `PROMPT_AUTHORING_PROTOCOL.md` | Discovery-first prompt rules for planning/candidate evaluation |
| 4 | `docs/01_strategy/ROADMAP_MASTER.md` | Phase definitions, MVP matrix, dependencies |
| 5 | `docs/01_strategy/ROADMAP_STATUS.md` | Which phase is active/done |
| 6 | `PROJECT_STATE.md` | One-screen reality |
| 7 | `CURRENT_PHASE.md` | Exit criteria for the active phase |
| 8 | `CURRENT_FOCUS.md` | Narrow in-phase priorities |
| 9 | `NEXT_ACTIONS.md` | Declared queue / shipped lines |
| 10 | `OPEN_ITEMS.md` | Gates and blockers |
| 11 | `HANDOFF_NOTES.md` | Last-session continuity |
| 12 | `LOCKED_DECISIONS.md` | Product non-negotiables |
| 13 | `LOCKED_LOGIC.md` | Behavioral/data non-negotiables |
| 14 | `UPDATE_PROTOCOL.md` | How doc edits must be recorded after execution |
| 15 | `docs/04_engineering/PHASE_0_DECISION_RECORD.md` | Approved 0A/0B contract |
| 16 | `docs/04_engineering/ENGINEERING_ARCHITECTURE.md` | Build truth, search/observability split |
| 17 | `docs/05_execution/DEVELOPMENT_BREAKDOWN.md` | Tickets/epics **tagged** to master phases |

If the plan touches UI or content categories, add task-specific docs named in `CURSOR_NEW_CHAT_PROTOCOL.md` (e.g. `IA_SPEC.md`, `DATA_STALENESS.md`).

---

## 3) Deterministic planning workflow (follow in order)

Execute these steps **in chat** (brief prose or bullets—no need for a long essay).

1. **Restate** the **active phase** (name + one line from `CURRENT_PHASE.md` / `ROADMAP_STATUS.md`) and **active constraints** (locked decisions, open gates, explicit “not in focus” lines from `CURRENT_FOCUS.md`).
2. **List remaining gaps** for **this phase only**, grounded in **`CURRENT_PHASE.md` exit criteria**, `NEXT_ACTIONS.md`, and **`DEVELOPMENT_BREAKDOWN.md`** “Remaining before Phase N exit” (if present). Mark each gap with a **classification** (next section).
3. If the user suggested a task, **validate the candidate first**: is it phase-valid, canonically named, and better than nearby alternatives?
4. **Propose 2–4 candidate next tasks** when more than one gap exists or tradeoffs matter. If there is exactly **one** critical gap, still name it as **Candidate A** and optionally **Candidate B** = “verify no regression / doc sync only” so the choice is explicit.
5. **Separate** current-phase **EXIT-CRITERIA GAP** work from **NICE-TO-HAVE** cleanup and **DEFER-POST-EXIT** work before choosing.
6. **Compare** candidates using the **scoring dimensions** below (at minimum: phase safety, dependencies, slice size, exit-criteria impact, risk).
7. **Choose one** best next task. State **why** the others are second/third in one line each.
8. **Slice** the chosen task to the **smallest reviewable increment** that stays safe (one PR-sized outcome, one logical doc family, or one vertical stub—not “and also …” unless dependency-forced).
9. **De-bundle:** if the user request bundles multiple slices, **split** into ordered tasks; implement or plan **one** primary slice now and **label** the rest as **Deferred (Task 2, Task 3, …)** with phase labels.
10. **Label deferrals:** every deferred item gets `Deferred — Phase N:` and one-line rationale (dependency, out of scope for current phase, or nice-to-have).
11. **Deliver** an **execution-ready plan** for the **single** chosen slice (see §6)—not open-ended brainstorming.

---

## 4) Classify every gap and candidate (required labels)

Use **exactly one** primary label per item:

| Label | Meaning |
|--------|--------|
| **EXIT-CRITERIA GAP** | Missing for **current phase exit** per `CURRENT_PHASE.md` / `ROADMAP_MASTER.md` for that phase. |
| **DEPENDENCY UNBLOCKER** | Unblocks a later **EXIT-CRITERIA GAP** or removes a documented **blocker** (`OPEN_ITEMS.md`, `NEXT_ACTIONS.md`). |
| **NICE-TO-HAVE** | Hygiene, polish, optional tooling, or premature optimization **not** tied to current exit criteria. |
| **DEFER-POST-EXIT** | Legitimate work that belongs to **Phase N+1** or later per master roadmap—explicitly not “now.” |

**Rule:** **NICE-TO-HAVE** must **not** be scheduled ahead of **EXIT-CRITERIA GAP** unless the user explicitly overrides and accepts delay—and you **record** that override in the plan.

---

## 5) Comparison dimensions (use for every multi-candidate decision)

For each candidate, answer briefly:

| Dimension | Question |
|-----------|----------|
| **Phase safety** | Does it stay inside the active phase’s “in scope / out of scope” lines? |
| **Dependency order** | Does anything else **have** to land first per `DEVELOPMENT_BREAKDOWN.md` or architecture? |
| **Smallest safe slice** | What is the minimal shippable unit; what can wait? |
| **Exit-criteria impact** | Which **exit criterion** does it advance (cite section or bullet)? |
| **Implementation risk** | Reversibility, middleware/i18n/search coupling, content/legal sensitivity? |

---

## 6) Execution-ready plan output shape

When the user asked for a plan, end with this structure (concise, copy-paste friendly):

- **Phase / constraints:** one short paragraph.
- **Gaps (this phase):** bullet list with **EXIT-CRITERIA GAP** / other labels.
- **Candidates considered:** 2–4 bullets (or 1 + explicit “no alternates”).
- **Chosen next task:** name + **smallest slice** definition + **definition of done**.
- **Deferred:** bullets with `Deferred — Phase …` and label **NICE-TO-HAVE** or **DEFER-POST-EXIT** as appropriate.
- **Docs to touch after execution (if any):** only per `UPDATE_PROTOCOL.md`.

---

## 7) Anti-patterns (do not do these)

- **Phase drift:** e.g. planning NBA/checklist/guest **behavior** as “Phase 1” work (that is **Phase 2** per `ROADMAP_MASTER.md`).
- **Defense-first prompts:** writing the task as “justify why X should be next” instead of evaluating whether **X** is actually best.
- **Pre-locked candidate naming:** accepting a user phrase as canonical without checking docs or phase mapping.
- **Mega-tasks:** one “task” that is really three PRs (search UI + places + analytics) without splitting.
- **Roadmap editing disguised as planning:** changing phase definitions or MVP matrix in chat or docs without a formal product change.
- **Silent reopen of locks:** “we could drop guest-first for speed”—forbidden without human decision log.
- **Vague prioritization:** “be careful” / “align with roadmap” without **cited** criteria and **labeled** gaps.
- **Ambiguous context reads:** prompts that say “at least read these files” when a deterministic read order is needed.

---

## 8) Execution plan integration

A full execution roadmap (Phases 3–7 + LAG) exists and should be consulted during planning. The plan groups Phase 3 work into **Groups A–I** (content slices) and Phase 4 into **Slices 4.1–4.7** (utility/hardening).

When determining the next slice:

1. Read `CURRENT_FOCUS.md` to see what is shipped vs remaining.
2. Cross-reference with the execution plan groups to identify the next logical slice.
3. Respect execution plan dependencies (e.g., Group F Home page depends on Groups A–E; Group I cross-link audit depends on all content).
4. Content-only slices (Groups A–E) are parallelizable and can be batched into a single Composer prompt if the slices share no code dependencies.

### Checkpoint discipline

After every ~5 slices or when a logical group completes, trigger a full doc sync (not just per-slice `NEXT_ACTIONS` updates). Full sync touches: `PROJECT_STATE.md`, `CURRENT_FOCUS.md`, `ROADMAP_STATUS.md`, `FOLDER_STRUCTURE.md`, `UI_STATES.md`.

Phase transitions require: `CURRENT_PHASE.md` full rewrite, `DEVELOPMENT_BREAKDOWN.md` gate status update, and all the above.

---

## 9) Relation to other protocols

- **Execution sessions** still follow `CURSOR_NEW_CHAT_PROTOCOL.md` for read order before coding.
- **After shipping** meaningful work, follow `UPDATE_PROTOCOL.md` and repo rules (e.g. `docs-update-policy.mdc`, `flow-guide-update-protocol` skill).
- **Execution workflow** is documented in `CURSOR_NEW_CHAT_PROTOCOL.md` §Execution workflow — two-agent model, per-slice prompts, checkpoint rules.
