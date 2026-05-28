---
owner: product
status: active
last_updated: 2026-05-28
source_of_truth: true
---

# MVP launch contract

Operational **launch interpretation layer** for Flow-Guide v1. It documents what the repository **actually ships** as the guest-first MVP and which PRD / UI-handoff expectations are **intentionally waived or deferred**.

**Repo reality governs launch scope.** [`PRD_MVP.md`](PRD_MVP.md) and [`UI_HANDOFF_SPEC.md`](UI_HANDOFF_SPEC.md) remain historical and design references. This contract is the checklist for **Phase 4 closure**, **Phase 5 QA**, and **LAG** scope alignment—not a promise to build everything those documents describe.

---

## A. Purpose

- Align humans and AI on **what “MVP launch” means** after Phase 4.7 (utility, instrumentation, perf sanity).
- Record **approved waivers** where original PRD §28 or UI handoff blocks are not in the build.
- Separate **engineering phase complete** from **production launch** (see §G).

---

## B. Authority stack

When documents conflict, resolve in this order:

| Priority | Source |
|----------|--------|
| 1 | [`LOCKED_DECISIONS.md`](../00_ai_context/LOCKED_DECISIONS.md), [`LOCKED_LOGIC.md`](../00_ai_context/LOCKED_LOGIC.md) |
| 2 | [`PHASE_0_DECISION_RECORD.md`](../04_engineering/PHASE_0_DECISION_RECORD.md) §4 (approved launch bundle) |
| 3 | **This file** (`MVP_LAUNCH_CONTRACT.md`) |
| 4 | [`PRD_MVP.md`](PRD_MVP.md) — requirements history |
| 5 | [`UI_HANDOFF_SPEC.md`](UI_HANDOFF_SPEC.md) — design north star, not launch checklist |

Engineering build truth: [`ENGINEERING_ARCHITECTURE.md`](../04_engineering/ENGINEERING_ARCHITECTURE.md).

---

## C. Shipped MVP summary

The v1 product is intentionally:

| Choice | Meaning |
|--------|---------|
| **Guest-first** | No forced signup; onboarding + dashboard work with `localStorage` guest blob (90-day TTL). |
| **Static-first** | Git Markdown + build-time Zod; SSG content routes; no headless CMS on the critical path. |
| **No auth / no backend product services** | No accounts, no form POST, no server personalization in v1. |
| **Multilingual UI** | `next-intl` — en / fa / ru shell copy; **English-first URL slugs**. |
| **English Markdown guides** | Guide bodies are English; UI strings localized separately. |

**Shipped product surfaces (Phase 2–4):**

- **Home** — gateway (hero, entry points, guided start, quick tools, trust framing).
- **Onboarding** `/start` — six steps, guest persistence, Step 6 outcome preview.
- **Dashboard** `/dashboard` — NBA v1, filtered checklist, re-entry note, quick actions, latest 3 updates (global, not personalized).
- **Must-launch hubs and guides** — newcomer, documents, work, housing, payments, transport, daily-life (see §D).
- **Stay calculator** — `/documents/stay-calculator` (90-in-180 logic).
- **FAQ** `/faq` — six entries with anchor deep links.
- **Search v1** `/search` — client grouped index (~33 records: pages, FAQ, tool, places).
- **Updates** `/updates` — editorial list; dashboard compact block satisfies “updates path” per [`ROADMAP_MASTER.md`](../01_strategy/ROADMAP_MASTER.md) §6.
- **Places-lite** — curated place records on three guides + search group (not a map platform).
- **Trust** — source / last verified / what may vary on sensitive guides.
- **Analytics subset** — six Plausible funnel events ([`ANALYTICS_PLAN.md`](../04_engineering/ANALYTICS_PLAN.md)).
- **SEO baseline** — metadata, sitemap (26 indexable paths), robots, `NEXT_PUBLIC_SITE_URL` for prod.
- **Performance sanity** — Phase 4.7 audit pass ([`PERF_SANITY_4_7_REPORT.md`](../05_execution/PERF_SANITY_4_7_REPORT.md)).

These are **architecture choices**, not temporary gaps waiting for a quick fix before close.

---

## D. Must-launch routes (summary)

Aligned with [`src/lib/ia-phase1-routes.ts`](../../src/lib/ia-phase1-routes.ts) and Phase 3 content exit. Grouped for readers—not an exhaustive slug list.

| Layer | Routes / areas |
|-------|----------------|
| **Gateway** | `/`, `/start`, `/dashboard` |
| **Trust / utility** | `/search`, `/faq`, `/updates` |
| **Newcomer** | `/newcomer`, day-one, first-week, airport-to-city (canonical; `/transport/airport` redirects) |
| **Documents** | `/documents`, stay-calculator, address-registration, social-card, temporary-residency |
| **Work** | `/work`, quick-income, yandex-starter, live-gaming |
| **Housing** | `/housing`, owner-vs-agency, rental-checklist |
| **Payments / transport / daily life** | `/payments`, terminals, service-payments; `/transport`, public-transport-payments; `/daily-life`, essential-apps |

