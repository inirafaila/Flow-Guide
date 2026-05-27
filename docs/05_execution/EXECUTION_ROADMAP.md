---
name: Full Execution Roadmap
overview: Complete execution plan from current Phase 3 state through production launch and post-launch stabilization, covering all remaining phases (3-7), LAG criteria, risk register, and timeline estimates.
todos:
  - id: phase3-hubs
    content: "Phase 3 Group A: Author 4 remaining hub pages (work, payments, transport, daily-life)"
    status: completed
  - id: phase3-newcomer
    content: "Phase 3 Group B: Author 3 newcomer guides (day-one, first-week, airport-to-city) + source records"
    status: completed
  - id: phase3-work
    content: "Phase 3 Group C: Author 3 work guides (quick-income, yandex-starter, live-gaming) + source records"
    status: completed
  - id: phase3-payments-transport
    content: "Phase 3 Group D: Author 3 payments/transport guides (terminals, service-payments, public-transport-payments) + source records"
    status: completed
  - id: phase3-housing-daily
    content: "Phase 3 Group E: Author 3 housing/daily-life guides (owner-vs-agency, rental-checklist, essential-apps) + source records"
    status: completed
  - id: phase3-home
    content: "Phase 3 Group F: Build Home page (replace RoutePlaceholder with real components per UI_HANDOFF_SPEC)"
    status: completed
  - id: phase3-faq
    content: "Phase 3 Group G: Author FAQ content"
    status: completed
  - id: phase3-copy-audit
    content: "Phase 3 Group H: Dashboard + Start copy audit for real user-facing text"
    status: completed
  - id: phase3-crosslinks
    content: "Phase 3 Group I: Cross-link audit + editorial/trust review for sensitive pages"
    status: completed
  - id: phase4-search
    content: "Phase 4: Build client grouped search UI (FlexSearch/Fuse.js on search-index.json)"
    status: pending
  - id: phase4-updates
    content: "Phase 4: Build /updates page + seed update items"
    status: pending
  - id: phase4-places
    content: "Phase 4: Curate real Place records + PlaceCard component + related places block"
    status: pending
  - id: phase4-analytics
    content: "Phase 4: Instrument Plausible analytics events for core funnels"
    status: pending
  - id: phase4-seo
    content: "Phase 4: SEO metadata, sitemap.xml, robots.txt"
    status: pending
  - id: phase4-dashboard
    content: "Phase 4: Dashboard enhancement (alerts, quick actions, updates-for-you blocks)"
    status: pending
  - id: phase5-qa
    content: "Phase 5: Full QA pass (responsive, trust/source, navigation, security/privacy, analytics)"
    status: pending
  - id: lag-gates
    content: "LAG: Close all gates (governance names, legal/privacy, Sentry/Plausible prod projects) + GO/NO-GO"
    status: pending
  - id: phase6-deploy
    content: "Phase 6: Vercel production setup, env separation, monitoring, DNS, rollback test"
    status: pending
  - id: phase7-stabilize
    content: "Phase 7: Post-launch stabilization (triage rhythm, content freshness, perf monitoring)"
    status: pending
isProject: false
---

# Flow-Guide: Complete Execution Roadmap to Production

**Baseline (2026-05-27):** Phase 0A/0B done (2026-04-01), Phase 1 done (2026-04-04), Phase 2 done (2026-04-11), **Phase 3 in progress** (not exit-complete). **Groups A–I shipped** (incl. Group I banner/fixtures/links 2026-05-27). **Next:** Phase 3 **exit verification** pass (§2 checklist) before `ROADMAP_STATUS` Phase 3 → Done. **`/city`:** removed from header nav; route remains launch-adjacent (no tourism content in MVP). Phase 4: `/search`, `/updates` UI still stub. 255 Vitest tests; lint/test/build green per last ship.

---

## 1. Phase 3 Completion Plan (remaining slices)

**Status (2026-05-27):** Slices **A–I** shipped. Phase 3 exit checklist (§2) remains for a **separate verification pass** — do not mark Phase 3 done in `ROADMAP_STATUS.md` until that pass completes.

### Execution Order and Grouping

Content slices below are **all content-only** (no code changes) unless noted. The universal content pipeline (`loadPageContent` + `loadTrustDataForPage`) handles rendering automatically. Files go in `src/content/pages/<slug>.md` for guides/hubs, `src/content/sources/<id>.md` for source records.

---

#### Group A: Remaining Hub Pages (4 hubs) -- PARALLELIZABLE with Group B-E

**Slice A1: Work hub**
- **Description:** Section hub for `/work` -- intro, top tasks (quick-income, yandex-starter, live-gaming), related guides
- **Files to create:** `src/content/pages/work.md`
- **Files to modify:** None
- **Dependencies:** None (pipeline ready)
- **Content notes:** Intro framing income/work for newcomers in Armenia; link to 3 sub-guides; mention cash-first survival angle per PRD
- **Estimated complexity:** S
- **Source records needed?** No (hub, not sensitive guide)

