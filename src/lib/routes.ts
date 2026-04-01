/** English titles for IA route shells (Phase 1). Product copy lives in content later. */
export const ROUTE_TITLES: Record<string, string> = {
  "/": "Home",
  "/start": "Start",
  "/dashboard": "Dashboard",
  "/search": "Search",
  "/faq": "FAQ",
  "/updates": "Updates",
  "/newcomer": "Newcomer hub",
  "/newcomer/day-one": "Day one",
  "/newcomer/first-week": "First week",
  "/newcomer/airport-to-city": "Airport to city",
  "/documents": "Documents hub",
  "/documents/stay-calculator": "Stay calculator",
  "/documents/address-registration": "Address registration",
  "/documents/social-card": "Social card",
  "/documents/temporary-residency": "Temporary residency",
  "/work": "Work & income hub",
  "/work/quick-income": "Quick income",
  "/work/yandex-starter": "Yandex starter",
  "/work/live-gaming": "Live gaming",
  "/housing": "Housing hub",
  "/housing/owner-vs-agency": "Owner vs agency",
  "/housing/rental-checklist": "Rental checklist",
  "/payments": "Payments hub",
  "/payments/terminals": "Payment terminals",
  "/payments/service-payments": "Service payments",
  "/transport": "Transport hub",
  "/transport/public-transport-payments": "Public transport payments",
  "/daily-life": "Daily life hub",
  "/daily-life/essential-apps": "Essential apps",
  "/city": "City & tourism",
};

export const NEWCOMER_SLUGS = [
  "day-one",
  "first-week",
  "airport-to-city",
] as const;

export const DOCUMENT_SLUGS = [
  "stay-calculator",
  "address-registration",
  "social-card",
  "temporary-residency",
] as const;

export const WORK_SLUGS = [
  "quick-income",
  "yandex-starter",
  "live-gaming",
] as const;

export const HOUSING_SLUGS = ["owner-vs-agency", "rental-checklist"] as const;

export const PAYMENTS_SLUGS = ["terminals", "service-payments"] as const;

export const TRANSPORT_SLUGS = ["public-transport-payments"] as const;

export const DAILY_LIFE_SLUGS = ["essential-apps"] as const;

export function isSlug<T extends string>(
  value: string,
  allowed: readonly T[],
): value is T {
  return (allowed as readonly string[]).includes(value);
}
