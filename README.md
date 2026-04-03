---
owner: engineering
status: active
last_updated: 2026-04-04
source_of_truth: false
---

# Flow-guide

Web app for **newcomers to Armenia**: sequenced guidance, **source-backed** content, **guest-first** access, **dashboard**-centric next actions.

## AI / collaborator start

1. Read `docs/00_ai_context/CURSOR_NEW_CHAT_PROTOCOL.md`
2. Skim `docs/00_ai_context/PROJECT_STATE.md` and `NEXT_ACTIONS.md`

## Documentation map

| Area | Path |
|------|------|
| AI context | `docs/00_ai_context/` |
| Strategy | `docs/01_strategy/` |
| Product | `docs/02_product/` |
| Design | `docs/03_design/` |
| Engineering | `docs/04_engineering/` |
| Execution | `docs/05_execution/` |
| Research | `docs/06_research/` |

## Project status

- **Product specs:** present (PRD, IA, data model, UI handoff, breakdown).
- **Phase 0:** approved — `docs/04_engineering/PHASE_0_DECISION_RECORD.md`.
- **Phase 1 (current):** Next.js **15** App Router + **TypeScript** + **React 19** + **`next-intl`** — routes under **`src/app/[locale]/`** (internal locale segment; **browser URLs stay unprefixed** per architecture). **Plumbing only:** no auth, no headless CMS, no Docker, no Phase 2 product logic (NBA/checklist/guest behavior).
- **Roadmap:** `docs/01_strategy/ROADMAP_MASTER.md` (strategy); `docs/01_strategy/ROADMAP_STATUS.md` (phase status).

## Local development

Requires **Node 20.9+**.

```powershell
npm install
npm run dev
```

`npm run dev` runs **`predev`** first → refreshes **`public/search-index.json`** for local `/search` stub.

Open [http://localhost:3000](http://localhost:3000). **`/transport/airport`** redirects to **`/newcomer/airport-to-city`** (canonical airport route). Use the header **language** control to switch **en / fa / ru** (persists **`NEXT_LOCALE`**; **`fa`** uses RTL).

```powershell
npm run lint   # ESLint (next/core-web-vitals) on src/
npm run test   # Vitest — schema unit tests
npm run build
```

`npm run build` runs **`prebuild`** → `scripts/build-search-index.mjs` (runs **`tsx`** on `scripts/build-search-index.impl.ts` for shared Zod validation) → writes **`public/search-index.json`** (gitignored; recreated each build). Next also type-checks during build.

**Optional env:** copy `.env.example` to `.env.local`. **Plausible:** set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` for production builds; in `next dev` the script does **not** load unless `NEXT_PUBLIC_PLAUSIBLE_ENABLE_DEV=true`. **Sentry:** set `SENTRY_DSN` and/or `NEXT_PUBLIC_SENTRY_DSN` when ready; with no DSNs, the SDK stays uninitialized.

**Server logs:** structured **one JSON object per line** from `src/lib/observability/logger.ts` (e.g. after instrumentation runs on the server). Not a hosted log platform — Vercel/host stdout only.

**Docs:** `docs/04_engineering/ENGINEERING_ARCHITECTURE.md`, `docs/04_engineering/PHASE_0_DECISION_RECORD.md`, `docs/01_strategy/ROADMAP_MASTER.md`, `docs/00_ai_context/PROJECT_STATE.md`, `docs/00_ai_context/AI_INDEX.md`.

## Changelog

See `CHANGELOG.md`.

## License

_TBD_