**Slice A2: Payments hub**
- **Description:** Section hub for `/payments` -- intro, top tasks (terminals, service-payments), related tools
- **Files to create:** `src/content/pages/payments.md`
- **Files to modify:** None
- **Dependencies:** None
- **Content notes:** Framing: how payments work in Armenia for newcomers; terminal culture, no-bank-account options; cross-link to `/documents/social-card` (bank prerequisite chain)
- **Estimated complexity:** S
- **Source records needed?** No

**Slice A3: Transport hub**
- **Description:** Section hub for `/transport` -- intro, top tasks (public-transport-payments), airport cross-link
- **Files to create:** `src/content/pages/transport.md`
- **Files to modify:** None
- **Dependencies:** None
- **Content notes:** Getting around Yerevan; mention airport-to-city cross-link to `/newcomer/airport-to-city`; public transport payments as main guide
- **Estimated complexity:** S
- **Source records needed?** No

**Slice A4: Daily Life hub**
- **Description:** Section hub for `/daily-life` -- intro, essential apps guide link, adaptation framing
- **Files to create:** `src/content/pages/daily-life.md`
- **Files to modify:** None
- **Dependencies:** None
- **Content notes:** Day-to-day life setup; apps, delivery, communication; lighter section
- **Estimated complexity:** S
- **Source records needed?** No

---

#### Group B: Newcomer Section Guides (3 guides) -- PARALLELIZABLE with A, C-E

**Slice B1: Day One guide**
- **Description:** Guide for `/newcomer/day-one` -- what to do on arrival day
- **Files to create:** `src/content/pages/day-one.md`
- **Files to modify:** None
- **Dependencies:** None
- **Content notes:** SIM card, money exchange, transport from airport (cross-link `/newcomer/airport-to-city`), temporary housing, essential apps. Steps oriented. Per PRD this is a P0 must-have page (PRD 10.1 item 4). Sensitive: no (orientation, not legal)
- **Estimated complexity:** S
- **Source records needed?** No (orientation content, not legal/financial)

**Slice B2: First Week guide**
- **Description:** Guide for `/newcomer/first-week` -- week-one action plan
- **Files to create:** `src/content/pages/first-week.md`
- **Files to modify:** None
- **Dependencies:** B1 recommended (day-one is prerequisite context) but not blocking
- **Content notes:** Address registration (cross-link `/documents/address-registration`), social card, housing search, payment setup, transport. Structured as a progression. Cross-link heavy. Per DEVELOPMENT_BREAKDOWN Ticket 6.3
- **Estimated complexity:** S
- **Source records needed?** No (meta-guide linking to specific sensitive pages that have their own sources)

**Slice B3: Airport to City guide**
- **Description:** Guide for `/newcomer/airport-to-city` -- canonical airport arrival guide (redirect target from `/transport/airport`)
- **Files to create:** `src/content/pages/airport-to-city.md`
- **Files to modify:** None
- **Dependencies:** None
- **Content notes:** Transport options from Zvartnots airport, costs, taxi tips, GG/Yandex apps, public transport. Field-experience data should be noted. Per DEVELOPMENT_BREAKDOWN Ticket 6.4. Redirect from `/transport/airport` already wired in middleware
- **Estimated complexity:** S
- **Source records needed?** Yes -- at least 1 field-experience source record for transport costs/options
  - Create: `src/content/sources/airport-to-city-field.md`

---

#### Group C: Work Section Guides (3 guides) -- PARALLELIZABLE with A, B, D-E

**Slice C1: Quick Income guide**
- **Description:** Guide for `/work/quick-income` -- fast income options before formal employment
- **Files to create:** `src/content/pages/quick-income.md`
- **Files to modify:** None
- **Dependencies:** None
- **Content notes:** Delivery (Glovo, Yandex Eats), freelance, cash work, casino track mention. Cash-first survival per PRD. Cross-link to `/work/yandex-starter`, `/work/live-gaming`. Per Ticket 6.14
- **Estimated complexity:** S
- **Source records needed?** Yes -- field-experience source for income ranges/availability
  - Create: `src/content/sources/quick-income-field.md`

**Slice C2: Yandex Starter guide**
- **Description:** Guide for `/work/yandex-starter` -- getting started as Yandex driver/courier
- **Files to create:** `src/content/pages/yandex-starter.md`
- **Files to modify:** None
- **Dependencies:** None
- **Content notes:** Registration steps, requirements, documentation needed, earnings expectations, tips. Sensitive: income/work claims need source. Per Ticket 6.15
- **Estimated complexity:** S
- **Source records needed?** Yes -- field-experience source
  - Create: `src/content/sources/yandex-starter-field.md`

**Slice C3: Live Gaming guide**
- **Description:** Guide for `/work/live-gaming` -- casino/live gaming employment track
- **Files to create:** `src/content/pages/live-gaming.md`
- **Files to modify:** None
- **Dependencies:** None
- **Content notes:** What live gaming work is, how to apply, requirements, language needs, work conditions. Cross-link to casino referral if promoted. Per Ticket 6.16
- **Estimated complexity:** S
- **Source records needed?** Yes -- field-experience source
  - Create: `src/content/sources/live-gaming-field.md`

---

#### Group D: Payments + Transport Guides (3 guides) -- PARALLELIZABLE with A-C, E

