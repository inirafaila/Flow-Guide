---
owner: product
status: active
last_updated: 2026-04-01
source_of_truth: true
---

# Current focus

**Phase 1 only** — engineering and content **plumbing** (see [`ROADMAP_MASTER.md`](../01_strategy/ROADMAP_MASTER.md) Phase 1).

1. **Route skeleton** — All IA routes from the scaffold list live under `src/app/` with shared layout/shell; **`/transport/airport` → `/newcomer/airport-to-city`** (middleware).
2. **Content layer** — `src/content/` Markdown + YAML frontmatter; **`src/lib/content/`** loaders + **Zod** schemas (stubs extensible to full `DATA_CONTENT_MODEL_SPEC.md`).
3. **Search pipeline stub** — `scripts/build-search-index.mjs` → **`public/search-index.json`**; `/search` page loads JSON only as **Phase 1 placeholder** (no real search UX).
4. **Observability stubs** — Plausible script gated on env; Sentry init stub / TODO per `ENGINEERING_ARCHITECTURE.md` (no production DSN required yet).
5. **Quality baseline** — **`npm run lint`** (ESLint on `src/`), **`npm run build`**, **`npm run test`** (Vitest); **README** run instructions.

**Explicitly not in focus:** NBA, checklist, `localStorage` guest **behavior**, auth, forms, headless CMS, Docker, real grouped search UI, admin.
