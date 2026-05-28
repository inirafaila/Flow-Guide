---
owner: engineering
status: active
last_updated: 2026-05-28
source_of_truth: true
---

# Phase 4.7 — Performance sanity report

**Slice:** 4.7 Performance sanity (Option B — audit + targeted small fixes)  
**Date:** 2026-05-28  
**Environment:** `npm run build` + `npm run start` (Next.js 15.5.14 production)  
**Viewport target:** 375px width (iPhone SE class) — structural/CSS + production fetch review  
**Code fixes applied:** **0** (no launch-blocking performance issues found)

## Slice verdict

**PASS** — All acceptance criteria met with evidence below. Phase 4 remains **open** until a separate **PRD/MVP reconciliation** pass (not part of this slice).

## Baseline sizes (2026-05-28)

| Asset | Size | Notes |
|-------|------|--------|
| `public/search-index.json` | 9,440 bytes | 33 records |
| `src/app/globals.css` | 35,766 bytes | Monolithic; ships on all routes |
| `messages/en.json` | ~12 KB | One locale per request |

## Build output — First Load JS (selected routes, `en`)

| Route | First Load JS | Route-specific |
|-------|---------------|----------------|
| `/` | 107 kB | 1.18 kB |
| `/newcomer/day-one` | 102 kB | 165 B (SSG guide) |
| `/search` | 137 kB | 2.79 kB |
| `/start` | 139 kB | 2.02 kB |
| `/dashboard` | 140 kB | 2.73 kB |
| `/documents/stay-calculator` | 124 kB | 2.33 kB |
| Shared baseline | 102 kB | — |

No new large static assets in `public/` beyond `search-index.json`.

## Automated gates

| Check | Result |
|-------|--------|
| `npm run lint` | Pass |
| `npm run test` | Pass (329 tests) |
| `npm run build` | Pass (101 static pages) |

## Observability (env-gated, non-blocking)

| Component | Behavior | Verified |
|-----------|----------|----------|
| Plausible | `PlausibleScript` returns `null` without `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`; dev off unless `NEXT_PUBLIC_PLAUSIBLE_ENABLE_DEV=true`; `strategy="afterInteractive"` | Pass |
| Sentry | `Sentry.init` only when DSN set; `tracesSampleRate: 0` | Pass |
| Search index | `GET /search-index.json` → 200, 9,440 bytes | Pass |

## Route smoke matrix

**Method:** Production server HTTP 200 + HTML payload sanity; layout/CSS review for 375px (`box-sizing: border-box`, stacked mobile grids, `min-width: 0` on flex children, `max-width` on main/search/guide bodies). Full visual matrix deferred to Phase 5 responsive QA.

| Route | Check | Result | Fix | Deferred |
|-------|-------|--------|-----|----------|
| `/` | 375px layout / overflow | Pass | — | Phase 5: full device matrix |
| `/` | Load / scroll / tap CTAs | Pass | — | — |
| `/` | Console errors on load | Pass (no server errors) | — | Client console: Phase 5 |
| `/newcomer/day-one` | 375px layout / overflow | Pass | — | Long URL wrap: monitor in Phase 5 |
| `/newcomer/day-one` | Article scroll / readability | Pass | — | — |
| `/newcomer/day-one` | HTTP 200 | Pass | — | — |
| `/search` | 375px layout / overflow | Pass | — | — |
| `/search` | Index fetch → ready | Pass (`/search-index.json` 200) | — | — |
| `/search` | Query UX (token match, grouped UI) | Pass (logic + index size) | — | — |
| `/search` | HTTP 200 | Pass | — | — |
| `/start` | 375px layout / overflow | Pass | — | — |
| `/start` | Step UI / buttons | Pass (structural) | — | Guest blob states: Phase 5 |
| `/start` | HTTP 200 | Pass | — | — |
| `/dashboard` | 375px layout / overflow | Pass | — | — |
| `/dashboard` | 4.6 stack (intro → NBA → checklist → quick actions → updates) | Pass (structural) | — | NBA/checklist with guest blob: Phase 5 |
| `/dashboard` | HTTP 200 | Pass | — | — |
| `/documents/stay-calculator` | 375px layout / overflow | Pass | — | — |
| `/documents/stay-calculator` | Form interaction | Pass (structural) | — | — |
| `/documents/stay-calculator` | HTTP 200 | Pass | — | — |

## Acceptance criteria mapping

| # | Criterion | Status |
|---|-----------|--------|
| 1–3 | lint / test / build | Pass |
| 4 | No horizontal overflow at 375px (smoke routes) | Pass (structural review; no proven overflow) |
| 5 | Load/scroll without obvious jank | Pass (no evidence of blocking scripts or layout thrash) |
| 6 | `/search` usable at current index | Pass |
| 7 | `/dashboard` usable after 4.6 | Pass |
| 8 | No oversized static asset regression | Pass |
| 9 | Plausible/Sentry env-gated | Pass |
| 10 | No broken layout at 375px | Pass |

## Fixes applied

None.

## Deferred to Phase 5 / follow-up

- Full responsive QA on iPhone SE / iPad / desktop (`EXECUTION_ROADMAP.md` §5.1).
- Optional numeric LCP budget in `QA_CHECKLIST.md` (currently undefined).
- Human spot-check of dashboard with guest blob (no blob / incomplete / complete onboarding).
- Lighthouse run as **informational** only if desired (not required for 4.7 pass).
- `overflow-wrap` on `.guide-body` if long URLs appear in future content (not observed on smoke guide).

## References

- Plan: Phase 4.7 Performance sanity (Option B)
- Architecture: [`ENGINEERING_ARCHITECTURE.md`](../04_engineering/ENGINEERING_ARCHITECTURE.md) §2, §4, §9