**Slice D1: Payment Terminals guide**
- **Description:** Guide for `/payments/terminals` -- how to use Telcell/EasyPay/iDram terminals
- **Files to create:** `src/content/pages/terminals.md`
- **Files to modify:** None
- **Dependencies:** None
- **Content notes:** Step-by-step terminal usage, what you can pay, no-bank-account advantage, common terminals, locations. SENSITIVE: payment methods/costs. Per Ticket 6.18
- **Estimated complexity:** S
- **Source records needed?** Yes -- official + field-experience
  - Create: `src/content/sources/terminals-official.md`, `src/content/sources/terminals-field.md`

**Slice D2: Service Payments guide**
- **Description:** Guide for `/payments/service-payments` -- paying utilities, mobile, internet without bank account
- **Files to create:** `src/content/pages/service-payments.md`
- **Files to modify:** None
- **Dependencies:** D1 recommended for cross-link coherence
- **Content notes:** Utility bills, mobile top-up, internet. Cross-link to terminals. Per Ticket 6.19 (strongly recommended, P1)
- **Estimated complexity:** S
- **Source records needed?** Yes -- field-experience
  - Create: `src/content/sources/service-payments-field.md`

**Slice D3: Public Transport Payments guide**
- **Description:** Guide for `/transport/public-transport-payments` -- bus/metro fare payment
- **Files to create:** `src/content/pages/public-transport-payments.md`
- **Files to modify:** None
- **Dependencies:** None
- **Content notes:** Metro card, bus payment, Yerevan transport system, costs. SENSITIVE: transport costs. Per Ticket 6.21
- **Estimated complexity:** S
- **Source records needed?** Yes -- official + field-experience
  - Create: `src/content/sources/public-transport-official.md`, `src/content/sources/public-transport-field.md`

---

#### Group E: Housing + Daily Life Guides (3 guides) -- PARALLELIZABLE with A-D

**Slice E1: Owner vs Agency guide**
- **Description:** Guide for `/housing/owner-vs-agency` -- renting directly vs through agency
- **Files to create:** `src/content/pages/owner-vs-agency.md`
- **Files to modify:** None
- **Dependencies:** None
- **Content notes:** Pros/cons, cost differences, scam warnings, typical process. Cross-link to rental-checklist. Per Ticket 6.11
- **Estimated complexity:** S
- **Source records needed?** Yes -- field-experience
  - Create: `src/content/sources/owner-vs-agency-field.md`

**Slice E2: Rental Checklist guide**
- **Description:** Guide for `/housing/rental-checklist` -- what to check before signing a lease
- **Files to create:** `src/content/pages/rental-checklist.md`
- **Files to modify:** None
- **Dependencies:** E1 for cross-link coherence
- **Content notes:** Inspection items, contract terms, deposit rules, common traps. Per Ticket 6.12 (P1, can slip per 14.3 but strongly helps journey completeness)
- **Estimated complexity:** S
- **Source records needed?** Yes -- field-experience
  - Create: `src/content/sources/rental-checklist-field.md`

**Slice E3: Essential Apps guide**
- **Description:** Guide for `/daily-life/essential-apps` -- must-have apps for Armenia life
- **Files to create:** `src/content/pages/essential-apps.md`
- **Files to modify:** None
- **Dependencies:** None
- **Content notes:** GG taxi, Yandex, iDram, Telcell, delivery apps, translation, maps. Per Ticket 6.23 (P1, strongly recommended)
- **Estimated complexity:** S
- **Source records needed?** No (app recommendations, not sensitive legal/financial)

---

#### Group F: Home Page -- depends on Groups A-E for cross-links

**Slice F1: Home page implementation**
- **Description:** Replace `RoutePlaceholder` on `/` with real Home page per [UI_HANDOFF_SPEC.md](docs/02_product/UI_HANDOFF_SPEC.md) Section 4
- **Files to create:**
  - `src/features/home/HomePage.tsx` -- Home page component
  - `src/features/home/HeroBlock.tsx` -- Hero with headline + dual CTA
  - `src/features/home/EntryPointCards.tsx` -- 3 entry point cards (newcomer, work, housing)
  - `src/features/home/GuidedStartBlock.tsx` -- CTA to `/start`
  - `src/features/home/QuickToolsGrid.tsx` -- Quick tool cards (stay-calculator, airport, terminals, essential-apps, social-card)
  - `src/features/home/TrustSectionBlock.tsx` -- Trust framing (source-aware, verified, variance)
- **Files to modify:**
  - `src/app/[locale]/page.tsx` -- replace RoutePlaceholder with HomePage
  - `src/app/globals.css` -- Home page BEM styles
  - `messages/en.json`, `messages/fa.json`, `messages/ru.json` -- Home page i18n keys
- **Dependencies:** Groups A-E content should exist for meaningful cross-links; can start component skeleton earlier
- **Content notes:** Per UI_HANDOFF_SPEC Section 4: Hero (value proposition + dual CTA), 3 entry point cards, guided start block, quick tools grid, trust section. No updates preview block yet (Phase 4). No secondary settled-user layer in v1. Mobile: stacked cards, full-width CTAs
- **Estimated complexity:** L
- **Source records needed?** No

---

#### Group G: FAQ Page — **shipped (2026-05-27)**

