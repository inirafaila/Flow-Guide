import { getTranslations } from "next-intl/server";

import { Card } from "@/components/ui/Card";
import type { PlaceItem } from "@/lib/content/load-place-items";

export type PlaceCardProps = {
  item: PlaceItem;
};

/**
 * Presentational card for one curated place on a guide page (Phase 4.3 Places-lite).
 */
export async function PlaceCard({ item }: PlaceCardProps) {
  const t = await getTranslations("places");
  const { frontmatter } = item;
  const mapsUrl = frontmatter.maps_url?.trim();

  return (
    <Card as="article" className="place-card">
      <h3 className="place-card__title">{frontmatter.name}</h3>
      <p className="place-card__notes">{frontmatter.notes!.trim()}</p>
      {frontmatter.address?.trim() ? (
        <p className="place-card__address muted">{frontmatter.address.trim()}</p>
      ) : null}
      <p className="place-card__verify muted">{t("verifyBeforeVisit")}</p>
      {mapsUrl ? (
        <p className="place-card__maps">
          <a
            href={mapsUrl}
            className="place-card__maps-link place-card__maps-link--external"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t("openInMaps")} (${t("externalLinkHint")})`}
          >
            {t("openInMaps")}
            <span className="place-card__external-icon" aria-hidden="true">
              ↗
            </span>
            <span className="place-card__external-hint muted">
              {t("externalLinkHint")}
            </span>
          </a>
        </p>
      ) : null}
    </Card>
  );
}
