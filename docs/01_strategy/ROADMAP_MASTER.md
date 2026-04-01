---
owner: product
status: active
last_updated: 2026-04-01
source_of_truth: true
---

# Master roadmap

## 1. Purpose of this roadmap

This document is the **single execution-oriented master roadmap** for Flow-Guide. It defines **phases**, **decision gates**, **MVP boundaries**, **launch control**, and **operational expectations** so the team can plan work without renegotiating scope in ad hoc chats.

**Execution posture (current):** first **public production** launch is targeted within **&lt; one month**. Sequencing favors **speed**, **launch reliability**, **low implementation risk**, and **low operational fragility** while preserving locked newcomer-first direction. For the active track, see **`docs/04_engineering/PHASE_0_DECISION_RECORD.md`**: **search is must-launch** (client index), **places-lite ships real curated data** (not a fake map), **no headless CMS** on the critical path, **Vercel** hosting, and **Docker intentionally deferred** unless org policy requires containers.

**How to use it**

- **Product / PM**: phase objectives, MVP matrix, launch gate, and risk focus.
- **Engineering**: sequencing (foundation → behavior → content → utilities → QA → deploy → stabilize); explicit dependencies on stack, CMS, auth, and persistence decisions.
- **Content / ops**: trust governance, updates cadence, and when admin tooling is expected.
- **AI-assisted execution**: continuity rules, doc sync, and traceability so new sessions can resume safely.

**What this file is not**

- It is not a sprint calendar (use `ROADMAP_STATUS.md` and execution breakdown).
- It does not replace the PRD, IA, or data model; it **orchestrates** them.
- Unresolved choices are recorded as **decision gates** or **dependencies**, not implied defaults.

---

## 2. Product summary

**What the product is**  
Flow-Guide is a **web app** that helps **newcomers and migrants** start life in **Armenia** with **scenario-based, step-by-step guidance**: what to do next, in what order, and how to operate **before** full local documents or banking are in place. It combines **structured guides** with **light personalization** (onboarding → dashboard → checklist → next best action) and a **trust layer** (sources, last verified, variance warnings) on sensitive topics.

**Who it is for**  
Primary users are **non-Armenian newcomers** (e.g. Iranian, Russian, Indian, and other nationalities) in the **first days and weeks** after arrival. **Settled users** are a secondary audience for later retention layers (events, opportunities)—not the MVP core.

**What the MVP must achieve**

1. **Fast start**: newcomer-first home, short guided onboarding, clear entry points.
2. **Actionable orientation**: temporary guest-capable dashboard, short checklist, **one** primary next action (+ limited secondary actions).
3. **Trustworthy guidance** on high-friction flows: arrival, stay-day logic (including **Iranian 90-in-180 rolling** treatment per locked product rules), address registration, social card, temporary residency, housing basics, quick income, payments, transport, essential apps, FAQ, and updates.

---

## 3. Locked foundations this roadmap assumes

The following are **already decided** in product/design specs; this roadmap **does not reopen** them.

- **Helper-first, newcomer-first**; not marketplace-first in MVP.
- **Guest-first, account-later**; no forced signup at entry.
- **Hybrid Home**, optimized for newcomers; scenario-based **primary navigation** (not org-chart IA).
- **Mobile-first**; calm / clear / trustworthy / modern experience.
- **Short guided onboarding** (on the order of minutes, not long wizards).
- **Dashboard is core**, not decorative: status, next best action, checklist, alerts, quick actions.
- **Trust pattern** on sensitive content: **source**, **last verified**, **what may vary** / confidence framing.
- **IA model**: gateway → scenario hubs → action pages → personal layer → trust layer (`IA_SPEC.md`).
- **English-first slugs** (kebab-case); UI may be fa/en/ru.
- **Search** and **location-linked** experiences matter architecturally; **full semantic search** and **full map platform** are **out of MVP**.
- **Housing request** and **casino referral** are **lightweight service candidates**, not full operational marketplaces in MVP.
- **Jobs marketplace, employer posting, community/Q&A, events platform, partner panels, hostel booking** are **post-MVP / expansion** unless explicitly escalated via a decision gate.

---

## 4. Roadmap principles

