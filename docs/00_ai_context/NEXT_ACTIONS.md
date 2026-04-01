---
owner: product
status: active
last_updated: 2026-04-02
source_of_truth: true
---

# Next actions

## Now (Phase 1 scaffold)

- **Shipped:** Git Markdown + YAML under `src/content/**` is validated at build time (shared **Zod** + `src/lib/content/parse-md.ts`); **`public/search-index.json`** is emitted from validated records via **`node scripts/build-search-index.mjs`** → **`tsx`** + `scripts/build-search-index.impl.ts` (invalid frontmatter **fails** `prebuild`). **`/search`** remains a Phase 1 placeholder (fetch + count only).
- **Shipped (routing + i18n):** App routes under **`src/app/[locale]/`** aligned with **`next-intl`** middleware internal rewrite (public URLs still unprefixed).
- **Shipped (i18n, Phase 1 UI-only):** **`next-intl`** request config uses middleware **`requestLocale`** + validated fallback; **`messages/{en,fa,ru}.json`** stay in parity (Vitest key-tree check); header **locale switcher** persists **`NEXT_LOCALE`** via server action (`src/i18n/set-locale.ts`). Optional **`?lang=`** query handling **deferred** (low priority vs middleware-order risk).
- **Shipped (CI, Phase 1):** **GitHub Actions** **`.github/workflows/ci.yml`** — on **pull requests to `main`**: **`npm ci`**, **`npm run lint`**, **`npm run build`** (concurrency cancel in-flight). **`npm run test`** not in CI for this slice (local / optional stricter gate later).
- Run **`npm install`** (pulls **tsx** devDependency), then **`npm run dev`** / **`npm run lint`**, **`npm run test`**, **`npm run build`** from repo root before merge.
- Fill **placeholder copy** on hub pages only where needed for sanity checks; keep **no** trust/legal claims until content review.
- When tightening `src/lib/schemas/content-page.ts`, keep sample Markdown under `src/content/pages/` and `src/content/faq/` passing validation.
- **Done (docs, 2026-04-02):** **`DEVELOPMENT_BREAKDOWN.md`** reconciled with **`ROADMAP_MASTER`** phase boundaries — Phase 1 shipped/remaining, epic tags, §14 launch vs phase note, §19 phase gates (legacy sprints deprecated).

## Next

- Optional later: add **`npm run test`** to the same workflow if the team wants CI parity with **`CURRENT_PHASE.md`** / roadmap “lint/test/build” wording.

## After Phase 1 exit

- **Phase 2** — onboarding flow, guest state read/write, dashboard stubs → real behavior, trust blocks, per `ROADMAP_MASTER.md`.

## Blockers

- None for **Phase 1** engineering—**pre-prod** items remain in [`OPEN_ITEMS.md`](OPEN_ITEMS.md) (legal, governance names, LAG).
