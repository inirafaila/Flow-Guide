---
owner: engineering
status: approved
last_updated: 2026-04-01
source_of_truth: true
---

# Phase 0 decision record

## 0. Approval (formal closure)

**Phase 0A** and **Phase 0B** are **approved** as of **2026-04-01** for execution. **Final chosen defaults** for the production-near path:

- **Stack:** Next.js App Router + TypeScript on **Vercel**; **Docker** deferred for this launch.  
- **Content:** Git **Markdown + typed YAML frontmatter** + build-time validation; **no headless CMS**; **CMS-ready** loaders.  
- **Rendering:** **SSG/ISR-first** for content; client interactivity for onboarding/dashboard/search UI (behavior in Phase 2+).  
- **Search:** **Must-launch** architecture—**`search-index.json`** at build time + **client** grouped search (pages + FAQ + places-lite when data exists).  
- **Places:** **Real places-lite** at launch (not a fake map).  
- **Guest state:** **`localStorage`** + **`schemaVersion`** + **90-day sliding TTL** (logic in Phase 2).  
- **Auth:** **Deferred**; future default candidate **Auth.js**.  
- **i18n:** **`next-intl`**, English-first URLs, cookie locale.  
- **Observability:** **Plausible** + **Sentry** (Phase 1 stubs → full config before prod).  
- **Routes:** Airport canonical **`/newcomer/airport-to-city`**; **`/transport/airport` → redirect**. **`/city`** minimal curated + nav visible. **Housing/casino** default **post-launch** unless ops readiness is later recorded.  
- **Governance:** Owner + reviewer + source + `last_verified` + `what_may_vary` + **90d** + **14d** for sensitive pages—**assign human names** before publishing sensitive copy (see `OPEN_ITEMS.md` until filled).

**Pre-production (LAG):** legal/privacy for **localStorage**, analytics, monitoring, and forms—see `OPEN_ITEMS.md`.

## 1. Purpose

This document captures **Phase 0A (product scope / MVP contract)** and **Phase 0B (technical architecture)** outcomes in one place. **Strategic constraint:** target **public production launch in under one month**—decisions below optimize for **speed, reliability, low implementation risk, and low operational fragility**, while staying **CMS- and scale-ready** without over-engineering.

**Status:** **Approved** for build; remaining human items are **pre-prod** (§0, §7, `OPEN_ITEMS.md`), not open architecture questions.

**After approval**, use §8 to update `ROADMAP_STATUS.md`, `OPEN_ITEMS.md`, `ENGINEERING_ARCHITECTURE.md`, `PROJECT_STATE.md`, `NEXT_ACTIONS.md`, and related files.

---

## 2. Context

[`ROADMAP_MASTER.md`](../01_strategy/ROADMAP_MASTER.md) required **0A** and **0B** before **Phase 1**; both are **closed** (see §0). Product specs (`PRD_MVP.md`, `IA_SPEC.md`, `DATA_CONTENT_MODEL_SPEC.md`) remain authoritative for product truth; **implementation choices** are now **locked** in this record and `ENGINEERING_ARCHITECTURE.md`.

This record **defines the production-near default path** that preserves **guest-first**, **trust/source metadata**, and **English-first slugs**. Deviations require explicit human approval (§7).

---

## 3. Phase 0A decisions

### 3.1 MVP launch contract (overall)

| Field | Content |
|--------|--------|
| **Decision (recommended)** | **PRD-aligned launch in &lt;1 month:** **search must-launch**, **real places-lite** (curated data, list/table UI—**not** a fake map product), **updates + analytics + Sentry** per DoD; **no headless CMS** in this release. |
| **Rationale** | Search and trustworthy location-adjacent content reduce support load at launch; deferring CMS avoids integration risk on the critical path. |
| **Alternatives** | Documented **waivers** only if schedule forces (owner + date in §7). |
| **Tradeoffs** | Tight calendar requires ruthless scope on **housing/casino** (default **post-launch** unless ops confirms). |
| **Requires human approval?** | **Only if** team rejects this bundle or adds waivers. |

### 3.2 Airport route consolidation

| Field | Content |
|--------|--------|
| **Decision (locked for production-near path)** | **Canonical:** `/newcomer/airport-to-city`. **`/transport/airport` → 301 redirect** to canonical. **One** content source / one MD file backing both if needed; **no duplicate copy**. |
| **Rationale** | Fastest maintenance + clearest newcomer journey under time pressure. |
| **Alternatives** | Canonical under `/transport/...` only—**not** recommended (slower IA alignment). |
| **Tradeoffs** | Transport hub loses unique URL for airport—mitigated by redirect and cross-links from `/transport`. |
| **Requires human approval?** | **Only if** product insists on `/transport/airport` as canonical (then flip redirect). |