1. **Foundation before feature surface** — templates, types, content contracts, and routing before page explosion.
2. **Plumbing before product intelligence** — Phase 1 is **not** where next-best-action business rules live; Phase 2 is.
3. **Newcomer value before expansion** — ship the survival/settling journey before platform modules.
4. **Trust before growth** — governance and verification discipline precede aggressive retention or monetization.
5. **Explicit scope** — anything not in the **must-launch** row of §6 requires a **Phase 0A** decision or a **documented waiver** vs PRD DoD.
6. **Launch is a controlled event** — **Launch Approval Gate (LAG)** is mandatory before production promotion.
7. **Stabilize before admin/platform expansion** — Phase 7 gate before Phase 8–9 heavy investment.
8. **No hidden ambiguity** — open technical choices are **Phase 0B gates**, not “we’ll pick later in the sprint.”

---

## 5. Master roadmap phases

**Classification labels**

- **Required before MVP build** — must complete before treating MVP feature work as “done.”
- **Required before launch** — must complete before **LAG** and production cutover.
- **Post-launch** — after first public release and stabilization window.
- **Future expansion** — after stability + capacity; not committed in MVP.

---

### Phase 0A — Product scope and MVP contract

| Field | Content |
|--------|--------|
| **Objective** | Freeze **what MVP and launch mean** in one written contract aligned to PRD + IA + execution reality. |
| **Why it exists** | Prevents silent scope drift and resolves tensions between PRD Definition of Done and development cut lines **without** coding by committee. |
| **Main deliverables** | Final **must-launch vs launch-adjacent** bundle (see §6); resolution of **route overlaps** (e.g. `/newcomer/airport-to-city` vs `/transport/airport`—one primary user journey, cross-links as needed); **content governance minimum** for sensitive pages (who verifies, what “verified” means for v1); **waiver process** if any PRD DoD item is intentionally deferred. |
| **Key dependencies** | `PRD_MVP.md`, `IA_SPEC.md`, `UX_DECISIONS_MVP_PAGES_WIREFRAMES.md`, `DEVELOPMENT_BREAKDOWN.md`. |
| **Decision gates** | Approve MVP page/route set; approve **search / places / updates / forms** tier per §6; approve **city/tourism** treatment; approve waiver policy for PRD gaps. |
| **Exit criteria** | Signed or recorded **MVP launch contract**; no undocumented disagreement on launch bundle. |
| **Key risks** | “MVP = everything in PRD” without reconciling execution backlog. |
| **Classification** | **Required before MVP build** |

---

### Phase 0B — Technical architecture lock

| Field | Content |
|--------|--------|
| **Objective** | Lock **implementation choices** that are expensive to reverse: stack, rendering, hosting, CMS, guest persistence, auth path, i18n workflow, analytics, observability. |
| **Why it exists** | Guest state, content pipeline, and routing touch every feature; late changes destroy velocity. |
| **Main deliverables** | Chosen **framework** and **rendering model**; **hosting**; **CMS vs static/hybrid**; **guest persistence** (TTL, storage, migration to account); **auth** approach for MVP and future admin; **i18n** content workflow with English slugs; **environments** (local / preview / prod); **secrets** handling; **analytics** tool + **PII** boundaries; **error monitoring** tool. |
| **Key dependencies** | Phase 0A; `DATA_CONTENT_MODEL_SPEC.md`; `ENGINEERING_ARCHITECTURE.md` (to be filled after lock); `FOLDER_STRUCTURE.md`. |
| **Decision gates** | Formal sign-off on stack/CMS/auth/i18n/guest model; agreement on **no reopen** until post-launch review milestone unless blocker. |
| **Exit criteria** | Architecture decisions **documented for implementation** (in engineering architecture doc when updated); Phase 1 can start without speculative spikes on core plumbing. |
| **Key risks** | Analysis paralysis—mitigate with timeboxed decisions and written tradeoffs. |
| **Classification** | **Required before MVP build** |

---

### Phase 1 — Engineering and content foundation (plumbing only)

