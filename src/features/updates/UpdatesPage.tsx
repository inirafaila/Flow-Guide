import { getTranslations } from "next-intl/server";

import { UpdateCard } from "@/components/ui/UpdateCard";
import { RoutePageBanner } from "@/features/routes/RoutePageBanner";
import type { UpdateItem } from "@/lib/content/load-update-items";

export type UpdatesPageProps = {
  items: UpdateItem[];
};

/**
 * Phase 4.2 Updates — static editorial change notices (no feed, no personalization).
 */
export async function UpdatesPage({ items }: UpdatesPageProps) {
  const t = await getTranslations("updates");

  return (
    <article className="page-template page-template--updates updates-page">
      <RoutePageBanner path="/updates" summary={t("intro")} />

      <p className="updates-page__disclaimer muted">{t("disclaimer")}</p>

      {items.length === 0 ? (
        <p className="updates-page__empty muted">{t("empty")}</p>
      ) : (
        <div className="updates-page__list">
          {items.map((item) => (
            <UpdateCard key={item.slug} item={item} />
          ))}
        </div>
      )}
    </article>
  );
}
