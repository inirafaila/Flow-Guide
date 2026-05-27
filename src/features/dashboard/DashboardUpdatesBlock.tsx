import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { DashboardUpdateRow } from "@/components/ui/DashboardUpdateRow";
import type { UpdateItem } from "@/lib/content/load-update-items";

export type DashboardUpdatesBlockProps = {
  items: UpdateItem[];
};

/**
 * Phase 4.6 — latest editorial updates (server-fed, no personalization).
 * Omits the section when there are no items.
 */
export async function DashboardUpdatesBlock({
  items,
}: DashboardUpdatesBlockProps) {
  if (items.length === 0) {
    return null;
  }

  const t = await getTranslations("dashboard.updates");

  return (
    <section
      className="dashboard-updates"
      aria-labelledby="dashboard-updates-heading"
    >
      <h2 id="dashboard-updates-heading" className="fg-section-header">
        {t("sectionTitle")}
      </h2>
      <ul className="dashboard-updates__list">
        {items.map((item) => (
          <DashboardUpdateRow key={item.slug} item={item} />
        ))}
      </ul>
      <p className="dashboard-updates__footer">
        <Link href="/updates" className="dashboard-updates__view-all">
          {t("viewAll")}
        </Link>
      </p>
    </section>
  );
}