| Field | Content |
|--------|--------|
| **Objective** | Build **safe-to-extend** codebase and content **plumbing**: shell, routes, types, templates as **schema-shaped shells**, CI/env baseline, observability **hooks**. |
| **Why it exists** | Reusable templates + typed content prevent inconsistent trust metadata and unbounded page-by-page hacks. |
| **Main deliverables** | App **shell**; **route skeleton** per `IA_SPEC.md`; shared **types/enums** aligned with `DATA_CONTENT_MODEL_SPEC.md`; **hub / guide / calculator / utility / service-form** templates rendering **placeholders** from schema; **git Markdown + validated frontmatter** wired (CMS **not** required for v1—**CMS-ready** boundaries only); **design tokens** baseline; **env config** pattern; **CI** minimal (lint/test/build); **structured logging** baseline; **error reporting** SDK integrated at stub level; **README** orientation (run, layout, where product truth lives). |
| **Key dependencies** | Phase 0B complete. |
| **Decision gates** | Routes/slugs match IA; schema matches MVP collections; CI green on agreed checks. |
| **Exit criteria** | New page / checklist row / update entry can be added **without** inventing folder or schema ad hoc; failed deploy is **debuggable** via logs. |
| **Key risks** | Sneaking **product logic** (NBA, checklist rules) into Phase 1—**out of scope** here beyond stubs. |
| **Classification** | **Required before MVP build** |

---

### Phase 2 — Core product behavior and trust layer

| Field | Content |
|--------|--------|
| **Objective** | Implement **meaningful** onboarding, guest state, dashboard, **next best action v1**, **checklist filtering v1**, and **trust UI** consuming real content-shaped data. |
| **Why it exists** | This is the product differentiator; it must sit **on top of** Phase 1, not mixed with infra-only work. |
| **Main deliverables** | Onboarding **step framework** + steps; **guest session** read/write per 0B; mapping onboarding → **user state**; **dashboard** populated; **NBA v1** (one primary + capped secondary); **checklist** filter/sort v1; **source / last verified / variance** blocks wired; **stay calculator** page behavior per spec; alerts/quick actions **data-driven** where required. |
| **Key dependencies** | Phase 1 templates + schema; **seed** checklist definitions + minimal **content fixtures** for logic tests. |
| **Decision gates** | Sign-off on **rules v1** (product); sign-off on **trust copy pattern** for sensitive categories. |
| **Exit criteria** | User can: complete onboarding → see coherent dashboard → follow NBA → land on guide with trust blocks. |
| **Key risks** | Over-building a rules engine—keep **declarative / simple** per specs. |
| **Classification** | **Required before MVP build** |

---

### Phase 3 — MVP content and journey implementation

| Field | Content |
|--------|--------|
| **Objective** | Ship **must-launch** guides and hubs so the product is substantively useful—not an empty framework. |
| **Why it exists** | Value is **content + logic**; code without verified copy fails the promise for newcomers. |
| **Main deliverables** | Home, Start, Dashboard with real copy; all **must-launch** routes per §6; internal cross-links; editorial + **trust review** for sensitive pages per 0A governance. |
| **Key dependencies** | Phase 2 stable; content authoring capacity. |
| **Decision gates** | **Content completeness** checklist by section; **trust/legal** sign-off for residency/banking/payments as defined in 0A. |
| **Exit criteria** | Newcomer can complete **primary journeys** without dead ends on must-launch routes. |
| **Key risks** | Content lag behind code—mitigate with parallel authoring and fixtures during Phase 2. |
| **Classification** | **Required before MVP build** (must-launch subset); **launch-adjacent** pages may complete in Phase 4 per §6. |

---

### Phase 4 — MVP utility, instrumentation, and launch-scope hardening

| Field | Content |
|--------|--------|
| **Objective** | Close the gap to **launchable**: search, updates surfacing, analytics, SEO, and **explicit** handling of deferred items. |
| **Why it exists** | Findability, measurement, and honest placeholders separate a demo from a shippable trust product. |
| **Main deliverables** | **Search v1** — **must-launch** for production-near path: build **`search-index.json`** + **client** grouped search (pages + FAQ + places-lite). **Places/map** — **real places-lite** (curated records + honest UX; **not** a decorative fake map) for the default &lt;1 month track; placeholder path only with **explicit 0A waiver**. **Updates** on Home/Dashboard/guides per §6; **Plausible + Sentry** per 0B; **SEO** metadata/sitemap baseline; **housing/casino** default **post-launch** unless 0A records ops readiness; **save-path prompts** per §6; mobile **performance sanity**. |
| **Key dependencies** | Phase 3 must-launch content; Phase 0A waiver doc if anything PRD-aligned is deferred. |
| **Decision gates** | Reconcile **PRD DoD** vs **MVP contract**—meet or **document approved gap**. |
| **Exit criteria** | No silent drift between “what we launch” and “what is built.” |
| **Key risks** | Empty search/updates that **look** complete—define **minimum viable utility** in 0A/4. |
| **Classification** | **Required before launch** (for agreed launch bundle) |

