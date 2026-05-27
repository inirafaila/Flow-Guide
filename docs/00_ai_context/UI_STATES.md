---
owner: design
status: active
last_updated: 2026-05-27
source_of_truth: true
---

# UI states (canonical)

Per-surface states implementations and design should handle consistently. Extend when new surfaces ship.

## Home

**Implemented (Phase 3 — Group F — Home page, 2026-04-13):**

- **Hero** — primary CTA `/start`, secondary anchor `#home-entry-points`
- **Entry points** — three cards → `/newcomer`, `/work`, `/housing`
- **Guided Start** — block + CTA `/start`
- **Quick Tools** — five utility links (see `HomePage.tsx`)
- **Trust** — short framing list (source-aware, last verified, what may vary)

Server-rendered; copy in `home.*` i18n. No account-specific personalization on Home in this slice.

**Deferred (not v1 Home):**

- **Updates Preview** — updates teaser / feed block on Home.
- **Secondary Layer** — settled-user highlights, personalized modules for returning users — see `EXECUTION_ROADMAP.md` Phase 3 Group F notes / Phase 4.

Other deferred items called out historically: loading skeletons for primary blocks; error/offline handling — **not implemented** (static SSG Home).

**Scenarios:**

- **First visit / returning guest** — hybrid hero + entry to path; low friction (implemented as default Home).
- **Returning user (account)** — personalized highlights + link to dashboard — **not implemented** on Home (dashboard remains the personal layer).
- **Loading** — skeleton for primary blocks — **not implemented** (static SSG Home).
- **Error** — friendly retry; offline message if applicable — **not implemented** (static SSG Home).
- **Empty personalization** — fall back to default newcomer modules — **not applicable** until Home personalization ships; current Home is the default newcomer-oriented gateway for all guests.

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
- **Superseded by** "Dashboard (NBA + Checklist block — shipped)" below for current behavior; this section retained for historical per-slice reference.

## Dashboard (NBA + Checklist block — shipped)

- **Loading (guest read pending)** — NBA: page title + Card + localized loading text, no CTA. Checklist: section title "Your checklist" + muted "Loading…" (`aria-busy`).
- **No guest blob** (`readGuestBlob` `null`) — NBA: Card + copy to start path; CTAs `/start` + `/`. Checklist: all seed items shown unfiltered (inclusive when guest state undefined).
- **Incomplete onboarding** (blob exists, DTO `null`) — NBA: Card + copy to finish Start; same CTAs. Checklist: filters with available partial guest state; items with undefined rule fields pass (inclusive).
- **Valid NBA + populated checklist** — NBA: emphasis + primary + secondaries. Checklist: `filterChecklistItems` → category-grouped `ChecklistItemRow` list (newcomer → documents → housing → work → payments); each row: title, category badge, urgency marker, status chip (default "not-started"), estimated effort, destination link; `prerequisites_met === false` → dimmed/locked row.
- **Checklist empty after filter** — NBA renders normally. Checklist section: Card with "No checklist items" muted text.
- **Out of this slice** — full dashboard shell (header summary, residency card), alerts, quick actions, updates feed, trust blocks, UserChecklistStatus wiring (per-user done/in-progress), i18n for checklist labels.

## Dashboard (full product — not yet shipped)

- **Default populated** — next best actions, checklist, updates teaser (target per PRD/handoff §6; beyond current narrow NBA slice).
- **Sparse new user** — explain how to add context / complete onboarding.
- **Loading** — skeleton rows (broader shell; narrow slice uses simple text loading).
- **Error** — partial render + retry for failed sections.
- **Account required gate** — when action needs signup (per PRD).

## Guide page

- **Content loaded (with trust data)** — rendered Markdown body + **trust section**: `SourceBlock` (source attribution with type/confidence/link), `LastVerifiedNote` (verification date), `WhatMayVaryNote` (variance framing). Renders when server-loaded `PageTrustData` has sources or metadata. Wired on `/documents/[slug]` guide routes; **`/documents/address-registration`**, **`/documents/social-card`**, and **`/documents/temporary-residency`** have seed sources + page trust metadata.
- **Content loaded (no trust data)** — body placeholders + `guide.trustPlaceholder` block (Phase 1 placeholder). Applies to guide pages without seed source records or page content files.
- **Loading** — skeleton article.
- **Not found** — 404 with search + home.
- **Stale content warning** — optional banner when verification overdue (policy TBD).
- **Sensitive topic** — disclaimer + sources emphasized (residency, money).

## FAQ (`/faq` — Group G shipped 2026-05-27)

- **Populated list** — `RoutePageBanner` + i18n intro (`faq.intro`) + stacked `<section id={faqId}>` per entry: title (`h2`), rendered Markdown body (`.faq-body`), optional “Related guides” links from `related_page_slugs` (labels from `ROUTE_TITLES`). Sorted by title. No jump nav in v1.
- **Empty** — intro + `faq.empty` when no active FAQ items (`is_active: false` omitted).
- **Anchor deep-link** — public URL `/faq#<faq_id>`; each section `id={faqId}` with `scroll-margin-top` for in-page navigation. Search-index FAQ rows use same `/faq#…` slug (Phase 4 search UX not wired yet).
- **Not in this slice** — per-item routes (`/faq/[slug]`), accordion, trust blocks, FAQ search, jump nav with JS/sticky/scrollspy.

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
