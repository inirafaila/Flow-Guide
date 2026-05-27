import { getTranslations } from "next-intl/server";

import { HomeQuickToolItem } from "@/features/home/HomeQuickToolItem";
import { DASHBOARD_QUICK_ACTIONS_CONFIG } from "@/features/dashboard/dashboard-quick-actions-config";

/**
 * Phase 4.6 — compact continuity shortcuts (not Home discovery tools).
 */
export async function DashboardQuickActions() {
  const t = await getTranslations("dashboard.quickActions");

  return (
    <section
      className="dashboard-quick-actions"
      aria-labelledby="dashboard-quick-actions-heading"
    >
      <h2 id="dashboard-quick-actions-heading" className="fg-section-header">
        {t("sectionTitle")}
      </h2>
      <ul className="dashboard-quick-actions__list">
        {DASHBOARD_QUICK_ACTIONS_CONFIG.map(({ href, messageKey }) => (
          <li key={href}>
            <HomeQuickToolItem
              href={href}
              label={t(messageKey)}
              className="dashboard-quick-actions__item"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