---

### Phase 5 — Verification, QA, and release readiness

| Field | Content |
|--------|--------|
| **Objective** | Prove quality, safety, and operability **before** launch approval. |
| **Why it exists** | Trust-heavy product: factual and UX failure modes matter as much as missing features. |
| **Main deliverables** | Responsive QA on core flows; checklist/NBA QA; **trust-layer** QA; **security/privacy** review (guest data, forms, analytics); analytics smoke tests; performance checks; **release checklist** (rollback, monitoring, on-call); triaged bug backlog with **launch-blocker** tags. |
| **Key dependencies** | Phase 4 complete per contract. |
| **Decision gates** | QA sign-off; security/privacy sign-off; product sign-off on **known issues** list. |
| **Exit criteria** | **No open launch-blockers** unless explicitly waived with owner + mitigation. |
| **Key risks** | “Soft launch” without criteria—forbidden without documented waivers. |
| **Classification** | **Required before launch** |

---

### Launch Approval Gate (LAG)

| Field | Content |
|--------|--------|
| **Objective** | Formal **human authorization** to promote to **production**. |
| **Why it exists** | Separates “we tested in staging” from “we accept operational and reputational risk of public launch.” |
| **Main deliverables** | **GO / NO-GO** record with named approvers; **known limitations** communicated; rollback verified once. |
| **Key dependencies** | Phase 5 exit criteria met. |
| **Decision gates** | See **§7**. |
| **Exit criteria** | **GO** recorded; production promotion allowed. |
| **Key risks** | Launch without named owners for monitoring and rollback. |
| **Classification** | **Required before launch** |

---

### Phase 6 — Production deployment and infrastructure hardening

| Field | Content |
|--------|--------|
| **Objective** | **Repeatable** production deployment and **baseline** reliability (see also §8). |
| **Why it exists** | Launch is an operational event: envs, secrets, CI/CD, monitoring, backups. |
| **Main deliverables** | Production + preview/staging; **CI/CD** deploy path; **Docker** only if it serves parity/reliability (§8); monitoring/alerts; backups for content/config; **runbook** (deploy + rollback). |
| **Key dependencies** | **LAG passed**. |
| **Decision gates** | Dry-run deploy to staging; production cutover checklist complete. |
| **Exit criteria** | Production live; monitoring operational; rollback path validated. |
| **Key risks** | First deploy without staging—avoid. |
| **Classification** | **Required before launch** (first production); **ongoing** thereafter |

---

### Phase 7 — Post-launch stabilization and operational maturity

| Field | Content |
|--------|--------|
| **Objective** | Stabilize under real traffic: defects, freshness, funnels, observability tuning. |
| **Why it exists** | Production usage surfaces trust gaps, search gaps, and content staleness planning cannot fully predict. |
| **Main deliverables** | Triage rhythm; patch releases; search/content tuning; **staleness cadence**; observability refinement; **post-fix doc sync** per project update protocol; retrospective on MVP contract for next cycle. |
| **Key dependencies** | Live analytics and feedback channels. |
| **Decision gates** | **Stability gate** before Phase 8: agree criteria (e.g. blocker burn-down, funnel stability window). |
| **Exit criteria** | Agreed stability criteria met; highest-severity issues addressed. |
| **Key risks** | Starting admin/platform work before stabilization—erodes trust. |
| **Classification** | **Post-launch** |

---

### Phase 8 — Admin operations and controlled service expansion

| Field | Content |
|--------|--------|
| **Objective** | **Internal** tooling for content ops and **light** service handling **after** public MVP is stable. |
| **Why it exists** | Admin scope slows MVP; ops still needs a path off manual DB/code edits at scale. |
| **Main deliverables** | Admin **auth** baseline; CRUD for pages, updates, places, sources; **request handling** for housing/casino if those flows are live; **event** CMS when events are a real retention layer; **publish/unpublish**; audit-friendly actions. |
| **Key dependencies** | Phase 7 stability gate. |
| **Decision gates** | Which workflows are **internal-only** vs user-facing; security review for admin surface. |
| **Exit criteria** | Routine content updates do not require engineer for standard publishes. |
| **Key risks** | Underestimating admin security and abuse surface. |
| **Classification** | **Future expansion** (post-stabilization; **not MVP** unless ops cannot ship without it—then escalate via 0A gate) |

