---
owner: product
status: active
last_updated: 2026-04-01
source_of_truth: true
---

# Current phase

## Name

**Phase 1 — Engineering and content foundation (plumbing only)**

## Why we are here

**Phase 0A** and **0B** are **approved** (2026-04-01, [`PHASE_0_DECISION_RECORD.md`](../04_engineering/PHASE_0_DECISION_RECORD.md) §0). Per [`ROADMAP_MASTER.md`](../01_strategy/ROADMAP_MASTER.md), Phase 1 builds the **safe-to-extend** codebase: **App Router** shell, **IA route skeleton**, **typed content** boundaries, **search-index** generation stub, **global styles**, **minimal CI**, **observability placeholders**—**without** next-best-action rules, checklist logic, guest persistence behavior, auth, or headless CMS.

## Entry criteria (met)

- Phase 0 approved; `ENGINEERING_ARCHITECTURE.md` describes the v1 stack and flows.

## Exit criteria (Phase 1)

Per master roadmap **Phase 1**:

- App **shell** and **route skeleton** match `IA_SPEC.md` (including airport redirect to canonical).
- Shared **types** / **Zod** stubs aligned toward `DATA_CONTENT_MODEL_SPEC.md`.
- **Hub / guide / calculator / utility** pages exist as **placeholders** (no real product logic).
- **Content** directory + **build-time Zod validation** for Markdown frontmatter; **`search-index.json`** produced in **`prebuild`** from validated **pages** and **FAQ** records (empty array only if no valid files; invalid frontmatter **fails** the build).
- **Env** pattern, **lint/test/build** runnable; **Plausible** + **Sentry** wired as **stubs** (no secrets required locally).
- **No** NBA/checklist/guest **logic** beyond constants/types/stubs.

## What counts as done

- **`ROADMAP_STATUS.md`**: Phase 1 marked **done** with date when exit criteria met; Phase 2 **next/in progress**.

## After this phase

**Phase 2** — onboarding, guest state, dashboard population, NBA v1, checklist v1, trust UI (per roadmap).