### 3.3 `/city` (tourism) tier

| Field | Content |
|--------|--------|
| **Decision (recommended)** | **Launch-adjacent:** **`/city` route goes live** in the same release train as MVP when IA primary nav includes **گردش** (`IA_SPEC.md`). **Navigation:** **keep visible** in the main nav (per IA)—do not ship an empty nav label. **Content:** **minimal curated** page: **real** short intro (a few paragraphs) + **curated link cards** to existing internal guides (e.g. essential apps, transport, FAQ, newcomer hub)—**not** lorem/placeholder copy; optional single honest line (“More city guides coming”) is OK. **No** deep tourism modules (Yerevan Card depth, events grid, etc.) in this tier. |
| **Rationale** | Satisfies IA without a second product inside MVP; users always see a purposeful page, not a stub. |
| **Alternatives** | (A) **Post-launch** `/city`: hide **گردش** from nav until ready (requires IA exception). (B) **Must-launch** rich tourism (not recommended). |
| **Tradeoffs** | Curated links need a one-time authoring pass; still far cheaper than full city content. |
| **Requires human approval?** | **No** for default path (live + visible + minimal curated). **Yes** only if deferring route/nav. |

### 3.4 PRD Definition of Done — waivers

| Field | Content |
|--------|--------|
| **Decision (recommended)** | **No PRD DoD waivers** for search, updates, analytics, Sentry, or places **for the default launch path**—places ship as **real places-lite** (curated list), not a decorative map. **Housing request / casino referral:** default **post-launch** unless **ops + legal + intake** are explicitly confirmed before cutover—then treat as launch-adjacent (still not default). |
| **Rationale** | Protects launch week capacity; forms without ops create trust incidents. |
| **Alternatives** | Pull forms in if readiness proven—document in §7. |
| **Tradeoffs** | Later monetization/service paths—but lower fragility. |
| **Requires human approval?** | **Yes** only to **promote** housing/casino into launch-adjacent. |

### 3.5 Content governance minimum (sensitive pages)

| Field | Content |
|--------|--------|
| **Decision (recommended)** | For **sensitive categories** (documents/residency, banking-related copy, payments, transport fares/rules): **frontmatter / structured fields** include **source** (citation), **`last_verified_at`**, and **`what_may_vary`** (or equivalent variance framing) per `DATA_CONTENT_MODEL_SPEC.md`; (1) every such **guide** has **at least one** `SourceRecord`-style citation + **`last_verified_at`** before publish; (2) **named roles**: **Content owner** (routine updates) + **Reviewer** (sign-off for legal/financial accuracy—may be the same person if qualified and declared); (3) **no publish** without reviewer for **new** or **materially changed** sensitive pages; (4) **re-verification cadence:** **calendar review every 90 days** for sensitive pages (owner checks sources still valid, updates copy or bumps `last_verified_at`); **event-driven review within 14 days** when a credible external change is reported (official site change, user “outdated” report, partner flag) or an **Update item** references that page; (5) log substantive changes in **`/updates`** or internal changelog when user-visible facts change. |
| **Rationale** | PRD and roadmap require trust layer; cadence prevents silent staleness without a heavy enterprise workflow. |
| **Alternatives** | Quarterly-only (slower reaction); monthly all-pages audit (too heavy for MVP team). |
| **Tradeoffs** | 90-day tick requires calendar discipline; event path needs a single intake (issue template or inbox). |
| **Requires human approval?** | **Yes** — **assign human names** for owner/reviewer (cadence **90d / 14d** is the default unless legal specifies otherwise). |

---

## 4. MVP launch contract summary

**Legend:** **Must-launch** = required for **&lt;1 month** public launch / LAG. **Launch-adjacent** = same train **only** if explicitly approved. **Post-launch** = after v1. **Later expansion** = Phases 8–9+.

