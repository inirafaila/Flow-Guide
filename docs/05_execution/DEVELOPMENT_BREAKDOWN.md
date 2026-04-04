---
owner: engineering
status: active
last_updated: 2026-04-04
source_of_truth: true
---

# Development Breakdown / Ticket Plan
## MVP وب‌اپ راهنمای تازه‌واردها و مهاجران در ارمنستان

---

## Canonical roadmap phases (authority)

**Authoritative phase names and sequencing** live in [`docs/01_strategy/ROADMAP_MASTER.md`](../01_strategy/ROADMAP_MASTER.md) (`Phase 0A`, `Phase 0B`, `Phase 1` … `Phase 9`, LAG). This document keeps **epic and ticket IDs (1.x–8.x, 18.x)** for traceability; schedule work using the **master roadmap**, not legacy labels in §4 below.

| Master roadmap phase | Scope (summary) | Epics / tickets in *this* doc |
|----------------------|-----------------|-------------------------------|
| **0A / 0B** | MVP contract + technical architecture lock | Closed for execution; see [`PHASE_0_DECISION_RECORD.md`](../04_engineering/PHASE_0_DECISION_RECORD.md) |
| **Phase 1** | Engineering + content **foundation** only: app shell, IA **route skeleton**, schema-shaped **placeholder** pages, git Markdown + **Zod**, **`search-index.json`** in prebuild, env pattern, minimal **CI**, observability **hooks** (env-gated Sentry + dev-safe Plausible)—**no** NBA, checklist, or **guest behavior** | **1** (partial), **2** (partial), **5** (5.1 + template **shells**), **7** (**7.4** index model + **7.1** page stub only; not grouped UX) |
| **Phase 2** | Onboarding, guest state, dashboard, NBA v1, checklist v1, trust UI wired to real behavior | **3**, **4**; **5.7–5.9** when behavior is real, not static-only |
| **Phase 3** | Must-launch guides/hubs and journey copy | **6** (primary) |
| **Phase 4** | Grouped **client** search UX, places-lite, updates surfacing, analytics/SEO hardening | **7** (**7.2–7.3**, **7.5–7.9**), **8** (e.g. **8.7**); aligns with [`ENGINEERING_ARCHITECTURE.md`](../04_engineering/ENGINEERING_ARCHITECTURE.md) §4 |
| **Phase 5+ / LAG** | QA, release readiness, launch approval | **18.x** |

**Search split:** **Build-time index** (`search-index.json` + validation) = **Phase 1**. **Client grouped search results UI** = **Phase 4**. Must-launch search remains a **launch-bundle** requirement ([`PHASE_0_DECISION_RECORD.md`](../04_engineering/PHASE_0_DECISION_RECORD.md)); it is **not** implied to be finished in Phase 1.

**§4 (فازبندی کلان)** uses an older internal “Phase 0–4” sketch. Those labels **do not** match `ROADMAP_MASTER` — use the table above when prioritizing.

---

## Phase 1 execution status (repo reality, 2026-04)

Aligned with [`docs/00_ai_context/CURRENT_PHASE.md`](../00_ai_context/CURRENT_PHASE.md), [`CURRENT_FOCUS.md`](../00_ai_context/CURRENT_FOCUS.md), [`PROJECT_STATE.md`](../00_ai_context/PROJECT_STATE.md).

### Shipped (Phase 1 — partial)