**Slice G1: FAQ content**
- **Description:** Real FAQ content for `/faq`
- **Files to create:** `src/content/faq/` -- additional FAQ entries beyond any existing sample
- **Files to modify:** Possibly `src/app/[locale]/faq/page.tsx` if FAQ rendering needs enhancement beyond current placeholder
- **Dependencies:** Groups A-E for cross-link targets
- **Content notes:** Cross-category questions per IA_SPEC Section 20: "Can I do X without a bank account?", "What if I don't have residency yet?", "Fastest way from airport?". Should link to relevant guide pages. Per Ticket 6.24 (P1, strongly recommended)
- **Estimated complexity:** M
- **Source records needed?** No

---

#### Group H: Dashboard + Start Real Copy Review — **shipped (2026-05-28)**

**Slice H1: Dashboard copy audit**
- **Description:** Shipped — checklist chrome i18n (`dashboard.checklist.*`, `checklistRow.*`); `sample-checklist-row` inactive; message audit en/fa/ru
- **Files to modify:** Potentially `messages/en.json` (dashboard.\* keys), `src/features/dashboard/DashboardNextBestAction.tsx`, `src/features/dashboard/DashboardChecklistBlock.tsx`
- **Dependencies:** None (already functional from Phase 2)
- **Content notes:** NBA v1 and checklist block already render real data from guest blob + checklist items. Verify i18n strings are user-ready, not developer placeholder text. Dashboard "real copy" exit criterion may already be met -- audit needed
- **Estimated complexity:** S
- **Source records needed?** No

**Slice H2: Start page copy audit**
- **Description:** Verify `/start` onboarding has polished user-facing copy
- **Files to modify:** Potentially `messages/en.json` (onboardingStart.\* keys)
- **Dependencies:** None
- **Content notes:** 6-step onboarding already functional. Verify all step titles, descriptions, option labels, result summary copy are user-ready
- **Estimated complexity:** S
- **Source records needed?** No

---

#### Group I: Cross-link Audit + Editorial Review -- depends on ALL above

**Slice I1: Cross-link audit**
- **Description:** Verify all `related_page_slugs` frontmatter in every content page point to real pages; verify hub top-tasks link to correct guides; verify guide "related pages" sections are populated
- **Files to modify:** Various `src/content/pages/*.md` files (add/fix `related_page_slugs` frontmatter)
- **Dependencies:** All content pages authored (Groups A–H)
- **Content notes:** Per IA_SPEC Section 17: related content should be action-oriented (prerequisite, next step, related tool, related place). Every guide should link forward to logical next step
- **Estimated complexity:** M
- **Source records needed?** No

**Slice I2: Editorial + trust review for sensitive pages**
- **Description:** Review all pages tagged as sensitive (residency, payments, transport, banking-adjacent) for factual accuracy, source block presence, last_verified_at, what_may_vary
- **Files to modify:** Various content and source files -- corrections
- **Dependencies:** All content authored; source records created
- **Content notes:** Sensitive categories per PRD Section 18: residency/stay-day, address registration, social card, bank, payments, transport. Documents section already reviewed. Remaining: payments guides, transport guide, work guides (income claims)
- **Estimated complexity:** M
- **Source records needed?** May create additional source records as review reveals gaps

---

### Recommended Execution Order

```
Week 1:
  Day 1-2: Groups A + B + C (all parallelizable) -- 4 hubs + 6 guides
  Day 2-3: Groups D + E (parallelizable) -- 3 + 3 guides + source records
  Day 3-4: Group F (Home page) -- start component work alongside content

Week 2:
  Day 4-5: Group F completion + Group G (FAQ)
  Day 5:   Group H (Dashboard/Start copy audit)
  Day 6:   Group I (cross-link audit + editorial review)
  Day 6-7: Bug fixes, regression testing
```

---

## 2. Phase 3 Exit Checklist

All of the following must be true:

- [ ] Every must-launch route from DEVELOPMENT_BREAKDOWN Section 14.1 has substantive content:
  - [ ] 6.1: Home (`/`) -- real page, not RoutePlaceholder
  - [ ] 6.2: Newcomer hub (`/newcomer`) -- DONE
  - [ ] 6.3: First Week (`/newcomer/first-week`)
  - [ ] 6.4: Airport to City (`/newcomer/airport-to-city`)
  - [ ] 6.5: Documents hub (`/documents`) -- DONE
  - [ ] 6.6: Stay Calculator (`/documents/stay-calculator`) -- DONE (Phase 2)
  - [ ] 6.7: Address Registration (`/documents/address-registration`) -- DONE
  - [ ] 6.8: Social Card (`/documents/social-card`) -- DONE
  - [ ] 6.9: Temporary Residency (`/documents/temporary-residency`) -- DONE
  - [ ] 6.10: Housing hub (`/housing`) -- DONE
  - [ ] 6.11: Owner vs Agency (`/housing/owner-vs-agency`)
  - [ ] 6.13: Work hub (`/work`)
  - [ ] 6.14: Quick Income (`/work/quick-income`)
  - [ ] 6.15: Yandex Starter (`/work/yandex-starter`)
  - [ ] 6.16: Live Gaming (`/work/live-gaming`)
  - [ ] 6.17: Payments hub (`/payments`)
  - [ ] 6.18: Terminals (`/payments/terminals`)
  - [ ] 6.20: Transport hub (`/transport`)
  - [ ] 6.21: Public Transport Payments (`/transport/public-transport-payments`)
  - [ ] Newcomer Day One (`/newcomer/day-one`) -- in PRD 10.1 item 4