| Item | Must-launch | Launch-adjacent | Post-launch | Later expansion |
|------|-------------|-----------------|-------------|-----------------|
| **Search v1** | **Yes** — client index over **pages + FAQ + places-lite**; grouped results | — | Server/hosted search, synonyms | Semantic / RAG |
| **Places-lite** | **Yes** — **real curated `Place` records** (list/table/cards; honest “not a full map” UX) | Optional static map embed later | Full map platform | Partner/geo at scale |
| **Updates** | `/updates` + **≥1** path to Home/Dashboard | “For you” targeting | Automated ingestion | Enterprise editorial |
| **Housing request** | — | **Only if** ops/legal/intake **explicitly confirmed** pre-launch | **Default** (production-near path) | Marketplace |
| **Casino referral** | — | **Only if** ops/legal/intake **explicitly confirmed** pre-launch | **Default** (production-near path) | Full workflow |
| **Analytics** | **Plausible** + **core funnel** events | Full PRD event list | Deeper analytics | — |
| **Error monitoring** | **Sentry** (preview + prod) | — | — | — |
| **Save path / account prompts** | Guest **standalone** | **Auth.js** when first account slice ships | Reminders, uploads | Full persistence |
| **City / tourism (`/city`)** | — | **Live**, **nav visible**, **minimal curated** (§3.3) | Rich guides | Full tourism / events |

**Airport:** **canonical** `/newcomer/airport-to-city` (§3.2). **CMS:** **none** this launch; **git Markdown**; **CMS-ready** per `ENGINEERING_ARCHITECTURE.md`.

---

## 5. Phase 0B technical recommendations

**Default path for production-near launch** is spelled out in **`ENGINEERING_ARCHITECTURE.md`**. **Approval needed** only where the row says so (org/legal/budget overrides).

### 5.1 Stack / framework

| Field | Content |
|--------|--------|
| **Recommended** | **Next.js App Router** + **TypeScript** + **React**. |
| **Rationale** | Fastest reliable path to **Vercel** deploy; matches `FOLDER_STRUCTURE.md`. |
| **Alternatives** | Remix, etc.—**not** recommended on the &lt;1 month critical path. |
| **Tradeoffs** | Vendor-aligned defaults acceptable for v1. |
| **Approval needed** | **Only if** org forbids Next.js. |

### 5.2 Rendering model

| Field | Content |
|--------|--------|
| **Recommended** | **SSG / ISR-first** for content routes; conservative **`revalidate`** or on-demand ISR where freshness matters. **Onboarding / dashboard / search UI:** **client** interactivity. **Search:** build **`search-index.json`** + **client** FlexSearch/Fuse (§5.3a). |
| **Rationale** | Minimizes server surface area and cold-path risk before launch. |
| **Alternatives** | Full SSR—slower to ship and operate for this MVP. |
| **Tradeoffs** | Client search ships whole index—OK for v1 corpus. |
| **Approval needed** | **No** unless hosting cannot support Next SSG/ISR. |

### 5.3 CMS / content strategy (canonical format)

| Field | Content |
|--------|--------|
| **Recommended (canonical)** | **Git Markdown + typed YAML frontmatter**, **Zod** (or JSON Schema) **build-time validation**, **`remark`/`rehype`** render. **No headless CMS** this launch—keeps PR review and avoids integration risk. **CMS-ready:** loaders isolated in `lib/content/*` for a future swap (**Phase 8+**). |
| **MDX** | **Not** required for v1 (calculators are **routes**, not arbitrary JSX in articles). |
| **Alternatives** | Sanity/Contentful day one—**not** on default critical path. |
| **Tradeoffs** | Non-dev publishes need Git or paired engineer until CMS. |
| **Approval needed** | **Only if** business mandates CMS before launch. |

### 5.3a MVP search implementation

| Field | Content |
|--------|--------|
| **What is indexed (MVP)** | (1) **All searchable content pages** (hubs, guides, calculators, utilities per IA)—`title`, `summary`, `slug`, `primary_category`, `page_type`, tags/aliases; (2) **FAQ** items—question + answer excerpt; (3) **Places-lite** — **must** index real `Place` rows (name, type, address, tags) because **places-lite is must-launch** with real data for this path. |
| **Practical approach** | **Build time:** a small script (or Next plugin) walks content collections, outputs **`search-index.json`** (array of `{ id, type, title, excerpt, slug, category, … }`). **Runtime:** `/search` loads the JSON and runs **FlexSearch** or **Fuse.js** in the browser for keyword match; results **grouped by type** to match PRD “typed” results. **No** dedicated search backend for MVP. **Cursor-friendly:** one index module, one search page, one schema for index records. |
| **Alternatives** | Server-side `/api/search`; hosted Algolia/Typesense (cost + integration). |
| **Tradeoffs** | Client index ships full corpus to browser—acceptable for MVP document counts; grows with content. |
| **Approval needed** | **No** for v1 corpus; **Yes** if legal forbids shipping search index JSON to client. |

### 5.4 Hosting / deploy target

