import path from "node:path";
import { getTranslations } from "next-intl/server";

import { PlaceCard } from "@/components/ui/PlaceCard";
import { loadPlacesForGuide } from "@/lib/content/load-place-items";

export type RelatedPlacesBlockProps = {
  guideHref: string;
};

/**
 * Related curated places for a guide page (Phase 4.3 Places-lite).
 */
export async function RelatedPlacesBlock({ guideHref }: RelatedPlacesBlockProps) {
  const contentRoot = path.join(process.cwd(), "src", "content");
  const places = loadPlacesForGuide(contentRoot, guideHref);
  if (places.length === 0) return null;

  const t = await getTranslations("places");

  return (
    <section
      className="related-places"
      aria-labelledby="related-places-heading"
    >
      <h2 id="related-places-heading" className="related-places__title">
        {t("relatedTitle")}
      </h2>
      <div className="related-places__list">
        {places.map((item) => (
          <PlaceCard key={item.slug} item={item} />
        ))}
      </div>
    </section>
  );
}