- [ ] Strongly recommended routes (from Section 14.2 / PRD) have content:
  - [ ] 6.12: Rental Checklist (`/housing/rental-checklist`)
  - [ ] 6.19: Service Payments (`/payments/service-payments`)
  - [ ] 6.22: Daily Life hub (`/daily-life`)
  - [ ] 6.23: Essential Apps (`/daily-life/essential-apps`)
  - [ ] 6.24: FAQ (`/faq`)

- [x] Home, Start, Dashboard display real user-facing copy (no "placeholder" or "TODO" text visible to users)
- [x] Cross-links audit: Markdown internal links in pages/faq validated (`content-internal-links.test.ts`); hub/guide Related sections present (Group I)
- [x] Trust/source review: sensitive pages spot-checked; metadata + field sources in place (Group I; no new official sources added)
- [x] `npm run lint`, `npm run test`, `npm run build` all green (Group I ship)
- [x] search-index.json includes active content pages; `welcome.md` excluded (`is_active: false`)
- [ ] No dead-end routes on must-launch paths — confirm on exit verification walk (stay-calculator related links added Group I)
- [x] RoutePageBanner: no user-visible Phase 1 shell on content routes (Group I)
- [ ] **`/city` waiver:** not in MVP nav; direct URL may show utility stub — documented launch-adjacent deferral

---

## 3. Phase 4 Plan (utility, instrumentation, hardening)

### Slice 4.1: Search v1 -- Client Grouped Search

- **Description:** Build the must-launch client-side grouped search UI on `/search` per [ENGINEERING_ARCHITECTURE.md](docs/04_engineering/ENGINEERING_ARCHITECTURE.md) Section 4 and [IA_SPEC.md](docs/02_product/IA_SPEC.md) Section 13
- **Files to create:**
  - `src/features/search/SearchPage.tsx` -- search input + results container
  - `src/features/search/GroupedSearchResults.tsx` -- results grouped by type (guides, FAQ, places)
  - `src/features/search/BestMatchCard.tsx` -- highlighted top result
  - `src/features/search/SearchResultRow.tsx` -- individual result row
  - `src/features/search/useSearchIndex.ts` -- client hook: fetch `search-index.json`, build FlexSearch/Fuse index
- **Files to modify:**
  - `src/app/[locale]/search/page.tsx` -- replace placeholder with SearchPage
  - `src/app/globals.css` -- search BEM styles
  - `messages/*.json` -- search i18n keys
  - `scripts/build-search-index.impl.ts` -- ensure places-lite records are included in index
- **Dependencies:** Phase 3 complete (content must exist to be searchable); FlexSearch or Fuse.js npm dependency
- **Complexity:** L
- **Ticket refs:** 7.1-7.4

### Slice 4.2: Updates Surface

- **Description:** Build `/updates` page and at least one real editorial update path feeding Home/Dashboard
- **Files to create:**
  - `src/features/updates/UpdatesPage.tsx` -- updates list page
  - `src/components/ui/UpdateCard.tsx` -- individual update card component
  - At least 2-3 seed update items in `src/content/updates/*.md`
- **Files to modify:**
  - `src/app/[locale]/updates/page.tsx` -- replace placeholder
  - `src/app/globals.css` -- update card styles
- **Dependencies:** Phase 3 complete; update-item schema already exists
- **Complexity:** M
- **Ticket refs:** 7.5-7.6

### Slice 4.3: Places-lite

- **Description:** Curate real Place records and build honest places UX (list/cards, not fake map)
- **Files to create:**
  - Seed place records in `src/content/places/` -- terminals, translators, pharmacies, address-service offices (at least 10-15 real places)
  - `src/components/ui/PlaceCard.tsx` -- place card component
  - `src/features/routes/RelatedPlacesBlock.tsx` -- block for guide pages showing related places
- **Files to modify:**
  - Guide pages that reference places (terminals, address-registration) -- add `related_place_ids` or inline references
  - `scripts/build-search-index.impl.ts` -- include place records in search index
- **Dependencies:** Place schema exists (`src/lib/schemas/place.ts`); loadValidatedPlaces exists
- **Complexity:** M
- **Ticket refs:** 7.7-7.9

### Slice 4.4: Analytics Events (Plausible)

- **Description:** Instrument core funnel events per PRD Section 24
- **Files to create:**
  - `src/lib/analytics/track-event.ts` -- thin wrapper around Plausible custom events
- **Files to modify:**
  - `src/features/home/HomePage.tsx` -- `home_entry_point_clicked`
  - `src/features/routes/page-type-templates.tsx` or guide/hub templates -- `content_page_viewed`
  - `src/app/[locale]/start/page.tsx` or `StartOnboardingFlow.tsx` -- `onboarding_started`, `onboarding_completed`
  - `src/app/[locale]/dashboard/page.tsx` -- `dashboard_viewed`
  - `src/features/dashboard/DashboardNextBestAction.tsx` -- `next_action_clicked`
  - Search page -- `search_used`