- **Routing + i18n:** IA routes under `src/app/[locale]/`; `next-intl` + `localePrefix: "never"` (URLs unprefixed); `NEXT_LOCALE` + header locale switcher; `/transport/airport` → `/newcomer/airport-to-city` via **`PHASE1_IA_AIRPORT_REDIRECT`** in **`src/middleware.ts`**; **`/housing/request`** + **`/housing/request/success`** placeholder shells per **`IA_SPEC.md`** §6.5 (2026-04-03). **IA §6.1–6.9 regression guard:** **`src/lib/ia-phase1-routes.ts`** + **`ia-phase1-routes.test.ts`** (2026-04-04).
- **Responsive shell + mobile nav (2026-04-04):** **`src/components/shell/SiteHeaderChrome.tsx`** + **`SiteHeader.tsx`** + **`globals.css`** — drawer + backdrop under **48rem**; desktop inline nav; Epic **2.3** baseline without Phase 2 behavior.
- **Shared UI baseline (2026-04-04):** **`globals.css`** design-token consolidation (`--space-*`, `--radius-*`, `--text-*`, `--surface-muted`); **`src/components/ui/`** — **`Button`**, **`Card`**, **`SectionHeader`** + **`.fg-*`** styles; shell menu + **`LocaleSwitcher`** and **`page-type-templates`** blocks use primitives. Epic **1.4** / **2.5** partial closure; **no** product-card or trust components.
- **Content pipeline:** `src/content/**/*.md` + YAML; build-time **Zod** validation for **pages** / **FAQ** (prebuild search index); invalid frontmatter **fails** prebuild.
- **Source Record contract (2026-04-04):** **`src/lib/schemas/source-record.ts`** (§10); **`parseMarkdownSourceRecord`** in **`parse-md.ts`**; **`load-sources.ts`** → **`loadValidatedSourceRecords`**; dir **`src/content/sources/`**. Contract-only — **not** wired to search build, pages, or trust UI.
- **Place contract (2026-04-04):** **`src/lib/schemas/place.ts`** (§12); **`parseMarkdownPlace`** in **`parse-md.ts`**; **`load-places.ts`** → **`loadValidatedPlaces`**; dir **`src/content/places/`**. Contract-only — **not** wired to search build, routes, map, or pages.
- **Checklist + update contracts (2026-04-04):** **`src/lib/schemas/checklist-item.ts`**, **`update-item.ts`**; **`parseMarkdownChecklistItem`** / **`parseMarkdownUpdateItem`**; **`load-checklist-and-updates.ts`**; dirs **`src/content/checklist-items/`**, **`src/content/updates/`**. Contract-only — **not** wired to search build or product UI.
- **Search index (Phase 1 only):** `scripts/build-search-index.mjs` → `tsx` / `build-search-index.impl.ts` → validated `public/search-index.json`.
- **`/search`:** placeholder only (e.g. fetch/count) — **not** Phase 4 grouped UX; **utility-shaped** structural template + existing stub.
- **Page template shells (Phase 1):** distinct **structural** placeholders for **hub / guide / calculator / utility / service-form** routes via **`src/features/routes/page-type-templates.tsx`** + **`RoutePageBanner`**; **`/documents/stay-calculator`** → calculator shell; **`/housing/request`** → service-form shell (via **`housing/[slug]`**); **`/housing/request/success`** → follow-up shell. Generic **`RoutePlaceholder`** only for **`/`**, **`/start`**, **`/dashboard`**.
- **CI:** GitHub Actions on PRs to `main`: `npm ci`, `npm run lint`, `npm run test`, `npm run build`.
- **Observability:** **`@sentry/nextjs`** env-gated (root **`sentry.*.config.ts`**, **`src/instrumentation.ts`**); Plausible **dev-safe** (no default load in **`next dev`** without opt-in env). **Structured logging (minimal):** **`src/lib/observability/logger.ts`** + instrumentation **`logInfo`** (2026-04-04). Further: release/source maps, funnel events = **later** slices.
- **Ticket pointers (approximate):** **1.1–1.3**, **1.4** (partial, 2026-04-04), **2.1–2.2** (locale switch **shipped**, not placeholder-only), **2.4–2.5** (partial, 2026-04-04 primitives), **5.1** (partial), **7.4** (partial), **7.1** (stub until Phase 4 UX).

### Remaining before Phase 1 exit

**IA_SPEC.md** §6.1–6.9 page set + airport redirect covered by automated guard (`ia-phase1-routes`); **Checklist Item** + **Update Item** bounded Zod + canonical content dirs shipped (**2026-04-04**); **Source Record** + **Place** bounded Zod + **`src/content/sources/`** / **`src/content/places/`** shipped (**2026-04-04**); further types/Zod toward [`DATA_CONTENT_MODEL_SPEC.md`](../02_product/DATA_CONTENT_MODEL_SPEC.md) (e.g. Epic **1.3** enums) as needed; **Epic 1.4** / **Epic 2.4–2.5** partially addressed (**2026-04-04** minimal tokens + **`Button`/`Card`/`SectionHeader`** on shell/template placeholders only)—**no** Phase 2 **behavior**; local **lint / test / build** green; PR CI runs the same **lint / test / build**; Sentry/Plausible **env-gated wiring** + **minimal structured logging** shipped (2026-04-03 / 2026-04-04)—**later:** source maps / `withSentryConfig`, funnel events; **no** NBA/checklist **filtering** / guest **behavior** beyond contract stubs. Optional `?lang=` (deferred per `ENGINEERING_ARCHITECTURE.md` §7).

### Not Phase 1 (do not schedule as current implementation)

