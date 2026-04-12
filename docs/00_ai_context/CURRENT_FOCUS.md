---
owner: product
status: active
last_updated: 2026-04-11
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

6. **Hub pages** — 3 of 7 authored: newcomer ✅, documents ✅, housing ✅. **Remaining:** work, payments, transport, daily-life.

## Content remaining (Phase 3)

7. **Newcomer section guides** — `/newcomer/airport-to-city`, `/newcomer/first-week`, `/newcomer/day-one` (P0).
8. **Housing section guides** — `/housing/owner-vs-agency`, `/housing/rental-checklist` (P0/P1).
9. **Work section guides** — `/work/quick-income`, `/work/yandex-starter`, `/work/live-gaming` (P0).
10. **Payments section guides** — `/payments/terminals`, `/payments/service-payments` (P0/P1).
11. **Transport section guide** — `/transport/public-transport-payments` (P0).
12. **Daily life** — `/daily-life/essential-apps` (P1).
13. **Remaining hub content** — work, payments, transport, daily-life hubs (Markdown only, no code).
14. **Home page** — `/` still `RoutePlaceholder`; needs real Home page design + content.
15. **FAQ** — `/faq` needs real content.
16. **Cross-link audit + editorial review** — once content pages are authored.

**Explicitly deferred:** i18n content, UserChecklistStatus, dashboard full shell, admin, auth — see [`CURRENT_PHASE.md`](CURRENT_PHASE.md) and master roadmap.