- **Dependencies:** Plausible already integrated (env-gated); just needs event calls
- **Complexity:** M
- **Ticket ref:** 8.7

### Slice 4.5: SEO Metadata + Sitemap

- **Description:** Add proper `<meta>` tags, Open Graph, and sitemap.xml
- **Files to create:**
  - `src/app/sitemap.ts` -- Next.js sitemap generation from content pages
  - `src/app/robots.ts` -- robots.txt
- **Files to modify:**
  - `src/app/layout.tsx` -- default metadata
  - Hub/guide page.tsx files -- per-page metadata from frontmatter (title, summary)
- **Dependencies:** Content pages exist with proper frontmatter
- **Complexity:** M

### Slice 4.6: Dashboard Enhancement (Alerts, Quick Actions, Updates-for-you)

- **Description:** Add remaining dashboard blocks per UI_HANDOFF_SPEC Section 6: alerts block, quick actions block, updates-for-you block
- **Files to create:**
  - `src/features/dashboard/DashboardAlertsBlock.tsx` -- alerts based on user state (stay days warning, etc.)
  - `src/features/dashboard/DashboardQuickActions.tsx` -- quick action cards
  - `src/features/dashboard/DashboardUpdatesBlock.tsx` -- recent updates relevant to user
- **Files to modify:**
  - `src/app/[locale]/dashboard/page.tsx` -- add new blocks
  - `src/app/globals.css` -- dashboard block styles
- **Dependencies:** Update items exist (Slice 4.2); stay calculator logic exists
- **Complexity:** M
- **Ticket refs:** 4.6-4.8

### Slice 4.7: Performance Sanity Check

- **Description:** Lighthouse audit, bundle size check, Core Web Vitals on mobile
- **Files to modify:** Optimize as needed (image sizes, lazy loading, code splitting)
- **Dependencies:** All Phase 4 features complete
- **Complexity:** S

---

## 4. Phase 5 Plan (QA, release readiness)

### 5.1 Responsive QA Checklist
- Test all must-launch pages on: iPhone SE (375px), iPhone 14 (390px), iPad (768px), Desktop (1280px+)
- Verify: stacked layouts on mobile, tappable targets (min 44px), readable text, no horizontal overflow
- Home page: hero, entry cards, quick tools responsive behavior
- Dashboard: NBA card, checklist, alerts on mobile
- Guide pages: step-by-step, source blocks, related pages on mobile
- **Ticket ref:** 18.1

### 5.2 Trust/Source Block QA
- Every sensitive page (documents/\*, payments/\*, transport/\*) renders SourceBlock, LastVerifiedNote, WhatMayVaryNote
- Source records display correct confidence level, type, link
- Pages without sources show appropriate fallback (not broken UI)
- **Ticket ref:** 18.3

### 5.3 Navigation/Routing QA
- All 32+ IA routes resolve (no 404 on any defined route)
- `/transport/airport` redirects to `/newcomer/airport-to-city`
- Mobile drawer navigation links all work
- Breadcrumb / back navigation makes sense
- Locale switcher preserves current page
- **Ticket ref:** 18.4

### 5.4 Security/Privacy Review
- Guest blob in localStorage: no PII beyond onboarding answers; 90-day TTL works
- No secrets in client bundle (verify `NEXT_PUBLIC_*` vars are non-secret only)
- Sentry `sendDefaultPii: false` confirmed
- Plausible: no cookie-based tracking; privacy-safe
- Forms (if any in launch): CSRF, input validation
- **Blocks LAG:** [OPEN_ITEMS.md](docs/00_ai_context/OPEN_ITEMS.md) "Legal / privacy (prod)" gate must close

### 5.5 Analytics Smoke Tests
- Verify Plausible script loads in preview/staging
- Trigger each instrumented event, confirm it appears in Plausible dashboard
- Verify Sentry captures errors in staging
- **Ticket ref:** 18.5

### 5.6 Content Completeness Review
- Audit every must-launch route for: substantive content (not placeholder), working cross-links, source records on sensitive pages
- **Ticket ref:** 18.6

### 5.7 Checklist State QA
- Complete onboarding with different profiles, verify checklist filters correctly
- Verify prerequisite chain (address-registration -> social-card -> bank-account)
- Verify NBA changes based on onboarding answers
- **Ticket ref:** 18.2

### 5.8 Release Checklist Items
- [ ] All launch-blocker bugs triaged and fixed
- [ ] Known issues documented with owner + mitigation
- [ ] Rollback procedure documented and tested once
- [ ] README up to date (how to run, deploy, where docs are)
- [ ] HANDOFF_NOTES current for post-launch owner

### 5.9 Bug Triage Process
- P0 (launch-blocker): broken navigation, data loss, security issue, factually wrong sensitive content
- P1 (should fix before launch): broken cross-links, missing source blocks, layout breaks on common devices
- P2 (can ship with): cosmetic issues, minor copy issues, edge-case layout quirks
- Waivers for P0/P1 require documented owner + mitigation

---

## 5. LAG Criteria (from ROADMAP_MASTER Section 7)