Epic **3–4** (Phase 2). Epic **6** substantive content (Phase 3). Epic **7** grouped search / places / updates as product-complete (Phase 4). Epic **8** forms and full analytics (Phase 4+; housing/casino default **post-launch** unless promoted — [`OPEN_ITEMS.md`](../00_ai_context/OPEN_ITEMS.md)).

---

## 1) هدف این سند

این سند برای تبدیل PRD، IA، Data Model و UI Handoff به یک برنامه اجرایی قابل ساخت نوشته شده است. هدف این است که تیم بتواند بدون ابهام بداند:
- چه چیزهایی باید ساخته شوند
- ترتیب ساخت چیست
- dependencyها کدام‌اند
- چه چیزهایی MVP واقعی‌اند و چه چیزهایی later
- برای Cursor و development execution چه ticketهایی باید تعریف شوند

این سند از زاویه **execution-first** نوشته شده است، نه از زاویه brainstorming.

---

## 2) اصول برنامه‌ریزی اجرا

### اصل 1: MVP باید کوچک ولی واقعی بماند
ما قرار نیست از روز اول همه قابلیت‌های roadmap را بسازیم. نسخه اول باید روی این promise متمرکز بماند:

**کاربر newcomer سریع شروع کند، مسیرش را بفهمد، قدم بعدی را ببیند، و برای حساس‌ترین کارها راهنمای قابل اعتماد بگیرد.**

### اصل 2: اول foundation، بعد feature surface
تا وقتی shell، template، data contract و state logic آماده نشده، ساختن pageهای زیاد فقط شلوغی می‌سازد.

### اصل 3: reusable system قبل از page explosion
باید اول templateها و componentهای قابل reuse ساخته شوند، بعد pageها روی آن‌ها سوار شوند.

### اصل 4: personalization سبک ولی واقعی
Dashboard و onboarding باید useful باشند، ولی نباید در MVP به سیستم پیچیده workflow تبدیل شوند.

### اصل 5: service layer فقط در حد lightweight
housing request و casino referral فعلاً فقط در حد form و endpoint ساده می‌آیند.

---

## 3) ساختار اجرایی کلی

برنامه ساخت MVP به 8 epic تقسیم می‌شود:

1. Product Foundation
2. Core Navigation + App Shell
3. Onboarding + Guest State
4. Dashboard + Checklist Logic
5. Content System + Page Templates
6. Core Content Pages
7. Search + Places-lite + Updates
8. Lightweight Service Forms + Instrumentation

### Epic → master roadmap phase (quick tags)

| Epic | Master roadmap phase | Notes |
|------|----------------------|--------|
| **1** | Phase 1 | Foundation; partial shipped |
| **2** | Phase 1 | Shell/nav; partial shipped |
| **3** | **Phase 2** | Onboarding + guest — **not** Phase 1 implementation |
| **4** | **Phase 2** | Dashboard + checklist logic |
| **5** | Phase 1 (schema + **shells**); **5.7–5.9** behavior = Phase 2 | Templates before content explosion |
| **6** | **Phase 3** (+ calculator **logic** touches Phase 2) | Core content pages |
| **7** | Phase 1: **7.1** stub + **7.4** index; **Phase 4:** **7.2–7.3**, **7.5–7.9** | Search UX / updates / places-lite |
| **8** | **Phase 4** (e.g. **8.7**); forms default post-launch | See `OPEN_ITEMS` / Phase 0 record |

---

## 4) فازبندی کلان (legacy internal sketch — do not equate to ROADMAP_MASTER)

**Warning:** The following “Phase 0–4” blocks are **historical planning shorthand**. They **overlap** master **Phase 1–4** differently (e.g. old “Phase 1” here included onboarding/dashboard shells, which in `ROADMAP_MASTER` are **Phase 2**). For execution, use **`ROADMAP_MASTER`** + **Canonical roadmap phases** at the top of this file.

### Legacy Phase 0 — Setup & Alignment
خروجی:
- repo structure
- routing strategy
- design token basics
- data contracts baseline

### Legacy Phase 1 — Core Product Skeleton (historical label)
خروجی:
- app shell
- navigation
- page templates
- onboarding shell
- dashboard shell

### Legacy Phase 2 — MVP Core Experience
خروجی:
- Home
- Onboarding
- Dashboard usable
- content template usable
- 8 صفحه حیاتی live

### Legacy Phase 3 — Practical Utility Layer
خروجی:
- Search basic
- updates
- places-lite blocks
- additional core pages

### Legacy Phase 4 — Lightweight Service Layer + Polish
خروجی:
- housing request form
- casino referral form
- analytics
- QA / polish / release prep

