---
owner: engineering
status: active
last_updated: 2026-04-01
source_of_truth: true
---

# Engineering architecture

**MVP / production-near (v1).** Aligns with [`PHASE_0_DECISION_RECORD.md`](PHASE_0_DECISION_RECORD.md) and [`ROADMAP_MASTER.md`](../01_strategy/ROADMAP_MASTER.md). **Guest-first** and **trust metadata** are preserved; **no headless CMS** in v1—content stays **git-based**, **CMS-ready** for a future swap.

## 1. Framework

- **Next.js** (App Router) + **TypeScript** + **React**.
- **Node** version: **`package.json` `engines.node`** (currently `>=20.9.0`); align with Next LTS if upgraded.

## 2. Rendering model

- **Content routes** (hubs, guides, calculators, utilities, FAQ, updates pages): **SSG** via static generation from content; use **ISR** (`revalidate`) only where editorial freshness justifies it—**default long TTL or on-demand revalidate** to reduce ops churn before launch.
- **Interactive surfaces** (onboarding, dashboard, search UI, checklist): **client components** reading **localStorage** guest state and public JSON indices; no SSR requirement for personalization in v1.
- **Route Handlers** (`app/api/...`): minimal use (e.g. form submit, optional webhooks)—**no** heavy BFF for read paths in v1.

## 3. Content pipeline

- **Format:** **Markdown (`.md`) + YAML frontmatter** in repo (`content/` or `src/content/`), **build-time validation** (e.g. Zod) against fields aligned to `DATA_CONTENT_MODEL_SPEC.md`.
- **Render:** `remark` / `rehype` (or equivalent) → HTML; **no MDX** required for v1.
- **CMS:** **not** introduced for this launch; keep **typed content layer** and **clear module boundaries** (`lib/content/*`) so a headless CMS can **replace loaders later** without rewriting UI templates.
- **Updates / places:** same pipeline—updates as content type; places as **data** (MD + frontmatter or small JSON) for **places-lite**.
- **Governance fields (sensitive pages):** frontmatter aligned to `DATA_CONTENT_MODEL_SPEC.md`—**source**, **`last_verified`**, **`what_may_vary`** (or equivalent); human **owner/reviewer** and **90d / 14d** cadence per [`PHASE_0_DECISION_RECORD.md`](PHASE_0_DECISION_RECORD.md) §3.5.

## 4. Search (must-launch)

- **Index (build time):** emit `search-index.json` from validated content: **pages** (title, summary, slug, category, type, tags/aliases), **FAQ** entries (question + excerpt), **places-lite** rows when real place data exists.
- **Runtime:** **client-side** **FlexSearch** or **Fuse.js** on `/search`; **grouped results** by type (guides, FAQ, places, …) per PRD.
- **Scale:** acceptable for v1 corpus size; revisit server-side or hosted search if index size or privacy policy changes.

## 5. Guest persistence

- **Storage:** single **`localStorage`** key (e.g. `flowguide_guest_v1`); JSON includes **`schemaVersion`**, onboarding fields, checklist statuses, `createdAt`, **`lastActiveAt`** (sliding **90-day** TTL—refresh on session use).
- **Expiry:** on TTL or schema mismatch, **clear blob**; user re-onboards.
- **Auth:** **deferred** for v1 launch path; **future default:** **Auth.js (NextAuth v5)** when account/save-path ships—**POST** merge guest blob, server wins on conflict for checklist (per decision record).

## 6. Auth (v1)

- **None** for public MVP launch beyond UI placeholders / “save later” copy.
- **Provider choice** explicitly **not** blocking Phase 1–2 implementation.

## 7. Internationalization

- **`next-intl`** (or equivalent): **dictionaries** `messages/{fa,en,ru}.json`.
- **URLs:** **English-first slugs only** (no locale prefix); locale via **`NEXT_LOCALE` cookie** (optional `?lang=` for sharing).
- **RTL:** `fa` layout/CSS.

## 8. Hosting and deploy

- **Vercel:** **Production** + **Preview** deployments (preview = staging).
- **Domain / DNS / TLS:** via Vercel project settings.
- **Docker:** **deferred for this launch**; Vercel build does not require a `Dockerfile`. Revisit only if **hosting target changes** to container-only or self-hosted Node.

## 9. Observability

- **Errors:** **Sentry** Next.js SDK in **preview + production**; PII scrubbing; releases tied to **git SHA**.
- **Analytics:** **Plausible** (script + goals/events as needed for funnel); keep event surface **minimal** for speed and compliance review.
- **Logging:** **structured `console` / server logs** in Route Handlers; avoid noisy client logging in production.

## 10. Environment strategy

| Tier | Use |
|------|-----|
| **Local** | `.env.local` (gitignored) |
| **Preview** | Vercel Preview env vars |
| **Production** | Vercel Production secrets |

- **`NEXT_PUBLIC_*`:** only non-secret config.
- **Sentry DSN, Plausible domain,** any form secrets: **server or build-time only** where applicable—never embed secrets in client bundles.

## 11. High-level request / data flow

```text
User → CDN (static HTML/JS) → App Router page
                    ↓
Content: build-validated MD → SSG page
                    ↓
Guest state: read/write localStorage (client)
                    ↓
Search: fetch search-index.json → client index query → grouped UI
                    ↓
Forms (post-launch or minimal): POST Route Handler → email/webhook/external store
```

## 12. Routing note (airport)

- **Canonical:** `/newcomer/airport-to-city`. **`/transport/airport` → redirect** to canonical (per `PHASE_0_DECISION_RECORD.md`).

## 13. Related docs

- Folder layout: [`FOLDER_STRUCTURE.md`](FOLDER_STRUCTURE.md)
- Product contracts: `docs/02_product/*`
- Master roadmap: `docs/01_strategy/ROADMAP_MASTER.md`
