---
owner: product
status: active
last_updated: 2026-04-01
source_of_truth: true
---

# Next actions

## Now (Phase 1 scaffold)

- Run **`npm install`** and **`npm run dev`** from repo root; confirm **lint** and **build** pass (`npm run lint`, `npm run build` — build runs **`prebuild`** → search index).
- Fill **placeholder copy** on hub pages only where needed for sanity checks; keep **no** trust/legal claims until content review.
- Keep **sample** Markdown under `src/content/pages/` and `src/content/faq/` in sync with **`DATA_CONTENT_MODEL_SPEC.md`** as schemas tighten (samples already exercise the search-index script).

## Next

- **Wire `next-intl`** for **fa/ru** message files (parity with `messages/en.json`) and locale cookie UX when ready—still Phase 1 if UI-only.
- **CI** — GitHub Actions (or Vercel-only checks): `lint` + `build` on PR.
- Reconcile **`DEVELOPMENT_BREAKDOWN.md`** epic labels with **Phase 1** tickets (route list, content pipeline, search stub).

## After Phase 1 exit

- **Phase 2** — onboarding flow, guest state read/write, dashboard stubs → real behavior, trust blocks, per `ROADMAP_MASTER.md`.

## Blockers

- None for **Phase 1** engineering—**pre-prod** items remain in [`OPEN_ITEMS.md`](OPEN_ITEMS.md) (legal, governance names, LAG).