---

## 5) Epic 1 — Product Foundation

**Master roadmap:** **Phase 1** (foundation); partial shipped — see **Phase 1 execution status** at top.

### هدف epic
ساخت foundation فنی و محصولی که بقیه چیزها روی آن سوار شوند.

### خروجی‌ها
- project structure
- route map base
- type system / schema base
- component naming system
- global constants and enums

### Ticket 1.1 — Define project structure
**نوع:** engineering  
**اولویت:** P0  
**dependency:** none

**خروجی:**
- پوشه‌بندی app/pages/components/lib/types/content/data
- convention برای pageها، templateها و blocks

### Ticket 1.2 — Define routing baseline
**نوع:** engineering  
**اولویت:** P0

**خروجی:**
- پیاده‌سازی route skeleton بر اساس IA
- routeهای خالی برای core pages

### Ticket 1.3 — Define shared types and enums
**نوع:** engineering  
**اولویت:** P0

**خروجی:**
- typeهای page type
- category
- urgency
- user state enums
- checklist status enums

### Ticket 1.4 — Set design token baseline
**نوع:** design + frontend  
**اولویت:** P0

**خروجی:**
- spacing scale
- typography scale
- color tokens پایه
- radius/shadow tokens

---

## 6) Epic 2 — Core Navigation + App Shell

**Master roadmap:** **Phase 1** (shell/nav); partial shipped — locale switcher and shell live; mobile nav / search trigger may still be stub.

### هدف epic
ساخت پوسته اصلی اپ که همه صفحات داخل آن رندر شوند.

### Ticket 2.1 — Build app shell layout
**نوع:** frontend  
**اولویت:** P0

**خروجی:**
- main layout
- content container
- footer placeholder
- responsive structure

### Ticket 2.2 — Build desktop header/navigation
**نوع:** frontend  
**اولویت:** P0

**خروجی:**
- top navigation
- CTA buttons
- language switch (**Phase 1 shipped:** header switcher + `NEXT_LOCALE` cookie; optional `?lang=` deferred per `ENGINEERING_ARCHITECTURE.md`)
- search trigger (may remain stub until Phase 4 grouped search UX)

### Ticket 2.3 — Build mobile navigation
**نوع:** frontend  
**اولویت:** P0

**خروجی:**
- hamburger menu
- mobile menu sheet/drawer
- CTA visibility on mobile

### Ticket 2.4 — Build reusable section header component
**نوع:** frontend  
**اولویت:** P1

### Ticket 2.5 — Build button/card primitives
**نوع:** frontend  
**اولویت:** P0

**خروجی:**
- primary button
- secondary button
- basic card
- linked card

---

## 7) Epic 3 — Onboarding + Guest State

**Master roadmap:** **Phase 2** — not active Phase 1 implementation work.

### هدف epic
ساخت guided setup و state موقت کاربر بدون ثبت‌نام.

### Ticket 3.1 — Build onboarding step framework
**نوع:** frontend  
**اولویت:** P0

**خروجی:**
- step renderer
- progress bar
- next/back behavior

### Ticket 3.2 — Implement onboarding question steps
**نوع:** frontend  
**اولویت:** P0

**خروجی:**
- language step
- nationality step
- location status step
- primary goal step
- current status step

### Ticket 3.3 — Implement guest session state model
**نوع:** frontend + backend/light data layer  
**اولویت:** P0

**خروجی:**
- temporary user state
- session-based persistence
- expiry strategy

### Ticket 3.4 — Build onboarding result summary screen
**نوع:** frontend  
**اولویت:** P0

**خروجی:**
- summary card
- 3 تا 5 next steps preview
- CTA to dashboard
- CTA continue as guest
- CTA save path

### Ticket 3.5 — Map onboarding answers to initial user state
**نوع:** product logic + frontend/backend  
**اولویت:** P0

**خروجی:**
- rules برای dashboard emphasis
- rules برای next action
- rules برای checklist filtering اولیه

---

## 8) Epic 4 — Dashboard + Checklist Logic

**Master roadmap:** **Phase 2** — not active Phase 1 implementation work.

### هدف epic
ساخت یک dashboard ساده ولی useful بر اساس state کاربر.

### Ticket 4.1 — Build dashboard shell
**نوع:** frontend  
**اولویت:** P0

**خروجی:**
- page structure
- sections placeholders
- responsive layout

### Ticket 4.2 — Build residency status card
**نوع:** frontend  
**اولویت:** P0