The following must ALL be true before issuing GO:

- [ ] **Scope:** Must-launch + agreed launch-adjacent items deployed to staging; matches Section 6 contract
- [ ] **Defects:** No open launch-blocker bugs; waivers documented for any P0/P1 carryover
- [ ] **Trust:** Source + last verified + variance present on sensitive pages per specs; Phase 0A governance satisfied
- [ ] **Privacy and security:** Guest data, analytics, forms meet agreed policy; secrets not exposed client-side; baseline security checklist done
- [ ] **Observability:** Error monitoring (Sentry) + structured logging live in staging; production config ready
- [ ] **Analytics:** Critical events verified end-to-end in non-prod; production Plausible domain + Sentry DSN ready
- [ ] **Rollback:** Documented rollback or fast revert exercised once
- [ ] **Continuity:** README + doc entry path current; handoff notes for post-launch owner

**Pre-LAG gates from OPEN_ITEMS.md that must close:**
- [ ] Content governance names assigned (sensitive page owner + reviewer)
- [ ] Legal / privacy sign-off for localStorage, Plausible, Sentry, any forms
- [ ] Sentry + Plausible production project DSNs/domains created
- [ ] Housing/casino confirmed post-launch (or promoted with ops/legal readiness documented)

**Output:** Explicit GO (with date, version) or NO-GO with reasons and remediation steps.

---

## 6. Phase 6 Plan (production deployment)

### 6.1 Vercel Production Setup
- Create Vercel project linked to repo (if not already)
- Configure production environment variables:
  - `SENTRY_DSN` / `NEXT_PUBLIC_SENTRY_DSN` (production project)
  - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (production domain)
  - Any form endpoint secrets (if forms ship)
- Configure build settings: `npm run build` (includes prebuild for search-index)

### 6.2 Environment Separation
- **Preview:** Vercel Preview deployments on PRs -- staging equivalent
- **Production:** Vercel Production on `main` branch merges (or manual promotion)
- Separate Sentry projects (or environments) for preview vs production
- Separate Plausible domains or use staging exclusion

### 6.3 CI/CD Deploy Path
- Existing CI (`.github/workflows/ci.yml`): lint, test, build on PRs -- **no changes needed**
- Vercel auto-deploys on merge to `main` for production
- Preview deploys on PR creation for staging review
- Add optional manual deploy trigger if needed for rollback scenarios

### 6.4 Monitoring and Alerts
- Sentry: configure alert rules for error spikes (email notification)
- Plausible: verify production data flowing
- Vercel: enable build failure notifications
- Optional: Vercel Speed Insights for Core Web Vitals monitoring

### 6.5 Rollback Plan
- Vercel supports instant rollback to previous deployment
- Document rollback procedure: Vercel dashboard -> Deployments -> promote previous
- Test rollback once in preview environment before launch

### 6.6 DNS/Domain
- Configure custom domain in Vercel project settings
- Set up DNS records (CNAME or A record per Vercel docs)
- Verify TLS certificate auto-provisioned
- Test domain resolution before announcing launch

---

## 7. Phase 7 Plan (post-launch stabilization)

### 7.1 Triage Rhythm
- **Daily (week 1-2):** Check Sentry for new errors; check Plausible for traffic anomalies
- **Twice weekly (week 3-4):** Review error trends, funnel metrics, content feedback
- **Weekly (month 2+):** Standard triage cadence

### 7.2 Content Freshness Cadence
- Per PHASE_0_DECISION_RECORD Section 3.5 governance: 90-day review cycle for sensitive pages, 14-day for critical (residency/payments)
- Set calendar reminders for first review dates based on `last_verified_at` in content
- Track which pages are approaching staleness threshold

### 7.3 Performance Monitoring
- Weekly Lighthouse audits on key pages (Home, Dashboard, top guide pages)
- Monitor Vercel build times and function cold starts
- Watch search-index.json size as content grows

### 7.4 Bug Response Process
- P0 (site down, data loss, security): immediate fix, hotfix merge, monitor
- P1 (broken journey, wrong info): fix within 48 hours
- P2 (cosmetic, minor): batch into weekly releases
- Post-fix: update HANDOFF_NOTES, run doc sync protocol if meaningful change

### 7.5 Stability Gate for Phase 8
- Criteria: no P0 bugs for 2 weeks, P1 backlog under control, funnel metrics stable, content staleness process working
- Retrospective on MVP contract: what worked, what to improve for next cycle

---

## 8. Risk Register

### R1: Content Lag Risk
- **Risk:** Content authoring falls behind code readiness, delaying Phase 3 exit
- **Likelihood:** Medium (all pipeline code is done; this is pure authoring)
- **Impact:** High (Phase 3 exit blocked)
- **Mitigation:** Content slices are parallelizable and small; AI-assisted drafting reduces authoring time; no code dependencies between content slices

### R2: Trust/Legal Review Bottleneck
- **Risk:** Sensitive pages (residency, payments, transport) need human review but no governance names assigned yet (OPEN_ITEMS.md gate)
- **Likelihood:** High (gate is currently open)
- **Impact:** High (blocks LAG)
- **Mitigation:** Assign governance names as first action; sensitive content can be drafted now and reviewed incrementally; documents section already sets the pattern

