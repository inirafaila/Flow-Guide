---
owner: engineering
status: active
last_updated: 2026-05-30
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

- **Format:** **Markdown (`.md`) + YAML frontmatter** in repo (`content/` or `src/content/`), **build-time validation** with **Zod** (`src/lib/schemas/content-page.ts` + `src/lib/content/parse-md.ts`) aligned to `DATA_CONTENT_MODEL_SPEC.md`. Invalid frontmatter **fails** the search-index prebuild step.
- **Render:** `remark` / `rehype` (or equivalent) → HTML; **no MDX** required for v1.
- **CMS:** **not** introduced for this launch; keep **typed content layer** and **clear module boundaries** (`lib/content/*`) so a headless CMS can **replace loaders later** without rewriting UI templates.
- **Updates / places:** same pipeline—updates as content type; places as **data** (MD + frontmatter or small JSON) for **places-lite**.
- **Governance fields (sensitive pages):** frontmatter aligned to `DATA_CONTENT_MODEL_SPEC.md`—**source**, **`last_verified`**, **`what_may_vary`** (or equivalent); human **owner/reviewer** and **90d / 14d** cadence per [`PHASE_0_DECISION_RECORD.md`](PHASE_0_DECISION_RECORD.md) §3.5.

## 4. Search (must-launch)

- **Index (build time):** `npm run build` / `predev` run **`node scripts/build-search-index.mjs`**, which executes **`scripts/build-search-index.impl.ts`** via **`tsx`** (devDependency) so the build reuses the same Zod paths as the app. Output: **`public/search-index.json`** validated with `src/lib/schemas/search-index.ts` — **pages**, **FAQ**, synthetic **stay-calculator**, and **active places** (`loadPlaceItems` → `group: places`, `href` = parent guide).
- **Runtime:** **client-side** token/substring match on `/search` over fetched JSON (no search library at current corpus size); **grouped results** by `group` (`guides`, `tools`, `faq`, `places` when indexed) per PRD.
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
- **URLs:** **English-first slugs only** (no locale prefix); locale via **`NEXT_LOCALE` cookie** (optional `?lang=` for sharing — **not implemented in app middleware yet**; cookie + header switcher only).
- **Request resolution:** `src/i18n/request.ts` uses **`getRequestConfig`** + **`await requestLocale`** (from `next-intl` middleware), validated against `src/i18n/routing.ts` `locales`, with JSON import fallback to `en`. Shell **locale switcher** posts **`setLocaleAction`** (`src/i18n/set-locale.ts`) to set the cookie and redirect.
- **App Router mapping:** With **`localePrefix: "never"`**, middleware **internally rewrites** to **`/{locale}/...`** (e.g. `/en/search`). Route modules therefore live under **`src/app/[locale]/...`**; **`src/app/[locale]/layout.tsx`** calls **`setRequestLocale`** + **`generateStaticParams`** for `en`/`fa`/`ru`. **Public URLs** remain unprefixed (`/search`, …).
- **RTL:** `fa` layout/CSS.
- **App shell (Phase 1):** Root **`src/app/layout.tsx`** wraps pages with **`SiteHeader`** / **`SiteFooter`**. **`SiteHeaderChrome`** (client) provides **mobile** drawer navigation for the IA link set below **48rem**; **`LocaleSwitcher`** stays in the header on small viewports; desktop uses inline primary nav (no Phase 2 product logic). **Shared UI baseline (Phase 1):** minimal CSS tokens in **`src/app/globals.css`** (`--space-*`, `--radius-*`, `--text-*`, `--surface-muted`, existing neutrals); thin primitives **`Button`**, **`Card`**, **`SectionHeader`** in **`src/components/ui/`** used by the shell, locale controls, and page-type template placeholders only—not a full design system.

## 8. Hosting and deploy

- **Vercel:** **Production** + **Preview** deployments (preview = staging).
- **Domain / DNS / TLS:** via Vercel project settings.
- **Docker:** **deferred for this launch**; Vercel build does not require a `Dockerfile`. Revisit only if **hosting target changes** to container-only or self-hosted Node.

## 9. Observability

- **Errors:** **`@sentry/nextjs`** with root **`sentry.client.config.ts`**, **`sentry.server.config.ts`**, **`sentry.edge.config.ts`**. **`Sentry.init`** runs only when **`NEXT_PUBLIC_SENTRY_DSN`** (client) and/or **`SENTRY_DSN`** / **`NEXT_PUBLIC_SENTRY_DSN`** (server + edge) are set—otherwise local and CI stay no-op. **`src/instrumentation.ts`** registers server/edge configs and exports **`onRequestError`** (`Sentry.captureRequestError`). Phase 1 wiring uses **`sendDefaultPii: false`** and **`tracesSampleRate: 0`** until performance/error policy is expanded; **release** / source-map upload can follow pre-launch (`withSentryConfig`, auth token) per Sentry docs.
- **Analytics:** **Plausible** via **`PlausibleScript`** when **`NEXT_PUBLIC_PLAUSIBLE_DOMAIN`** is set; in **`next dev`**, the script does **not** load unless **`NEXT_PUBLIC_PLAUSIBLE_ENABLE_DEV=true`**. Optional **`NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC`** for self-hosted Plausible. **`PlausiblePageview`** fires **`pageview`** on App Router client navigations (skips first mount). **Custom events:** six allowlisted funnel events via **`src/lib/analytics/track-event.ts`** — no raw search queries, no guest blob fields, no route paths in NBA props (`checklist_item_slug` only). **Legal/privacy** sign-off and production Plausible project remain pre-LAG ([`OPEN_ITEMS.md`](../00_ai_context/OPEN_ITEMS.md)).
- **Logging:** **`src/lib/observability/logger.ts`** emits **one JSON object per line** to `console` (`level`, `message`, `timestamp`, `service`, `env`) for **server-side** use — **no PII or request secrets**. Phase 1 wires **`logInfo`** once from **`src/instrumentation.ts`** after Sentry config load; extend to Route Handlers later only with the same constraints. Avoid noisy **client** logging in production.

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

## 13. SEO (Phase 4.5)

- **Origin:** `NEXT_PUBLIC_SITE_URL` (trimmed, no trailing slash); fallback `http://localhost:3000` for local/CI. **`metadataBase`** on root layout.
- **Metadata:** English-only via `src/lib/seo/build-page-metadata.ts` — active page frontmatter `title`/`summary`, else `ROUTE_TITLES` + `messages/en.json` shell summaries. Raw page titles; root layout template adds ` · Flow-Guide`. **No** hreflang / localized meta.
- **Sitemap:** `src/app/sitemap.ts` — `getSitemapPaths()` from `PHASE1_IA_PAGE_PATHS` minus utility/thin/form excludes; omits `is_active: false` Markdown pages. **Not** `search-index.json`. No `lastModified`.
- **Robots:** `src/app/robots.ts` — allow `/`, sitemap URL. **Noindex** (`index: false, follow: true` only): `/search`, `/dashboard`, `/start`, `/city`, `/housing/request`, `/housing/request/success`.
- **Social:** minimal Open Graph / Twitter mirroring title, description, URL — no image pipeline.

## 14. Related docs

- Folder layout: [`FOLDER_STRUCTURE.md`](FOLDER_STRUCTURE.md)
- Product contracts: `docs/02_product/*`
- Master roadmap: `docs/01_strategy/ROADMAP_MASTER.md`