---

### Phase 9 — Platform and ecosystem growth

| Field | Content |
|--------|--------|
| **Objective** | Grow from **guide + light personalization** toward **platform** modules only after proof and capacity. |
| **Why it exists** | Protects newcomer-first positioning; jobs/community/partners/maps/stays belong here. |
| **Main deliverables** | Curated job board expansion; employer posting; events/community experiences; partner panels; hostel/stays integrations; richer map/places; ratings/reviews **only** if justified. |
| **Key dependencies** | Phase 8 (or agreed minimal ops), metrics, staffing. |
| **Decision gates** | Per-module **business case** and trust review. |
| **Exit criteria** | Module shows measurable value without eroding trust. |
| **Key risks** | Premature platformization. |
| **Classification** | **Future expansion** |

---

## 6. Explicit MVP boundary

**Default alignment**: `PRD_MVP.md` expects **search basic**, **updates**, **analytics**, and **map lite or credible placeholder**. `DEVELOPMENT_BREAKDOWN.md` allows some items to slip. This matrix **names tiers**. Any intentional downgrade from PRD requires a **Phase 0A waiver** (owner + rationale + date).

**Production-near track (&lt;1 month, `PHASE_0_DECISION_RECORD`):** **Search v1** is **must-launch** (no waiver on default path). **Places-lite** is **real curated `Place` data** at launch (not a fake map). **Docker** is **deferred** for v1 on **Vercel** unless org mandates otherwise.

| Item | Must-launch | Launch-adjacent | Post-launch | Later expansion |
|------|-------------|-----------------|-------------|-----------------|
| **Search v1** (keyword, grouped/typed results) | **Yes** on production-near path (client index: pages + FAQ + places-lite). **Default** for PRD-aligned launch generally | Allowed **only** with 0A waiver + visible fallback (e.g. hub/browse + “search improving”) | Synonyms, ranking tuning, query analytics loops | Semantic / RAG search |
| **Places-lite / map** | **Production-near default:** **real** minimal `Place` data (list/table/cards; honest “not full map” UX). **General matrix:** **or** PRD-grade **credible placeholder** (honest copy + links; no fake map) **only** with documented tier choice | Richer categories, more POIs, filters | Full map platform, deep geo features | Ecosystem / partner locations at scale |
| **Updates surface** | `/updates` **and** at least one **real editorial path** feeding Home/Dashboard (can be thin) | Rich “updates for you” targeting | Automated ingestion, complex workflows | Full enterprise editorial |
| **Housing request** | Only if **ops + privacy + success path** ready before launch | **Typical** tier: simple form + submission capture when backend ready | Partner routing, CRM, SLA tooling | Marketplace / multi-agent |
| **Casino referral** | Only if **legal/privacy + ops** ready | **Typical** tier: simple form when ready | Referrer panels, full tracking | Full service workflow |
| **Analytics** | **Core funnel** events: onboarding, dashboard, primary CTAs, key content views, search usage | Full PRD event list | Deep product analytics program | — |
| **Save path / account prompts** | Guest MVP must stand alone | **Auth + save** when 0B auth path is ready | Reminders, uploads, full persistence | — |
| **City / tourism (`/city`)** | **Not** on PRD §10.1 must-have page list | **Default**: minimal **hub** (intro + links) **or** defer with 0A waiver while keeping nav honest | Rich city content, Yerevan Card, weekend guides | Full tourism / events surface |

---

## 7. Launch approval gate

**What it is**  
The **Launch Approval Gate (LAG)** is a **mandatory checkpoint** authorizing **first production promotion** (and major re-launches if the team adopts the same discipline).

**When it happens**  
After **Phase 5** exit criteria are met and **before** **Phase 6** production cutover.

**Who must approve**  
Record names (roles may be combined on a small team):

- **Product** — scope matches MVP contract; known issues accepted.
- **Engineering** — staging deploy matches release artifact; rollback tested.
- **Content / trust** — sensitive pages meet governance; staleness risk acknowledged.
- **Ops / on-call** — monitoring and incident path defined for launch window.

**What must be true before passing**

