/**
 * Phase 1 IA contract: public paths from `docs/02_product/IA_SPEC.md` §6.1–6.9 only.
 * `/transport/airport` is not a page route — see `PHASE1_IA_AIRPORT_REDIRECT` (Phase 0 / IA §6.7).
 */
export const PHASE1_IA_PAGE_PATHS = [
  "/",
  "/start",
  "/dashboard",
  "/search",
  "/faq",
  "/updates",
  "/newcomer",
  "/newcomer/day-one",
  "/newcomer/first-week",
  "/newcomer/airport-to-city",
  "/documents",
  "/documents/stay-calculator",
  "/documents/address-registration",
  "/documents/social-card",
  "/documents/temporary-residency",
  "/work",
  "/work/quick-income",
  "/work/yandex-starter",
  "/work/live-gaming",
  "/housing",
  "/housing/owner-vs-agency",
  "/housing/rental-checklist",
  "/housing/request",
  "/housing/request/success",
  "/payments",
  "/payments/terminals",
  "/payments/service-payments",
  "/transport",
  "/transport/public-transport-payments",
  "/daily-life",
  "/daily-life/essential-apps",
  "/city",
] as const;

export type Phase1IaPagePath = (typeof PHASE1_IA_PAGE_PATHS)[number];

/** Legacy URL → canonical newcomer guide (middleware redirect). */
export const PHASE1_IA_AIRPORT_REDIRECT = {
  fromPath: "/transport/airport",
  toPath: "/newcomer/airport-to-city",
} as const;
