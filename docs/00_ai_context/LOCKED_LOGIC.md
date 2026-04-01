---
owner: product
status: active
last_updated: 2026-04-01
source_of_truth: true
---

# Locked logic

Behavioral and data rules that implementations must follow. Pair with `DATA_CONTENT_MODEL_SPEC.md` for field-level detail.

| Rule | Meaning |
|------|--------|
| **Next best action** | There is a defined **next best action** concept driving dashboard ordering and onboarding progression (not random lists). |
| **Checklist filtering** | Checklist items are shown/hidden via **rule-based** logic (user state, phase, flags) — not ad hoc per page without documented rules. |
| **Guest mode** | Guest sessions use **temporary state** (local storage / ephemeral session) until account; migration rules when upgrading to account TBD in engineering but must not contradict guest-first. |
| **Sources first-class** | **Source** records are entities linked from pages/steps — not invisible footnotes only. |
| **Updates linked to pages** | **Updates** (alerts/changelog style) link to affected **pages** or entities for traceability. |
| **Places-lite** | Location is **supporting** data for MVP, not a standalone map product; no top-level map IA requirement. |

## Reopening rule

Same as `LOCKED_DECISIONS.md`: human explicit change + `DECISION_LOG.md` entry.