1. **Scope**: Must-launch + agreed launch-adjacent items deployed to **staging**; matches written contract (§6).
2. **Defects**: No open **launch-blocker** bugs; waivers documented for any P0/P1 carryover.
3. **Trust**: Source + last verified + variance present on sensitive pages per specs; 0A governance satisfied.
4. **Privacy & security**: Guest data, analytics, forms meet agreed policy; secrets not exposed client-side; baseline security checklist done.
5. **Observability**: Error monitoring + structured logging live in **staging**; production config ready.
6. **Analytics**: Critical events verified end-to-end in non-prod; production keys/projects ready.
7. **Rollback**: Documented rollback or fast revert **exercised once**.
8. **Continuity**: README + doc entry path current; handoff notes for post-launch owner (§10).

**Output**  
Explicit **GO** (with date, version, artifact id) or **NO-GO** with reasons and next steps.

---

## 8. Dockerization, deployment readiness, and infrastructure timing

**Dockerization**

- **Conditional**, not a vanity checkbox. Adopt containers when they clearly improve **environment parity**, **deployment reliability**, or **infra constraints** agreed in Phase 0B.
- **v1 / Vercel production-near path:** **Docker deferred** for first public launch—**not** a launch requirement. Revisit if deploy target shifts to self-hosted/container-only or org policy mandates.
- **Typical timing** (when containers *are* adopted): after stack/hosting is locked—often **Phase 6**, not day one of coding.
- If hosting is **fully managed** without container benefit, Docker may remain **optional** or **dev-only**.

**Deployment planning**

- **Becomes mandatory** once the team approaches **Phase 4–5**: environments (preview/staging/prod), secrets, promotion flow, and rollback must be **designed** even if not fully automated yet.
- **CI/CD** should exist in **minimal form** by end of **Phase 1** (build/test on PR); **deploy automation** hardens through Phases 4–6.

**Infra hardening**

- **Before launch**: secrets management, env separation, error monitoring, logging, backups for content/config, basic uptime checks, privacy-safe analytics.
- **After launch**: alert tuning, SLOs if needed, performance and cost optimization, incident response maturity.

---

## 9. Future admin roadmap

**Default**: **Not MVP.** Phase 8 starts **after Phase 7 stability gate**, unless Phase 0A records **operational impossibility** without minimal admin (rare).

**Intended sequence**

1. **Content/update operations** — publish/unarchive pages, updates, sources, last-verified fields; draft/publish if CMS supports it.
2. **Request handling** — queue or list for housing/casino submissions; status transitions; export or email integration as needed.
3. **Event management** — create/edit/delete events, **publish/unpublish**, schedule metadata; only when events are a **real** product surface.
4. **Operational controls** — feature flags or kill-switches for risky sections; basic moderation if UGC appears (expansion).

**Capabilities to plan for (not all at once)**

- Roles (e.g. editor vs admin); audit log for sensitive changes.
- Staleness / review queue for high-risk categories.

---

## 10. Debuggability, maintainability, and AI continuity

**Goals**  
Make the codebase and docs **navigable**, bugs **traceable**, fixes **documented**, and **AI-assisted sessions** resumable without re-deriving context from chat history.

| Area | Before launch | After launch |
|------|----------------|--------------|
| **README strategy** | Root README: how to run, where routes live, where **product truth** docs are (`docs/02_product/`), link to this roadmap | Update when layout, scripts, or env vars change |
| **Docs index / navigation** | Agree **single entry path** (e.g. `docs/00_ai_context` protocol or strategy index); which doc wins for PRD vs IA vs execution | Keep index in sync when structure changes |
| **Bug intake / severity** | Define **P0/P1/P2** meaning; launch-blocker tag; template or checklist | Weekly triage; postmortems for major incidents |
| **Traceability** | Structured logging, **request/correlation id** where applicable, error monitoring | Dashboards; alert thresholds |
| **Post-fix doc sync** | PRs note **doc impact**; QA spot-check for spec drift | Enforce update protocol for meaningful changes |
| **AI session continuity** | Follow repo **new-chat / context** protocol; log **decisions** in agreed log; keep **HANDOFF** notes for milestones | Refresh context packs per phase; avoid duplicating locked rules in chat |

**Before launch minimum**  
README + doc entry path + logging/monitoring + severity rubric + LAG checklist includes continuity items.

---

## 11. Major decision gates

Summarized **must-decide** items (details locked in Phase 0B unless noted):

