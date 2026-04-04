---
owner: design
status: active
last_updated: 2026-04-06
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
- **Completed** — Step 6 Result Summary on `/start` when onboarding is complete: consumes **`deriveGuestOnboardingOutcomePreviewV1`** (emphasis line, primary + optional secondary links, two CTAs — **`/dashboard`** primary and **`/`** secondary on happy path); localized fallback if preview is **`null`**; **no** account/save-path CTA in this slice.
- **Abandoned resume** — restore from guest temp state when possible.
- **Validation error** — inline, calm copy.

## Dashboard (NBA v1 slice — shipped)

- **Loading (guest read pending)** — page title + one **`Card`** + localized loading text; **no** CTA.
- **No guest blob** (`readGuestBlob` **`null`**) — page title + one **`Card`** + copy to start path; **primary** CTA **`/start`**, **secondary** **`/`** (labels from **`shell`**).
- **Incomplete onboarding** (blob exists, DTO **`null`**) — page title + one **`Card`** + copy to finish Start; **same two CTAs** as no-blob; **not** framed as Step 6 error copy.
- **Valid NBA preview** — page title + one **`Card`** with section title, emphasis line (`onboardingStart.step6.emphasis.*`), **one** primary link (`page_slug` + `reason` key), **up to 2** secondary links (DTO order, slug label helper); **no** extra dashboard CTAs, **no** auth/save-path.
- **Out of this slice** — full shell, residency card, checklist block, alerts, quick actions, updates, trust blocks (see roadmap Phase 2 remainder).

## Dashboard (full product — not yet shipped)

- **Default populated** — next best actions, checklist, updates teaser (target per PRD/handoff §6; beyond current narrow NBA slice).
- **Sparse new user** — explain how to add context / complete onboarding.
- **Loading** — skeleton rows (broader shell; narrow slice uses simple text loading).
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
