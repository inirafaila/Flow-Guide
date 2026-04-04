---
owner: design
status: active
last_updated: 2026-04-04
source_of_truth: true
---

# UI states (canonical)

Per-surface states implementations and design should handle consistently. Extend when new surfaces ship.

## Home

- **First visit / returning guest** — hybrid hero + entry to path; low friction.
- **Returning user (account)** — personalized highlights + link to dashboard.
- **Loading** — skeleton for primary blocks.
- **Error** — friendly retry; offline message if applicable.
- **Empty personalization** — fall back to default newcomer modules.

## Onboarding

- **Step in progress** — one primary question/action per step; **Step 5 (shipped)** — single screen, five `has_*` rows each with explicit true/false; Next disabled until all five answered.
- **Completed** — minimal end on `/start` with CTA home only (Phase 2 slice to date); dashboard handoff not wired yet.
- **Abandoned resume** — restore from guest temp state when possible.
- **Validation error** — inline, calm copy.

## Dashboard

- **Default populated** — next best actions, checklist, updates teaser.
- **Sparse new user** — explain how to add context / complete onboarding.
- **Loading** — skeleton rows.
- **Error** — partial render + retry for failed sections.
- **Account required gate** — when action needs signup (per PRD).

## Guide page

- **Content loaded** — body, sources block, related links.
- **Loading** — skeleton article.
- **Not found** — 404 with search + home.
- **Stale content warning** — optional banner when verification overdue (policy TBD).
- **Sensitive topic** — disclaimer + sources emphasized (residency, money).

## Search

- **Empty query** — recent, suggested, or categories per IA.
- **Results** — list + filters if in scope.
- **No results** — suggestions and broader categories.
- **Loading** — debounced spinner.
- **Error** — retry.

## Alerts / updates

- **None** — hide or show “all clear” per design.
- **List** — unread/read distinction if account; guest may show inline only.
- **Detail** — linked targets to pages/entities.
- **Error** — retry fetch.