**Launch-adjacent (not must-launch content):**

- **`/city`** — route exists; placeholder hub; **noindex**; **not in primary header nav** (W-009).
- **`/housing/request`** (+ success) — service-form **placeholder shells** only (W-008).

---

## E. Waiver / deferred table

Stable IDs for cross-references. **Deferred post-MVP** items may be explored later; they are **not guaranteed roadmap commitments**.

| ID | Topic | Shipped reality | Label | Rationale (short) |
|----|-------|-----------------|-------|-------------------|
| **W-001** | Residency / status card on dashboard | Not built; stay calculator is separate route | Deferred post-MVP | Needs guest/calculator wiring; out of Phase 4.6 scope |
| **W-002** | Dashboard alerts engine | Not built | Deferred post-MVP | UI handoff Block 5; no rules engine in v1 |
| **W-003** | Home updates preview | Omitted; `/updates` + dashboard block | Partially shipped | ROADMAP §6 satisfied via dashboard path |
| **W-004** | Personalized “updates for you” | Latest 3 global updates | Deferred post-MVP | No targeting without account/backend |
| **W-005** | Save-path / account | No auth, no signup CTA on Step 6 | Deferred post-MVP | Phase 0: guest standalone MVP |
| **W-006** | Checklist status editing | Rows display `not-started`; filter v1 only | Deferred post-MVP | `UserChecklistStatus` not wired in UI |
| **W-007** | Map lite → places-lite | 4 places, 3 guide blocks, search group | Shipped (reinterpretation) | Real curated data per Phase 0; not a fake map |
| **W-008** | Housing request / casino forms | Placeholder templates only; no POST | Deferred post-MVP | Phase 0 default post-launch unless ops/legal promote |
| **W-009** | `/city` tourism hub | Placeholder hub; noindex; nav hidden | Launch-adjacent | Group I deferral; honest stub vs empty nav label |
| **W-010** | Analytics event list | 6 core funnel events | Partially shipped | Tier per Phase 0 / `ANALYTICS_PLAN.md` |
| **W-011** | Multilingual guide bodies | UI en/fa/ru; Markdown English | Partially shipped | v1 content workflow constraint |

**Not waivers (clarifications only):** airport canonical redirect; static/guest/no-CMS architecture; governance names and legal/privacy remain **LAG gates** in [`OPEN_ITEMS.md`](../00_ai_context/OPEN_ITEMS.md).

---

## F. Taxonomy definitions

| Term | Meaning |
|------|---------|
| **Shipped** | In repo, user-visible, matches Phase 0/4 intent. |
| **Partially shipped** | Core path works; reduced depth vs PRD/UI handoff. |
| **Deferred post-MVP** | Intentionally absent for v1; may be explored later—not a delivery commitment. |
| **Launch-adjacent** | Route or shell exists; thin, hidden, or noindex until promoted. |
| **Future exploration** | Roadmap ideas without v1 implementation (jobs board, semantic search, events). |
| **Non-goal** | Explicitly out of MVP (full map platform, community Q&A, marketplace). |
| **Stale aspirational** | Old doc text that reads like a blocker but was never contracted (e.g. full 8-block Figma dashboard). |

---

## G. Phase closure semantics

| Milestone | Meaning |
|-----------|---------|
| **Phase 4 Done** | Slices 4.1–4.7 complete **and** this contract published; `ROADMAP_STATUS` updated. **Does not mean production launch.** |
| **Phase 5** | QA, release readiness, trust/nav/security/analytics smoke—see [`EXECUTION_ROADMAP.md`](../05_execution/EXECUTION_ROADMAP.md) §5. |
| **LAG** | Human GO/NO-GO after Phase 5; governance, legal/privacy, prod observability—see [`ROADMAP_MASTER.md`](../01_strategy/ROADMAP_MASTER.md) §7. |
| **Phase 6** | Production deployment after LAG. |

```text
Phase 4 Done  →  Phase 5 QA  →  LAG GO  →  Phase 6 deploy
     ↑                              ↑
  this contract              OPEN_ITEMS gates
```

---

## H. References

- [`PHASE_0_DECISION_RECORD.md`](../04_engineering/PHASE_0_DECISION_RECORD.md) §4 — approved launch bundle
- [`ROADMAP_MASTER.md`](../01_strategy/ROADMAP_MASTER.md) §6 — must-launch matrix
- [`ANALYTICS_PLAN.md`](../04_engineering/ANALYTICS_PLAN.md) — shipped events
- [`UI_STATES.md`](../00_ai_context/UI_STATES.md) — per-surface deferred notes
- [`EXECUTION_ROADMAP.md`](../05_execution/EXECUTION_ROADMAP.md) — Phase 4 slices + Phase 5 QA plan
- [`PERF_SANITY_4_7_REPORT.md`](../05_execution/PERF_SANITY_4_7_REPORT.md) — Phase 4.7 evidence
