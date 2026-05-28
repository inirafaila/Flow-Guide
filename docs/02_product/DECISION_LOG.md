---
owner: product
status: active
last_updated: 2026-05-28
source_of_truth: true
---

# Decision log

Append-only record of **significant** decisions. For locked rules, mirror in `LOCKED_DECISIONS.md` / `LOCKED_LOGIC.md`.

| Date | Decision | Rationale | Where captured |
|------|----------|-----------|----------------|
| 2026-05-28 | Phase 4 MVP launch contract + waivers W-001–W-011 | Reconcile shipped guest-first static MVP vs PRD/UI handoff; close Phase 4 without new features; deferred items are not delivery commitments | [`MVP_LAUNCH_CONTRACT.md`](MVP_LAUNCH_CONTRACT.md), `ROADMAP_STATUS.md`, `CURRENT_PHASE.md` |
| 2026-04-01 | AI context + doc tree canonicalized | Long-running Cursor collaboration and zero-to-deploy discipline | `docs/00_ai_context/*`, this repo |
| (prior) | Guest-first, hybrid home, dashboard core, etc. | Product/UX alignment | `LOCKED_DECISIONS.md`, research + PRD |

## Template for new rows

```
| YYYY-MM-DD | Short title | One line why | PRD / ADR / doc link |
```