**خروجی:**
- status variants
- days remaining UI
- link to stay calculator

### Ticket 4.3 — Build next best action card
**نوع:** frontend + product logic  
**اولویت:** P0

**خروجی:**
- primary action display
- reason text
- secondary actions

### Ticket 4.4 — Build checklist item row component
**نوع:** frontend  
**اولویت:** P0

**خروجی:**
- not-started / in-progress / done / revisit states
- status chips
- optional urgency marker

### Ticket 4.5 — Implement checklist filtering logic
**نوع:** product logic + backend/front  
**اولویت:** P0

**خروجی:**
- relevance filtering
- prerequisite filtering
- sort by urgency and default order

### Ticket 4.6 — Build alerts block
**نوع:** frontend  
**اولویت:** P1

### Ticket 4.7 — Build quick actions block
**نوع:** frontend  
**اولویت:** P1

### Ticket 4.8 — Build updates-for-you block
**نوع:** frontend  
**اولویت:** P1

### Ticket 4.9 — Build guest vs signed-in dashboard states
**نوع:** frontend  
**اولویت:** P1

---

## 9) Epic 5 — Content System + Page Templates

**Master roadmap:** **Phase 1** for schema (**5.1**) and **template shells** (**5.2–5.6**); **5.7–5.9** trust UI wired to real data/rules = **Phase 2**.

### هدف epic
ساخت موتور نمایش pageها و templateهای reusable.

### Ticket 5.1 — Define content page schema
**نوع:** content model + engineering  
**اولویت:** P0

**خروجی:**
- schema for hub/guide/calculator/utility/service-form

### Ticket 5.2 — Build hub page template
**نوع:** frontend  
**اولویت:** P0

**خروجی:**
- intro block
- top tasks block
- related guides block
- quick tools block
- optional updates block

### Ticket 5.3 — Build guide page template
**نوع:** frontend  
**اولویت:** P0

**خروجی:**
- quick summary
- step-by-step
- requirements
- costs/time
- warnings
- related block

### Ticket 5.4 — Build calculator page template
**نوع:** frontend  
**اولویت:** P1

### Ticket 5.5 — Build utility page template
**نوع:** frontend  
**اولویت:** P1

### Ticket 5.6 — Build service form template
**نوع:** frontend  
**اولویت:** P1

### Ticket 5.7 — Build source block component
**نوع:** frontend  
**اولویت:** P0

**خروجی:**
- single source view
- multi-source view
- confidence / type label

### Ticket 5.8 — Build last verified block
**نوع:** frontend  
**اولویت:** P0

### Ticket 5.9 — Build what may vary block
**نوع:** frontend  
**اولویت:** P0

### Ticket 5.10 — Build related pages/tools/places block
**نوع:** frontend  
**اولویت:** P1

---

## 10) Epic 6 — Core Content Pages

**Master roadmap:** **Phase 3** (must-launch copy and journeys); stay-calculator **behavior** aligns with Phase 2 product logic where applicable.

### هدف epic
ساخت صفحاتی که MVP بدون آن‌ها ارزش واقعی ندارد.

### اولویت ساخت صفحات
این صفحات باید به ترتیب impact و dependency ساخته شوند.

### Ticket 6.1 — Build Home page
**نوع:** frontend + content  
**اولویت:** P0

### Ticket 6.2 — Build Newcomer hub
**نوع:** frontend + content  
**اولویت:** P0

### Ticket 6.3 — Build First Week guide
**نوع:** content + frontend  
**اولویت:** P0

### Ticket 6.4 — Build Airport to City guide
**نوع:** content + frontend  
**اولویت:** P0

### Ticket 6.5 — Build Documents hub
**نوع:** frontend + content  
**اولویت:** P0

### Ticket 6.6 — Build Stay Calculator page
**نوع:** frontend + light logic  
**اولویت:** P0

### Ticket 6.7 — Build Address Registration guide
**نوع:** content + frontend  
**اولویت:** P0

### Ticket 6.8 — Build Social Card guide
**نوع:** content + frontend  
**اولویت:** P0

### Ticket 6.9 — Build Temporary Residency guide
**نوع:** content + frontend  
**اولویت:** P0

### Ticket 6.10 — Build Housing hub
**نوع:** frontend + content  
**اولویت:** P0

### Ticket 6.11 — Build Owner vs Agency guide
**نوع:** content + frontend  
**اولویت:** P0

### Ticket 6.12 — Build Rental Checklist guide
**نوع:** content + frontend  
**اولویت:** P1

### Ticket 6.13 — Build Work hub
**نوع:** frontend + content  
**اولویت:** P0