| Field | Content |
|--------|--------|
| **Recommended** | **Vercel** for **production + preview** (per-branch previews = staging). **Custom domain** when ready. |
| **Rationale** | Native Next.js path; minimal ops for small team. |
| **Alternatives** | Netlify, Cloudflare Pages, self-hosted Node/Docker on VPS. |
| **Tradeoffs** | Vendor lock-in vs speed; self-host adds ops burden. |
| **Approval needed** | **Only if** org **cannot** use Vercel. |

### 5.5 Guest persistence

| Field | Content |
|--------|--------|
| **Storage mechanism** | **Single JSON blob** in **`localStorage`** under a fixed key (e.g. `flowguide_guest_v1`). Include **`schemaVersion`** inside the blob for safe migrations. |
| **What is stored** | **Onboarding:** `language`, `nationality`, `location_status`, `primary_goal`, boolean flags (`has_housing`, `has_sim`, `has_address_registration`, `has_social_card`, `has_bank_account`) per PRD. **Checklist:** per–checklist-item `status` + optional `updatedAt`. **Derived UI cache (optional):** last computed `recommended_primary_action` / emphasis—**regeneratable** from the above (may be omitted to reduce drift). **Timestamps:** `createdAt`, `lastActiveAt`. **Do not store** passwords, tokens, or national ID numbers; treat free-text notes as **user-provided** and minimize. |
| **TTL / expiry** | **Sliding window: 90 days** from **`lastActiveAt`** (update `lastActiveAt` on each app session open or meaningful interaction). **On read:** if expired, **clear** the blob and treat user as **fresh guest** (re-onboarding). **Schema bump:** increment `schemaVersion`; on mismatch, **clear** or run a one-shot migrator (MVP: prefer **clear** + re-onboarding if migration is costly). **What expires:** the **entire guest state** for that browser profile—not partial TTL per field in MVP. |
| **Account migration (later)** | When the **first account-required slice** ships: after successful sign-in, **read** guest blob client-side, **POST** normalized payload to server (or merge via authenticated API), **server persists** canonical user profile + checklist rows keyed by `userId`. **Then** **delete** local guest blob (or mark `migrated: true` and clear sensitive fields). **Conflict rule (MVP):** if server already has saved state for that user, **server wins** for checklist; **merge** only explicit fields if product later requires it—document in API contract. |
| **Rationale** | Matches `LOCKED_LOGIC.md` / data spec; no server for guest MVP; concrete enough to implement without ambiguity. |
| **Alternatives** | Shorter TTL (30d); server-side anonymous session id + Redis. |
| **Tradeoffs** | Device-bound; clearing after 90d may annoy rare returning users—acceptable for MVP. |
| **Approval needed** | **Legal/privacy** sign-off on **localStorage** contents; **No** engineering dissent on **90d / full clear** (default). |

### 5.6 Auth timing / path

| Field | Content |
|--------|--------|
| **Recommended** | **Auth provider selection deferred** until **first account-required slice**. **Does not block Phase 1 or Phase 2.** Use placeholders / copy only. **When implemented, default provider:** **Auth.js (NextAuth v5)** (magic link + optional one OAuth). **Clerk** not selected for v1 unless explicitly approved later. |
| **Rationale** | Maximizes launch-week bandwidth for content + guest UX. |
| **Alternatives** | Pick Clerk at account slice—requires explicit decision then. |
| **Tradeoffs** | One-time auth integration spike post-v1 (or late v1 if slipped in). |
| **Approval needed** | **No** to defer; **Yes** at account-slice time for final provider. |

### 5.7 i18n approach

| Field | Content |
|--------|--------|
| **Recommended** | **English-first URLs** unchanged across locales (`IA_SPEC.md`). **UI language** via **`next-intl`** (or equivalent) with **cookie** `NEXT_LOCALE` + **optional** `?lang=` for sharing; **dictionaries** in `messages/{fa,en,ru}.json`. **RTL** for `fa` in global layout/CSS. |
| **Rationale** | Avoids duplicate URL trees for SEO; aligns with locked slug rule. |
| **Alternatives** | `/{locale}/...` prefix everywhere (more moving parts). |
| **Tradeoffs** | Cookie locale less visible in URL; acceptable for MVP. |
| **Approval needed** | **No** for default (**next-intl** + cookie + English URLs). |

### 5.8 Analytics / privacy baseline