| Topic | Gate |
|-------|------|
| **Stack** | Framework, language, TS policy, rendering (SSR/SSG/ISR) |
| **CMS** | Headless CMS vs MDX/git vs hybrid; draft/publish |
| **Auth timing** | Guest-only MVP vs minimal auth for save-path; admin auth in Phase 8 |
| **Guest persistence** | Cookie/session storage, TTL, sync-to-account story |
| **i18n** | Dictionary vs CMS fields; URL strategy with English slugs |
| **Analytics / privacy** | Vendor, PII policy, event list minimum |
| **Search** | Must-launch vs waiver (§6) |
| **Places / map** | Places-lite vs credible placeholder (§6) |
| **Service forms** | MVP vs launch-adjacent vs post-launch; ops readiness |
| **Deploy target** | Host, regions, preview URLs, domain/DNS, SSL |

---

## 12. Risks and blind spots

1. **PRD vs execution cut line tension** — mitigated by §6 + 0A waivers.  
2. **Stack/CMS/auth still open during build** — causes rework across Phases 2–4.  
3. **Content verification bottleneck** — sensitive pages stall launch or ship under-verified.  
4. **Service forms without ops** — creates trust and legal exposure.  
5. **Analytics without governance** — PII or misleading metrics.  
6. **Weak observability at launch** — slow incident response, poor debuggability.  
7. **Airport / transport route duplication** — user confusion if IA not consolidated in 0A.  
8. **City hub** easy to confuse with MVP core—keep scope minimal unless promoted in 0A.  
9. **AI sessions diverging from docs** — mitigated by §10 and decision logging.  
10. **Premature Phase 8/9** — splits focus before newcomer journey is proven stable.

---

## 13. How this roadmap should drive the rest of the docs

| Doc | Role |
|-----|------|
| `ROADMAP_STATUS.md` | Phase progress, dates, % complete vs this roadmap |
| `PROJECT_STATE.md` | Snapshot: current phase, blockers, last gate passed |
| `CURRENT_PHASE.md` (if used) | Short pointer to active phase + exit criteria |
| `CURRENT_FOCUS.md` | Narrow active objective within phase |
| `NEXT_ACTIONS.md` | Next concrete tasks derived from active phase |
| `OPEN_ITEMS.md` | Unresolved questions that **must** map to §11 gates |
| `DEVELOPMENT_BREAKDOWN.md` | Tickets/epics realigned to phases 0A–9 and §6 tiers |
| `ENGINEERING_ARCHITECTURE.md` | Reflects Phase 0B decisions and request/observability paths |
| `RELEASE_PLAN.md` | LAG checklist, versioning, rollback, comms (when created/updated) |

This file remains **strategic source of truth**; downstream docs should **reference** it, not contradict it without an explicit change process.

---

## 14. Next document updates after roadmap approval

**Do not batch-edit in the same step as creating this file**; update in this **recommended order**:

1. `docs/05_execution/DEVELOPMENT_BREAKDOWN.md` — phase mapping, MVP matrix alignment, missing tickets (e.g. `/newcomer/day-one`, `/city`, airport route consolidation).  
2. `docs/04_engineering/ENGINEERING_ARCHITECTURE.md` — replace placeholder with 0B decisions.  
3. `docs/02_product/PRD_MVP.md` — only if DoD and §6 must be synchronized (via formal change, not silent drift).  
4. `docs/02_product/IA_SPEC.md` — if 0A resolves airport/city routing.  
5. `docs/02_product/DATA_CONTENT_MODEL_SPEC.md` — guest persistence, CMS, auth touchpoints.  
6. `docs/01_strategy/ROADMAP_STATUS.md` — initialize from this master roadmap.  
7. `docs/00_ai_context/` — `PROJECT_STATE.md`, `OPEN_ITEMS.md`, `NEXT_ACTIONS.md`, `CURRENT_FOCUS.md` (and `CURRENT_PHASE.md` if used) per team protocol.  
8. `RELEASE_PLAN.md` (if absent, create when approaching Phase 5) — LAG + deploy steps.

---

## 15. Immediate next move

**Sign off** **`PHASE_0_DECISION_RECORD.md`** (or amend explicitly), **assign governance names**, complete **legal/privacy** tick for localStorage + Plausible + Sentry, then mark **0A/0B closed** in **`ROADMAP_STATUS.md`** and **start Phase 1 scaffold** per **`ENGINEERING_ARCHITECTURE.md`**. Recommended technical defaults are already documented for execution—formal approval removes the last gate before build velocity.