### Ticket 6.14 — Build Quick Income guide
**نوع:** content + frontend  
**اولویت:** P0

### Ticket 6.15 — Build Yandex Starter guide
**نوع:** content + frontend  
**اولویت:** P0

### Ticket 6.16 — Build Live Gaming guide
**نوع:** content + frontend  
**اولویت:** P0

### Ticket 6.17 — Build Payments hub
**نوع:** frontend + content  
**اولویت:** P0

### Ticket 6.18 — Build Terminals guide
**نوع:** content + frontend  
**اولویت:** P0

### Ticket 6.19 — Build Service Payments guide
**نوع:** content + frontend  
**اولویت:** P1

### Ticket 6.20 — Build Transport hub
**نوع:** frontend + content  
**اولویت:** P0

### Ticket 6.21 — Build Public Transport Payments guide
**نوع:** content + frontend  
**اولویت:** P0

### Ticket 6.22 — Build Daily Life hub
**نوع:** frontend + content  
**اولویت:** P1

### Ticket 6.23 — Build Essential Apps guide
**نوع:** content + frontend  
**اولویت:** P1

### Ticket 6.24 — Build FAQ page
**نوع:** content + frontend  
**اولویت:** P1

---

## 11) Epic 7 — Search + Places-lite + Updates

**Master roadmap split:** **Phase 1** — **7.1** (stub page) + **7.4** (build-time index / schema; partial shipped). **Phase 4** — **7.2–7.3** (grouped client search UX), **7.5–7.6** (updates), **7.7–7.9** (places-lite).

### هدف epic
افزودن utility layerی که usability و trust را بالا می‌برد.

### Ticket 7.1 — Build search page shell
**نوع:** frontend  
**اولویت:** P1

### Ticket 7.2 — Implement grouped search result UI
**نوع:** frontend  
**اولویت:** P1

### Ticket 7.3 — Build best match card
**نوع:** frontend  
**اولویت:** P1

### Ticket 7.4 — Define basic search indexing model
**نوع:** engineering/content model  
**اولویت:** P1

### Ticket 7.5 — Build updates page
**نوع:** frontend + content  
**اولویت:** P1

### Ticket 7.6 — Build update card component
**نوع:** frontend  
**اولویت:** P1

### Ticket 7.7 — Define places-lite schema
**نوع:** content model + engineering  
**اولویت:** P1

### Ticket 7.8 — Build related places block
**نوع:** frontend  
**اولویت:** P1

### Ticket 7.9 — Enable place-linked results in search
**نوع:** engineering + frontend  
**اولویت:** P2

---

## 12) Epic 8 — Lightweight Service Forms + Instrumentation

**Master roadmap:** **Phase 4** for **8.7** (analytics) and launch-adjacent instrumentation; housing/casino forms **default post-launch** unless promoted — see [`OPEN_ITEMS.md`](../00_ai_context/OPEN_ITEMS.md) and Phase 0 record.

### هدف epic
اضافه کردن حداقل service layer و analytics پایه.

### Ticket 8.1 — Build Housing Request page
**نوع:** frontend  
**اولویت:** P1

### Ticket 8.2 — Define Housing Request form schema
**نوع:** product + frontend/backend  
**اولویت:** P1

### Ticket 8.3 — Build Housing Request success state
**نوع:** frontend  
**اولویت:** P2

### Ticket 8.4 — Build Casino Referral form page
**نوع:** frontend  
**اولویت:** P2

### Ticket 8.5 — Define generic Request Submission model
**نوع:** engineering  
**اولویت:** P1

### Ticket 8.6 — Implement submission endpoint(s)
**نوع:** backend/light service layer  
**اولویت:** P1

### Ticket 8.7 — Add analytics event tracking
**نوع:** frontend + product analytics  
**اولویت:** P1

**رویدادها:**
- home_entry_point_clicked
- onboarding_started
- onboarding_completed
- dashboard_viewed
- next_action_clicked
- checklist_item_updated
- content_page_viewed
- source_block_opened
- search_used
- housing_request_submitted
- save_path_prompt_seen

### Ticket 8.8 — Add save path / account prompt trigger
**نوع:** frontend + product logic  
**اولویت:** P2

---

## 13) Dependency Map

**Execution gate:** Meet **Phase 1 exit** ([`CURRENT_PHASE.md`](../00_ai_context/CURRENT_PHASE.md)) before treating Epic **3–4** as active **implementation** work (they are **Phase 2** on the master roadmap). Ticket lists in §14 describe **launch bundle**, not “all in Phase 1.”

