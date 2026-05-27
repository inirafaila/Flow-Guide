/** Dashboard quick-action hrefs (Phase 4.6 — continuity links only). */
export const DASHBOARD_QUICK_ACTION_HREFS = [
  "/documents/stay-calculator",
  "/payments/terminals",
  "/daily-life/essential-apps",
  "/faq",
  "/updates",
] as const;

export type DashboardQuickActionHref =
  (typeof DASHBOARD_QUICK_ACTION_HREFS)[number];

/** i18n keys under `dashboard.quickActions.*` — must match href order. */
export const DASHBOARD_QUICK_ACTION_MESSAGE_KEYS = [
  "stayCalculator",
  "terminals",
  "essentialApps",
  "faq",
  "updates",
] as const;

export type DashboardQuickActionsConfigEntry = {
  href: DashboardQuickActionHref;
  messageKey: (typeof DASHBOARD_QUICK_ACTION_MESSAGE_KEYS)[number];
};

export const DASHBOARD_QUICK_ACTIONS_CONFIG: DashboardQuickActionsConfigEntry[] =
  DASHBOARD_QUICK_ACTION_HREFS.map((href, index) => ({
    href,
    messageKey: DASHBOARD_QUICK_ACTION_MESSAGE_KEYS[index]!,
  }));
