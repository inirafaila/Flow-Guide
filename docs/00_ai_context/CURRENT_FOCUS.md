---
owner: product
status: active
last_updated: 2026-05-28
source_of_truth: true
---

# Current focus

**Phase 5** — **Verification, QA, and release readiness** (see [`ROADMAP_MASTER.md`](../01_strategy/ROADMAP_MASTER.md) Phase 5). Phase 4 utility work is **complete** (2026-05-28). Operational launch scope: [`MVP_LAUNCH_CONTRACT.md`](../02_product/MVP_LAUNCH_CONTRACT.md).

## Phase 5 priorities (from execution plan)

1. **Responsive QA** — must-launch routes on mobile/tablet/desktop ([`EXECUTION_ROADMAP.md`](../05_execution/EXECUTION_ROADMAP.md) §5.1, [`QA_CHECKLIST.md`](../05_execution/QA_CHECKLIST.md)).
2. **Trust / source QA** — sensitive guides show trust blocks; sources present where required.
3. **Navigation / routing QA** — IA paths, airport redirect, locale switcher, no 404 on contract routes.
4. **Security / privacy review** — guest blob, `NEXT_PUBLIC_*` only, Plausible/Sentry policy vs [`OPEN_ITEMS.md`](OPEN_ITEMS.md).
5. **Analytics smoke** — six funnel events + pageviews in preview/staging.
6. **Content completeness spot-check** — cross-links, no user-visible Phase 1 shells on content routes.
7. **Release readiness** — known-issues list, rollback note, handoff for post-launch owner.

**Do not** bundle new MVP features into Phase 5. Defects found here are **fixes or waivers**, not scope expansion.

## Phase 4 shipped (reference)

- **4.1–4.7:** Search, updates, places-lite, analytics, SEO, dashboard resume & reach, perf sanity — see [`HANDOFF_NOTES.md`](HANDOFF_NOTES.md).
- **Exit:** [`MVP_LAUNCH_CONTRACT.md`](../02_product/MVP_LAUNCH_CONTRACT.md) (waivers W-001–W-011).

## Explicitly deferred (not Phase 5 unless defect)

- Residency status card, alerts, Home updates preview, auth/save-path, checklist status persistence, housing/casino form POST, `/city` content + nav — see contract waivers and [`UI_STATES.md`](UI_STATES.md).

## Pre-LAG (parallel track, not Phase 5 code)

- Content governance names, legal/privacy sign-off, production Plausible/Sentry projects — [`OPEN_ITEMS.md`](OPEN_ITEMS.md).
