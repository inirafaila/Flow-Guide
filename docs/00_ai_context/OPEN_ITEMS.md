---
owner: product
status: active
last_updated: 2026-04-11
source_of_truth: false
---

# Open items

**Phase 0 architecture and MVP contract** are **approved** — see [`PHASE_0_DECISION_RECORD.md`](../04_engineering/PHASE_0_DECISION_RECORD.md) §0. This file lists **remaining** human/ops gates (not open stack questions).

When a gate closes, update this file, `PROJECT_STATE.md`, `NEXT_ACTIONS.md`, and `ROADMAP_STATUS.md`.

| Gate | Why it matters | Blocking which phase | Current status |
|------|----------------|----------------------|----------------|
| **Content governance names** | Sensitive pages need **named** owner + reviewer (§3.5) | **Publishing** sensitive copy / **LAG** content sign-off | **Open** — assign before verified publish |
| **Legal / privacy (prod)** | **localStorage**, **Plausible**, **Sentry**, **forms** | **LAG** / **Phase 5–6** | **Open** — sign-off before production |
| **Housing / casino in launch train** | Default **post-launch** | **Phase 4** if promoted | **Open** — confirm post-launch unless ops/legal/intake documented |
| **Auth provider** | **Auth.js** default candidate when save-path ships | **Phase 2+** account slice | **Open later** |
| **Sentry / Plausible production projects** | Real DSN/domain in Vercel envs | **Pre-launch** | **Open** — stub OK for Phase 1 local |

## Note

**Locked** product direction: `LOCKED_DECISIONS.md`, `LOCKED_LOGIC.md`. **No Docker / no headless CMS / no auth** for MVP scaffold per approved architecture — see `PHASE_0_DECISION_RECORD.md` and `ENGINEERING_ARCHITECTURE.md` for what ships when.