### Foundation dependencies
- Epic 1 باید قبل از همه شروع شود
- Epic 2 روی Epic 1 سوار می‌شود
- Epic 3 و Epic 5 بعد از Epic 1 و 2 شروع می‌شوند
- Epic 4 به Epic 3 و 5 وابسته است
- Epic 6 به Epic 5 وابسته است
- Epic 7 به Epic 5 وابسته است
- Epic 8 بعد از شکل‌گیری page templates و dashboard بهتر پیش می‌رود

### Critical chain
1. Product Foundation
2. App Shell
3. Onboarding + Guest State
4. Content Templates
5. Dashboard + Checklist
6. Core Pages
7. Search / Updates
8. Service Forms / Analytics

---

## 14) تعریف MVP Cut Line

برای اینکه scope کنترل شود، باید دقیقاً روشن باشد چه ticketهایی برای launch لازم‌اند.

**Master roadmap alignment:** §14.1–14.3 list tickets required for **launch / LAG** (product contract), **not** the Phase 1 engineering scope. **Implementation order** is **Phase 1 → 2 → 3 → 4 → 5** per [`ROADMAP_MASTER.md`](../01_strategy/ROADMAP_MASTER.md). A ticket can be must-launch and still belong to **Phase 3** (content) or **Phase 4** (search UX).

## 14.1 Must-launch tickets
این ticketها برای launch MVP ضروری‌اند:
- 1.1 تا 1.4
- 2.1 تا 2.5
- 3.1 تا 3.5
- 4.1 تا 4.5
- 5.1 تا 5.9
- 6.1 تا 6.18
- 6.20 تا 6.21

## 14.2 Strongly recommended before launch
- 4.6 تا 4.8
- 6.19
- 6.23
- 6.24
- 7.1 تا 7.6
- 8.7

## 14.3 Can slip to post-launch
- 4.9
- 5.10
- 7.7 تا 7.9
- 8.1 تا 8.6
- 8.8
- 6.12
- 6.22

---

## 15) Ticket Format پیشنهادی برای Cursor / PM execution

هر ticket بهتر است این ساختار را داشته باشد:

### Title
مثلاً: Build Address Registration Guide Page

### Type
frontend / backend / design / content / logic

### Priority
P0 / P1 / P2

### Description
این ticket چه چیزی را می‌سازد و چرا

### Inputs
به کدام سندها/اسپک‌ها وابسته است

### Acceptance Criteria
چه زمانی complete محسوب می‌شود

### Dependencies
به چه ticketهای دیگری وابسته است

### Notes
هر نکته اجرایی خاص

---

## 16) نمونه ticket کامل

## Ticket: Build Stay Calculator Page

**Type:** frontend + light logic  
**Priority:** P0

**Description:**
ساخت صفحه محاسبه‌گر روزهای اقامت برای نمایش وضعیت تقریبی روزهای باقی‌مانده، مخصوصاً برای سناریوهای حساس newcomer.

**Inputs:**
- PRD
- IA Spec
- Data Model Spec
- UI Handoff Spec

**Acceptance Criteria:**
- route صفحه فعال باشد
- صفحه از calculator template استفاده کند
- inputهای پایه قابل تکمیل باشند
- result state حداقل 3 وضعیت safe/watch/urgent داشته باشد
- source block و last verified دیده شوند
- از dashboard و quick tools قابل دسترسی باشد

**Dependencies:**
- Ticket 5.4
- Ticket 5.7
- Ticket 5.8

**Notes:**
در MVP logic می‌تواند simplified باشد ولی UI و trust layer باید کامل باشند.

---

## 17) نقش‌ها و owner typeها

برای اجرای تمیز، ticketها باید owner type داشته باشند:

### Owner types
- Product
- Design
- Frontend
- Backend
- Content
- QA

### نمونه mapping
- Product: rules, priority, acceptance
- Design: UI states, layouts, components
- Frontend: rendering, state, components
- Backend: data endpoints, submissions, persistence
- Content: page copy, blocks, sources
- QA: usability, responsive checks, regression

---

## 18) QA / Release Readiness Tickets

**Roadmap:** **Phase 5** (verification / release readiness) and LAG prep — not Phase 1 work.

### Ticket 18.1 — Responsive QA on core pages
**نوع:** QA  
**اولویت:** P1

### Ticket 18.2 — Checklist state QA
**نوع:** QA  
**اولویت:** P1

### Ticket 18.3 — Source block and trust layer QA
**نوع:** QA  
**اولویت:** P1