| Field | Content |
|--------|--------|
| **Recommended** | **Plausible** for traffic + **minimal** custom goals/events (onboarding complete, dashboard, search, key CTAs). **Cookie banner** only if jurisdiction + tool choice require it. |
| **Rationale** | Smallest compliance surface consistent with PRD measurement needs. |
| **Alternatives** | GA4, PostHog-heavy—only if legal/marketing overrides. |
| **Tradeoffs** | Plausible cost at scale; acceptable for v1. |
| **Approval needed** | **Legal/marketing** on vendor + event list; **No** if Plausible is accepted. |

### 5.9 Error monitoring

| Field | Content |
|--------|--------|
| **Recommended** | **Sentry** (Next.js SDK) for **preview + production**; **PII scrubbing** on; **release** tied to git SHA. |
| **Rationale** | LAG expects error monitoring; default for Next. |
| **Alternatives** | Highlight, Rollbar—only if procurement blocks Sentry. |
| **Tradeoffs** | Cost at volume; worth launch debuggability. |
| **Approval needed** | **Budget/procurement** only. |

### 5.10 Environment strategy

| Field | Content |
|--------|--------|
| **Recommended** | **Local:** `.env.local` (gitignored). **Preview:** Vercel **Preview** env vars. **Production:** Vercel **Production** secrets. **`NEXT_PUBLIC_*`** only for non-secret config. |
| **Rationale** | Matches Vercel + Next; three tiers: local / preview / production. |
| **Alternatives** | Doppler, SSM—if enterprise policy requires. |
| **Tradeoffs** | Vercel UI secrets are simple until policy escalates. |
| **Approval needed** | **Only if** enterprise mandates external secret manager. |

### 5.11 Dockerization

| Field | Content |
|--------|--------|
| **Recommended** | **Explicitly deferred for this launch** on the **Vercel** path—**no** production `Dockerfile` requirement. Revisit **only** if hosting moves to container-only/self-hosted Node or org mandates containers. |
| **Rationale** | Reduces ops and CI complexity during the &lt;1 month window (`ROADMAP_MASTER.md` §8 remains conditional). |
| **Alternatives** | Devcontainer for dev parity—optional, non-blocking. |
| **Tradeoffs** | No local prod-parity container until needed. |
| **Approval needed** | **Only if** org mandates containers before first launch. |

---

## 6. Architecture doc alignment

**`ENGINEERING_ARCHITECTURE.md`** is populated for the **production-near** path (stack, rendering, content, search, guest persistence, auth deferral, i18n, Vercel, Plausible, Sentry, envs, Docker deferred, request flow). After **formal human approval** of this record, bump that doc’s status if team convention requires and keep it in lockstep with §5–§4.

**`FOLDER_STRUCTURE.md`:** confirm `src/app` App Router alignment when scaffold lands; spirit unchanged.

---

## 7. What still needs explicit human sign-off

- **Governance:** **assign names** for content **owner** and **reviewer**; confirm **90d / 14d** cadence or legal override (§3.5).  
- **Legal / privacy:** **localStorage** guest blob, **Plausible**, **Sentry**, and any **form** fields before prod.  
- **Org overrides:** non-Vercel host, non-Plausible analytics, non-Sentry errors, **CMS before launch**, or **client search index** forbidden—document decision + date.  
- **Airport / `/city`:** only if product **rejects** §3.2 / §3.3 defaults.  
- **PRD DoD waivers:** only if intentionally downgrading search, places, updates, observability, etc.  
- **Housing / casino:** **post-launch** default; **launch-adjacent** only with **ops + legal + intake** explicitly confirmed—then record in contract.  
- **Auth:** **deferral** is default; **final provider** at **account-slice** time (**Auth.js** default candidate).

---

## 8. Recommended next file updates after approval

1. `ROADMAP_STATUS.md` — 0A/0B **done** + date; Phase 1 **in progress**.  
2. `OPEN_ITEMS.md`, `PROJECT_STATE.md`, `CURRENT_FOCUS.md`, `NEXT_ACTIONS.md` — reflect closure + Phase 1.  
3. `FOLDER_STRUCTURE.md` / scaffold PR — App Router alignment.  
4. `PHASE_0_DECISION_RECORD.md` frontmatter — `status: approved`, `source_of_truth: true` if convention requires.  
5. `DECISION_LOG.md` — entry when used.

---

## 9. Immediate next move

**Single session:** (1) **Sign or amend** §3–§5 and §4 matrix; (2) **assign governance names**; (3) **legal tick** on localStorage + analytics + monitoring; (4) mark 0A/0B **closed** in `ROADMAP_STATUS.md` and **start Phase 1 scaffold** per `ENGINEERING_ARCHITECTURE.md`.

---

**Saved path:** `docs/04_engineering/PHASE_0_DECISION_RECORD.md`
