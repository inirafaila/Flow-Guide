---
owner: design
status: active
last_updated: 2026-05-29
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

- **Loading (guest read pending)** — NBA: page title + Card + localized loading text, no CTA. Checklist: `dashboard.checklist.sectionTitle` + `dashboard.checklist.loading` (`aria-busy`).
- **No guest blob** (`readGuestBlob` `null`) — NBA: Card + copy to start path; CTAs `/start` + `/`. Checklist: active seed items only (`sample-checklist-row` inactive); inclusive filter when guest state undefined.
- **Incomplete onboarding** (blob exists, DTO `null`) — NBA: Card + copy to finish Start; same CTAs. Checklist: filters with available partial guest state.
- **Valid NBA + populated checklist** — NBA: emphasis + primary + secondaries. Checklist: category groups use `dashboard.checklist.category.*`; rows use `checklistRow.status.*`, `checklistRow.locked`, `checklistRow.urgencyA11y`; item titles from content Markdown (English).
- **Checklist empty after filter** — NBA renders normally. Checklist: Card with `dashboard.checklist.empty`.
- **Out of this slice** — full dashboard shell (header summary, residency card), alerts, quick actions, updates feed, trust blocks, UserChecklistStatus wiring, translated checklist item bodies.

## Start (`/start` — Group H note 2026-05-28)

- **Onboarding flow** — unchanged behavior; copy in `onboardingStart.*` (en/fa/ru). Wrapper class `start-page` (not `route-placeholder`).
- **No** RoutePageBanner / Phase 1 placeholder on this route.

## Route shell banner (Group I — 2026-05-27)

- **RoutePageBanner** on hubs/guides/FAQ/calculator/utility routes: **title** + optional **muted summary** (from page frontmatter `summary`, or `routeBanner.summaries.*` i18n). **No** `placeholder.phase1`, **no** raw path `<code>`. `/dashboard`, `/start`, `/` unchanged (no banner on those routes).

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

- **Populated list** — `RoutePageBanner` with `faq.intro` as banner summary (no duplicate intro paragraph) + stacked `<section id={faqId}>` per entry: title (`h2`), rendered Markdown body (`.faq-body`), optional “Related guides” links from `related_page_slugs` (labels from `ROUTE_TITLES`). Sorted by title. No jump nav in v1.
- **Empty** — intro + `faq.empty` when no active FAQ items (`is_active: false` omitted).
- **Anchor deep-link** — public URL `/faq#<faq_id>`; each section `id={faqId}` with `scroll-margin-top` for in-page navigation. Search-index FAQ rows use same `/faq#…` slug (Phase 4 search UX not wired yet).
- **Not in this slice** — per-item routes (`/faq/[slug]`), accordion, trust blocks, FAQ search, jump nav with JS/sticky/scrollspy.

## Search (`/search` — Slice 4.1 shipped)

- **Index load (client)** — fetch `public/search-index.json`; Zod-validated; `loading` / `ready` / `error` (no retry UI beyond message in v1).
- **Empty query** — static hints + links to `/faq`, `/newcomer`, `/documents` (not full index browse).
- **Results** — grouped sections: **Guides**, **Tools**, **FAQ**, **Places** (Places hidden when empty); rows link via build-time `href`; place rows link to **parent guide** (not maps URL); optional **Best match** when clear winner (score threshold + margin).
- **No results** — message + link to FAQ.
- **Query UX** — debounced input (~200ms); token/substring match (no search library).

- **Analytics (4.4):** `search_used` fires on debounced query only (`has_results`, `result_count_bucket`); no query text sent.

**Deferred (not 4.1):** recent searches, `?q=` deep links, query-param filters, hit highlighting, header typeahead, localized result titles.

## Analytics (Phase 4.4 — shipped)

- **Plausible:** env-gated script + SPA `pageview` on client route changes (skips duplicate first mount).
- **Custom events (6):** `home_entry_point_clicked`, `onboarding_started`, `onboarding_completed`, `next_action_clicked`, `search_used`, `stay_calculator_used` — allowlisted props only via `trackEvent`; no Markdown-body instrumentation.
- **Pre-prod:** legal/privacy + production Plausible domain remain [`OPEN_ITEMS.md`](OPEN_ITEMS.md) / LAG gates.

## Places (guide blocks — Slice 4.3 shipped)

- **RelatedPlacesBlock** on `/payments/terminals`, `/documents/address-registration`, `/transport/public-transport-payments` — up to **3** `PlaceCard` rows per guide when active place content exists; section hidden when zero places.
- **PlaceCard** — name, editorial `notes`, optional area-hint `address`, `places.verifyBeforeVisit` microcopy; optional external **Open in Maps** link (`maps_url`) with external affordance; **no** opening hours, `place_type` label, `confidence_level`, photos, or ratings.
- **Not in this slice** — `/places` routes, `/city` hub, map embeds, place detail pages, filters, Home/Dashboard surfacing.

## Updates (`/updates` — Slice 4.2 shipped)

- **Populated list** — `RoutePageBanner` + page disclaimer + stacked `UpdateCard` rows: title, published date, calm impact badge (if set), summary, optional plain-text body excerpt (summary &lt; 140 chars), related guide links. Sorted `published_at` desc.
- **Empty** — intro + disclaimer + `updates.empty` when no active items.
- **Not in this slice** — per-update routes, expand/collapse, filters/tabs, `SourceBlock` / `source_ids`, search index rows, Home preview, Dashboard “updates for you” (**4.6**), read/unread, client fetch.

## Alerts (dashboard — not yet shipped)

- **None** — hide or show “all clear” per design (target **4.6**).
- **List** — unread/read distinction if account; guest may show inline only.
- **Detail** — linked targets to pages/entities.
- **Error** — retry fetch.
