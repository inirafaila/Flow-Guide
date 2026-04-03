---
owner: product
status: active
last_updated: 2026-04-03
source_of_truth: true
---

# Handoff notes

## What changed

- **IA housing route parity (2026-04-03, Phase 1 slice):** **`IA_SPEC.md`** §6.5 shells for **`/housing/request`** (slug **`request`** in **`HOUSING_SLUGS`**) and **`/housing/request/success`** (dedicated **`page.tsx`**). **`ROUTE_TITLES`** entries: “Housing request” / “Housing request follow-up” (neutral—no submission-success copy). No forms or Phase 2 logic.
- **Observability hardening (2026-04-03, Phase 1 slice):** Added **`@sentry/nextjs`** with root **`sentry.client.config.ts`**, **`sentry.server.config.ts`**, **`sentry.edge.config.ts`** — **`Sentry.init` only when DSN env vars are set**; **`src/instrumentation.ts`** loads server/edge configs and exports **`onRequestError`**. **Plausible** does not load in **`next dev`** unless **`NEXT_PUBLIC_PLAUSIBLE_ENABLE_DEV=true`**. Removed unused **`src/lib/observability/sentry-stub.ts`**. **No** structured logging, **no** Phase 1 exit / roadmap closure, **no** product analytics events. See **`ENGINEERING_ARCHITECTURE.md`** §9, **`.env.example`**, **`README.md`**.
- **AI planning protocol (2026-04-03):** Added **`CURSOR_PLANNING_PROTOCOL.md`** — deterministic planning workflow (phase-strict, 2–4 candidates, exit-criteria vs nice-to-have labels, smallest slice, execution-ready output). Wired from **`CURSOR_NEW_CHAT_PROTOCOL.md`**, **`AI_INDEX.md`**, **`AI_WORKING_RULES.md`**, **`UPDATE_PROTOCOL.md`** (new “AI / planning guidance changes” section), and **`.cursor/rules/project-context.mdc`**. No product, roadmap substance, or app code changes.
- **Phase 1 PR CI (2026-04-02):** **`.github/workflows/ci.yml`** now runs **`npm run lint`** → **`npm run test`** → **`npm run build`** after **`npm ci`** (**`pull_request`** to **`main`**, Node **20**, npm cache, **`cancel-in-progress`** unchanged). Phase 1 quality gate only; no deploy/Docker/platform expansion.
- **`DEVELOPMENT_BREAKDOWN.md` (2026-04-02):** Aligned with **`ROADMAP_MASTER`** / **`CURRENT_PHASE`**: canonical phase table + Phase 1 shipped vs remaining; epic headers tagged; §4 marked **legacy** (naming clash called out); §13 gate note; §14 “must-launch ≠ Phase 1”; §18 = Phase 5; §19 **phase gates A–E** + deprecated sprint archive; Ticket **2.2** locale line updated; Epic **7** search split (Phase 1 index vs Phase 4 UX).
- **Phase 1 PR CI (initial slice, 2026-04-02):** First **`.github/workflows/ci.yml`** — **`pull_request`** to **`main`**, Node **20**, **`npm ci`**, **`npm run lint`**, **`npm run build`**, concurrency **`cancel-in-progress`**. (**Vitest** step added same day — see bullet above.)
- **Phase 1 next-intl route repair (2026-04-01):** Moved all route **`page.tsx`** trees under **`src/app/[locale]/`** + thin **`[locale]/layout.tsx`** (`setRequestLocale`, `generateStaticParams`, invalid locale → `notFound`). Fixes **404** on hub routes when middleware rewrites to **`/en/...`** with **`localePrefix: "never"`**. Root **`src/app/layout.tsx`** unchanged (shell + `getLocale` / `getMessages`). **`/transport/airport`** redirect unchanged.
- **Phase 1 i18n (2026-04-01):** Hardened **`src/i18n/request.ts`** (`requestLocale` + locale validation + JSON fallback). Added **`LocaleSwitcher`** in shell + **`setLocaleAction`** (`NEXT_LOCALE` cookie, redirect to current pathname). **`messages/*`** keys aligned; **`src/i18n/messages-parity.test.ts`**. **`?lang=`** not implemented—defer to a later slice if still wanted per `ENGINEERING_ARCHITECTURE` §7.
- **Phase 0 approved** (2026-04-01): [`PHASE_0_DECISION_RECORD.md`](../04_engineering/PHASE_0_DECISION_RECORD.md) `status: approved`, `source_of_truth: true`, new **§0 Approval** summary.
- **Roadmap / context** updated: [`ROADMAP_STATUS.md`](../01_strategy/ROADMAP_STATUS.md) marks **0A/0B done**, **Phase 1 in progress**; [`PROJECT_STATE.md`](PROJECT_STATE.md), [`CURRENT_PHASE.md`](CURRENT_PHASE.md), [`CURRENT_FOCUS.md`](CURRENT_FOCUS.md), [`NEXT_ACTIONS.md`](NEXT_ACTIONS.md), [`OPEN_ITEMS.md`](OPEN_ITEMS.md) aligned.
- **Phase 1 scaffold:** Next.js App Router + TypeScript at repo root — `src/app/` route skeleton (IA list + airport redirect), `src/lib/`, `src/content/`, Plausible/Sentry **stubs**, **no** Phase 2 product logic, **no** auth/CMS/Docker.
- **Phase 1 content plumbing (2026-04-01):** Shared **Zod** validation for `src/content/**/*.md`; **`build-search-index.mjs`** delegates to **`build-search-index.impl.ts`** via **`tsx`**; output **`search-index.json`** validated before write. Cursor **rule** `../../.cursor/rules/docs-update-policy.mdc` (**alwaysApply**); project **skill** `../../.cursor/skills/flow-guide-update-protocol/SKILL.md` (doc routing after meaningful changes).

## Repository reality

- **Implementation** is **Phase 1 in progress** — content/search **index pipeline is no longer a loose stub**; **i18n plumbing + header locale UX** shipped (see above). **Sentry/Plausible env-gated wiring** shipped (2026-04-03). **PR CI (lint + test + build)** is in place for **`main`**. Remaining Phase 1 items include **full exit checklist** in `CURRENT_PHASE.md` (and any further schema/IA confirmation per breakdown)—**not** Phase 1 marked done in this slice.
- **`DEVELOPMENT_BREAKDOWN.md`** is **phase-aligned** with the master roadmap (2026-04-02); use it with the **Canonical roadmap phases** section at the top of that file.

## What the next session should do

1. Read **`CURSOR_NEW_CHAT_PROTOCOL.md`**, **`PROJECT_STATE.md`**, **`CURRENT_PHASE.md`**, **`ENGINEERING_ARCHITECTURE.md`**, **`NEXT_ACTIONS.md`**. If the user wants **planning or prioritization**, follow **`CURSOR_PLANNING_PROTOCOL.md`** first.
2. Continue **Phase 1** until exit criteria in `CURRENT_PHASE.md` — then mark Phase 1 **done** in `ROADMAP_STATUS.md` and begin **Phase 2**.
3. Before prod: close **`OPEN_ITEMS.md`** (legal, governance names, env projects).
4. Before commit/push: run **`npm run lint`**, **`npm run test`**, **`npm run build`** locally.

## Still incomplete / watch

- Replace placeholder research **`.docx`** with a repo-readable export when available (ops, not blocking Phase 1).
