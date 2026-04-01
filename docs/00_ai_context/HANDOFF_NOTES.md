---
owner: product
status: active
last_updated: 2026-04-01
source_of_truth: true
---

# Handoff notes

## What changed

- **Phase 1 next-intl route repair (2026-04-01):** Moved all route **`page.tsx`** trees under **`src/app/[locale]/`** + thin **`[locale]/layout.tsx`** (`setRequestLocale`, `generateStaticParams`, invalid locale → `notFound`). Fixes **404** on hub routes when middleware rewrites to **`/en/...`** with **`localePrefix: "never"`**. Root **`src/app/layout.tsx`** unchanged (shell + `getLocale` / `getMessages`). **`/transport/airport`** redirect unchanged.
- **Phase 1 i18n (2026-04-01):** Hardened **`src/i18n/request.ts`** (`requestLocale` + locale validation + JSON fallback). Added **`LocaleSwitcher`** in shell + **`setLocaleAction`** (`NEXT_LOCALE` cookie, redirect to current pathname). **`messages/*`** keys aligned; **`src/i18n/messages-parity.test.ts`**. **`?lang=`** not implemented—defer to a later slice if still wanted per `ENGINEERING_ARCHITECTURE` §7.
- **Phase 0 approved** (2026-04-01): [`PHASE_0_DECISION_RECORD.md`](../04_engineering/PHASE_0_DECISION_RECORD.md) `status: approved`, `source_of_truth: true`, new **§0 Approval** summary.
- **Roadmap / context** updated: [`ROADMAP_STATUS.md`](../01_strategy/ROADMAP_STATUS.md) marks **0A/0B done**, **Phase 1 in progress**; [`PROJECT_STATE.md`](PROJECT_STATE.md), [`CURRENT_PHASE.md`](CURRENT_PHASE.md), [`CURRENT_FOCUS.md`](CURRENT_FOCUS.md), [`NEXT_ACTIONS.md`](NEXT_ACTIONS.md), [`OPEN_ITEMS.md`](OPEN_ITEMS.md) aligned.
- **Phase 1 scaffold:** Next.js App Router + TypeScript at repo root — `src/app/` route skeleton (IA list + airport redirect), `src/lib/`, `src/content/`, Plausible/Sentry **stubs**, **no** Phase 2 product logic, **no** auth/CMS/Docker.
- **Phase 1 content plumbing (2026-04-01):** Shared **Zod** validation for `src/content/**/*.md`; **`build-search-index.mjs`** delegates to **`build-search-index.impl.ts`** via **`tsx`**; output **`search-index.json`** validated before write. Cursor **rule** `../../.cursor/rules/docs-update-policy.mdc` (**alwaysApply**); project **skill** `../../.cursor/skills/flow-guide-update-protocol/SKILL.md` (doc routing after meaningful changes).

## Repository reality

- **Implementation** is **Phase 1 in progress** — content/search **index pipeline is no longer a loose stub**; **i18n plumbing + header locale UX** shipped (see above). Remaining Phase 1 items include observability hardening, CI, and full exit checklist in `CURRENT_PHASE.md`.
- **`DEVELOPMENT_BREAKDOWN.md`** should be reconciled to Phase 1 tickets when convenient.

## What the next session should do

1. Read **`CURSOR_NEW_CHAT_PROTOCOL.md`**, **`PROJECT_STATE.md`**, **`CURRENT_PHASE.md`**, **`ENGINEERING_ARCHITECTURE.md`**, **`NEXT_ACTIONS.md`**.
2. Continue **Phase 1** until exit criteria in `CURRENT_PHASE.md` — then mark Phase 1 **done** in `ROADMAP_STATUS.md` and begin **Phase 2**.
3. Before prod: close **`OPEN_ITEMS.md`** (legal, governance names, env projects).
4. Before commit/push: run **`npm run lint`**, **`npm run test`**, **`npm run build`** locally.

## Still incomplete / watch

- Replace placeholder research **`.docx`** with a repo-readable export when available (ops, not blocking Phase 1).