### R3: Test Coverage Gaps
- **Risk:** 233 tests cover logic and schemas but may miss integration issues (e.g., content loading + rendering in pages)
- **Likelihood:** Low-Medium
- **Impact:** Medium (bugs found late in QA)
- **Mitigation:** Phase 5 includes manual QA on all routes; add smoke tests for route resolution if coverage feels thin

### R4: Performance Unknowns
- **Risk:** search-index.json grows large as content expands; client-side search may lag on mobile
- **Likelihood:** Low (corpus is small for MVP)
- **Impact:** Medium (poor mobile experience)
- **Mitigation:** Phase 4 includes performance sanity check; FlexSearch is lightweight; index can be split by type if needed

### R5: Single-Point-of-Failure Risks
- **Risk:** One developer + AI pair means no redundancy for incident response post-launch
- **Likelihood:** Medium
- **Impact:** High (if developer unavailable during incident)
- **Mitigation:** Document runbook thoroughly in Phase 6; Vercel instant rollback requires only dashboard access; consider identifying a backup person for critical first week

### R6: Home Page Complexity
- **Risk:** Home page is the only Phase 3 slice requiring significant new component code (not just content); may surface design decisions not fully specified
- **Likelihood:** Medium
- **Impact:** Medium (delays Phase 3 exit)
- **Mitigation:** Start Home page components early (Group F can begin skeleton while content groups proceed); use existing primitives (Card, SectionHeader, Button); keep first version simple

### R7: Open Items Not Closed Before LAG
- **Risk:** Legal/privacy sign-off, governance names, production Sentry/Plausible projects remain open
- **Likelihood:** Medium-High
- **Impact:** High (blocks production launch)
- **Mitigation:** Track these as explicit pre-LAG gates; escalate early if any gate is stuck; some can be closed in parallel with Phase 4-5 work

---

## 9. Milestone Timeline (estimated)

Assumes one developer + AI pair working full-time. Estimates in working days.

| Phase | Scope | Estimated Days | Cumulative |
|-------|-------|---------------|------------|
| **Phase 3 remaining** | 15 guides, 4 hubs, Home page, FAQ, cross-links, editorial review | **6-8 days** | 6-8 |
| **Phase 4** | Search v1, updates, places-lite, analytics, SEO, dashboard enhancement, perf check | **8-10 days** | 14-18 |
| **Phase 5** | QA (responsive, trust, nav, security, analytics), bug fixes, release checklist | **4-5 days** | 18-23 |
| **LAG** | Human review + sign-off (can overlap with Phase 5 tail) | **1-2 days** | 19-25 |
| **Phase 6** | Vercel prod setup, env separation, monitoring, DNS, rollback test | **2-3 days** | 21-28 |
| **Total to production** | | **~21-28 days** | |
| **Phase 7** | Post-launch stabilization (ongoing, first 2-4 weeks) | ongoing | |

**Critical path:** Phase 3 content authoring -> Phase 4 search + analytics -> Phase 5 QA -> LAG -> Phase 6 deploy

**Parallelism opportunities:**
- Phase 3 content groups A-E are fully parallelizable
- OPEN_ITEMS gates (governance names, legal/privacy) can close in parallel with Phase 3-4 work
- Sentry/Plausible production project setup can happen during Phase 4
- Phase 5 QA can begin on completed sections while Phase 4 tail finishes

---

## 10. Documentation Sync Points

### Mandatory full doc sync (not just per-slice NEXT_ACTIONS updates)

**After Phase 3 exit:**
- `PROJECT_STATE.md` -- Phase 3 complete, Phase 4 active
- `CURRENT_PHASE.md` -- transition to Phase 4
- `CURRENT_FOCUS.md` -- Phase 4 scope
- `ROADMAP_STATUS.md` -- Phase 3 done with date
- `HANDOFF_NOTES.md` -- all Phase 3 shipped slices
- `NEXT_ACTIONS.md` -- Phase 4 track
- `FOLDER_STRUCTURE.md` -- update if new feature directories created (e.g., `features/home/`, `features/search/`)
- `CONTENT_SCHEMA.md` -- if any schema changes

**After Phase 4 exit:**
- Same set as above, transitioning to Phase 5
- Additionally: `ENGINEERING_ARCHITECTURE.md` Section 4 -- update search implementation details if architecture evolved

**After Phase 5 / pre-LAG:**
- Full alignment of all docs
- Create `RELEASE_PLAN.md` if not yet created -- LAG checklist, deploy steps, rollback procedure, known issues list
- `OPEN_ITEMS.md` -- verify all pre-launch gates closed or waived

**After Phase 6 (production live):**
- `ROADMAP_STATUS.md` -- Phase 6 done
- `PROJECT_STATE.md` -- production status
- `README.md` -- update with production URL, deploy instructions
- `HANDOFF_NOTES.md` -- post-launch owner context

**Incremental sync (per-slice, lightweight):**
- After each content group (A-E): update `NEXT_ACTIONS.md` shipped list
- After Home page (F): update `FOLDER_STRUCTURE.md` + `NEXT_ACTIONS.md`
- After each Phase 4 slice: update `NEXT_ACTIONS.md`