### Ticket 18.4 — Navigation and routing QA
**نوع:** QA  
**اولویت:** P1

### Ticket 18.5 — Analytics smoke test
**نوع:** QA + product  
**اولویت:** P1

### Ticket 18.6 — Content completeness review for launch pages
**نوع:** content + product  
**اولویت:** P1

---

## 19) Phase-gated execution order (canonical sequencing)

**Deprecated for scheduling:** The former “Sprint 1–6” list mixed **Phase 1** foundation with **Phase 2–4** tickets in parallel waves; that is **misleading** now that the repo follows [`ROADMAP_MASTER.md`](../01_strategy/ROADMAP_MASTER.md). Use **gates** below. Historical sprint bullets are archived at [§19.1 Legacy sprint reference (deprecated)](#191-legacy-sprint-reference-deprecated).

### Gate A — Phase 1 exit (current track)

- Close items in **Phase 1 execution status** (top of this doc): routes, Zod/content, `search-index.json`, CI, stubs, placeholder templates — **no** guest/NBA/checklist behavior.
- Epics **1–2** (remaining gaps), **5.1** + template shells **5.2–5.6** as placeholders, **7.4** + **7.1** stub only.

### Gate B — Phase 2

- Epics **3–4**; trust blocks **5.7–5.9** when wired to real state/logic.

### Gate C — Phase 3

- Epic **6** must-launch pages and copy (see §14.1).

### Gate D — Phase 4

- Epic **7:** **7.2–7.3** grouped search UI, **7.5–7.6** updates, **7.7–7.9** places-lite.
- Epic **8:** **8.7** analytics; service forms per [`OPEN_ITEMS.md`](../00_ai_context/OPEN_ITEMS.md) / Phase 0 default (post-launch unless promoted).

### Gate E — Phase 5+

- Tickets **18.x**, LAG, release hardening.

### 19.1 Legacy sprint reference (deprecated)

Do **not** use for current planning; retained for traceability only.

- **Sprint 1 (legacy):** Epic 1, Epic 2, Ticket 3.1, Ticket 5.1  
- **Sprint 2 (legacy):** remainder Epic 3; Tickets 5.2–5.9; Tickets 4.1–4.4  
- **Sprint 3 (legacy):** Tickets 4.5–4.8; Tickets 6.1–6.9  
- **Sprint 4 (legacy):** Tickets 6.10–6.18; 6.20–6.21; 7.5–7.6  
- **Sprint 5 (legacy):** Tickets 7.1–7.4; 6.23–6.24; 8.7; QA / polish  
- **Sprint 6 (legacy, optional):** places-lite; service forms; save/account prompts; polish  

---

## 20) تصمیم‌های اجرایی نهایی

### قطعی
- launch MVP باید بر foundation + onboarding + dashboard + core guides متمرکز بماند
- search و updates مهم‌اند ولی بعد از core value surface می‌آیند
- service layer در launch cut ضروری نیست
- analytics باید قبل از launch باشد
- page templateها باید قبل از page explosion بسته شوند
- checklist logic باید ساده، rule-based و maintainable باشد

---

## 21) Definition of Done برای این سند

این development breakdown زمانی خوب است که:
- همه بخش‌های اصلی MVP به epic و ticket تبدیل شده باشند
- اولویت‌ها و dependencyها روشن باشند
- cut line launch مشخص باشد
- تیم بداند از کجا باید شروع کند
- Cursor/development execution بتواند این را به واحدهای ساخت ترجمه کند

---

## 22) جمع‌بندی نهایی

الان پروژه از حالت «ایده، تحقیق و حتی ساختار» عبور کرده و به سطح **execution-ready planning** رسیده است.

با این سند، حالا مشخص است:
- چه چیزهایی باید ساخته شوند
- چه چیزهایی باید فعلاً ساخته نشوند
- ترتیب ساخت چیست
- MVP واقعی کجا cut می‌شود
- برای تیم طراحی، توسعه و محتوا چه واحدهای کاری وجود دارد

این همان مرحله‌ای است که پروژه را آماده می‌کند تا از planning به build وارد شود.

---

## 23) قدم بعدی پیشنهادی

بعد از این سند، منطقی‌ترین گام بعد یکی از این دو است:

1. **Figma-ready Screen Checklist**
2. **Cursor-ready Engineering Task Pack**

اگر بخواهیم مستقیم وارد ساخت شویم، دومی منطقی‌تر است.
اگر بخواهیم اول handoff طراحی را کامل‌تر کنیم، اولی.

