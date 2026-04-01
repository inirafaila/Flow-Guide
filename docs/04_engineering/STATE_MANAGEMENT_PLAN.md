---
owner: engineering
status: active
last_updated: 2026-04-01
source_of_truth: false
---

# State management plan

## Guest vs account

- **Guest:** temporary client state (e.g. localStorage/sessionStorage) for onboarding progress and lightweight checklist — per `LOCKED_LOGIC.md`.
- **Account:** server-backed profile and synced checklist/dashboard; auth mechanism TBD.

## Server state

- Prefer **URL + server cache** for content pages where possible.
- **TanStack Query / SWR** or framework fetch cache — pick when stack fixed.

## Client UI state

- Wizard steps, modals, search UI: local component state or small context; avoid global store until needed.

## Migration

- Document promotion path **guest → account** (merge checklist, dedupe) before shipping signup.

## Sources of truth

- Product rules: `LOCKED_LOGIC.md`, `DATA_CONTENT_MODEL_SPEC.md`.
- Implementation notes: update this file when libraries are chosen.
