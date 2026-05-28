---
owner: product
status: active
last_updated: 2026-05-28
source_of_truth: true
---

# Handoff notes

## What changed (latest first)

- **Phase 4 exit — PRD/MVP reconciliation (2026-05-28):** Published [`MVP_LAUNCH_CONTRACT.md`](../02_product/MVP_LAUNCH_CONTRACT.md) (operational launch interpretation, waivers W-001–W-011). `ROADMAP_STATUS` Phase 4 → **Done**; **Phase 5 active**. No `src/` changes. **Next:** Phase 5 QA per [`EXECUTION_ROADMAP.md`](../05_execution/EXECUTION_ROADMAP.md) §5.
- **Phase 4 — Slice 4.7 — Performance sanity (2026-05-28):** Six-route audit; 0 code fixes; [`PERF_SANITY_4_7_REPORT.md`](../05_execution/PERF_SANITY_4_7_REPORT.md).
- **Phase 4 — Slice 4.6 — Dashboard enhancement / Resume & reach (2026-05-31):** Re-entry intro, quick actions, updates block (≤3 rows); no status card (W-001).
- **Phase 4 — Slices 4.1–4.5:** Search v1, updates, places-lite, analytics (6 events), SEO — see prior bullets in git history / `NEXT_ACTIONS.md`.
- **Phase 3 exit (2026-05-27):** Groups A–I complete; Phase 3 closed.

## Repository reality

- **Phases 1–4** done (2026-05-28). **Phase 5** QA active.
- Guest-first MVP: onboarding → dashboard (NBA + checklist + quick actions + updates) → guides with trust; search; `/updates`; places-lite on 3 guides.
- **329** Vitest tests; lint/test/build green (last verified Phase 4.7).
- Launch scope truth: [`MVP_LAUNCH_CONTRACT.md`](../02_product/MVP_LAUNCH_CONTRACT.md). **Phase 4 Done ≠ production launch.**

## What the next session should do

1. Read **`CURRENT_PHASE.md`** (Phase 5) and **`MVP_LAUNCH_CONTRACT.md`** before proposing work.
2. Run **Phase 5 QA** slices from [`EXECUTION_ROADMAP.md`](../05_execution/EXECUTION_ROADMAP.md) §5 — fixes only for launch-blockers; deferrals stay in contract.
3. Keep **OPEN_ITEMS** / LAG separate from feature scope.
4. Before commit (if code changes in QA): `npm run lint`, `npm run test`, `npm run build`.

## Still incomplete / watch

- **OPEN_ITEMS.md** — governance names, legal/privacy, production Sentry/Plausible (LAG gates).
- **Prod env** — `NEXT_PUBLIC_SITE_URL` for canonicals/sitemap at deploy time.
