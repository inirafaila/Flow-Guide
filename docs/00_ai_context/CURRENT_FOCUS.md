---
owner: product
status: active
last_updated: 2026-05-27
source_of_truth: true
---

# Current focus

**Phase 3** — MVP **content** and **journey implementation** (see [`ROADMAP_MASTER.md`](../01_strategy/ROADMAP_MASTER.md) Phase 3). Phase 2 behavior/trust layer is **complete** (2026-04-11); Phase 1 plumbing **complete** (2026-04-04).

## Phase 3 infrastructure (shipped)

1. **Markdown rendering pipeline** — ✅ `renderMarkdownToHtml` (unified/remark/rehype, sync), `loadPageContent` → `PageContent | null`. Server-side, auto-renders any `.md` in `src/content/pages/`.
2. **Guide template content wiring** — ✅ `GuidePageTemplate` accepts `bodyHtml` prop; renders real content body or placeholder fallback. Trust blocks (SourceBlock, LastVerifiedNote, WhatMayVaryNote) render alongside body when trust data exists.
3. **Hub template content wiring** — ✅ `HubPageTemplate` accepts `bodyHtml` prop; same pattern.
4. **Universal route loading** — ✅ All 7 hub routes + all 6 guide `[slug]` routes load content via `loadPageContent` + `loadTrustDataForPage`. Any new Markdown file auto-renders on matching route.

## Content authored (Phase 3)

5. **Documents section** — ✅ complete: all 3 guide pages authored with real content + trust blocks:

   - `/documents/address-registration` — guide + 2 source records
   - `/documents/social-card` — guide + 2 source records
   - `/documents/temporary-residency` — guide + 2 source records

6. **Hub pages** — ✅ 7 of 7 authored: newcomer, documents, housing, work, payments, transport, daily-life.

7. **Newcomer section guides** — ✅ P0 slugs: `/newcomer/day-one`, `/newcomer/first-week`, `/newcomer/airport-to-city` (airport-to-city includes field-experience source record).

8. **Work section guides** — ✅ P0 slugs: `/work/quick-income`, `/work/yandex-starter`, `/work/live-gaming` (each with primary field-experience source record).

9. **Payments section guides** — ✅ P0 slugs: `/payments/terminals`, `/payments/service-payments` (each with primary field-experience source record).

10. **Transport section guide** — ✅ P0 slug: `/transport/public-transport-payments` (primary field-experience source record).

11. **Housing section guides** — ✅ `/housing/owner-vs-agency`, `/housing/rental-checklist` (each with primary field-experience source record). *(`/housing/request` is a separate flow — not a Markdown guide page.)*

12. **Daily life** — ✅ `/daily-life/essential-apps` (primary field-experience source record).

13. **Home page** — ✅ `/` ships `HomePage` + `HomeEntryCard` + `HomeQuickToolItem` (hero, entry points, guided start, quick tools, trust section; `home.*` i18n). **Group F** (2026-04-13).

14. **FAQ page** — ✅ `/faq` renders `FaqPage` from `src/content/faq/*.md` (6 entries); `faq-id.ts` + `loadFaqItems`; anchor URLs `/faq#<faq_id>`; search-index slugs `/faq#…`. **Group G** (2026-05-27). Jump nav omitted (deferred).

15. **Dashboard + Start copy** — ✅ Checklist section/row chrome i18n; sample checklist fixture inactive; `dashboard.*` / `onboardingStart.*` audited (en/fa/ru). **Group H** (2026-05-28). No dashboard shell expansion.

15. **Group I — Cross-link audit + bounded exit package** — ✅ RoutePageBanner cleanup, internal-link test, fixture deactivation, stay-calculator related links, `/city` nav deferral (2026-05-27).

## Content remaining (Phase 3)

**Group I shipped.** Remaining before Phase 3 exit:

- **Exit verification pass** — `EXECUTION_ROADMAP.md` §2 checklist + `ROADMAP_STATUS.md` update (separate slice; not done in Group I).

**Explicitly deferred:** i18n guide bodies, UserChecklistStatus, dashboard full shell, Phase 4 search/updates/city content, admin, auth — see [`CURRENT_PHASE.md`](CURRENT_PHASE.md) and master roadmap.
