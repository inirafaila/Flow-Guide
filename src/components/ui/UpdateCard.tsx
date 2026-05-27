import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

import { Card } from "@/components/ui/Card";
import { formatPublishedDate } from "@/lib/content/format-published-date";
import type { UpdateItem } from "@/lib/content/load-update-items";
import { ROUTE_TITLES } from "@/lib/routes";
import type { UpdateItemFrontmatter } from "@/lib/schemas/update-item";

export type UpdateCardProps = {
  item: UpdateItem;
};

const IMPACT_MODIFIER: Record<
  NonNullable<UpdateItemFrontmatter["impact_level"]>,
  string
> = {
  critical: "update-card__impact--critical",
  high: "update-card__impact--high",
  medium: "update-card__impact--medium",
  low: "update-card__impact--low",
};

/**
 * Presentational card for one editorial update on /updates.
 */
export async function UpdateCard({ item }: UpdateCardProps) {
  const t = await getTranslations("updates");
  const locale = await getLocale();
  const { frontmatter, bodyExcerpt } = item;
  const publishedAt = frontmatter.published_at!.trim();
  const impact = frontmatter.impact_level;

  return (
    <Card as="article" className="update-card">
      <header className="update-card__header">
        <h2 className="update-card__title">{frontmatter.title}</h2>
        <div className="update-card__meta muted">
          <span className="update-card__date">
            <span className="visually-hidden">{t("publishedLabel")} </span>
            <time dateTime={publishedAt}>
              {formatPublishedDate(publishedAt, locale)}
            </time>
          </span>
          {impact ? (
            <span
              className={`update-card__impact ${IMPACT_MODIFIER[impact]}`}
            >
              {t(`impact.${impact}`)}
            </span>
          ) : null}
        </div>
      </header>

      {frontmatter.summary ? (
        <p className="update-card__summary">{frontmatter.summary}</p>
      ) : null}

      {bodyExcerpt ? (
        <p className="update-card__excerpt muted">{bodyExcerpt}</p>
      ) : null}

      {frontmatter.related_page_slugs &&
      frontmatter.related_page_slugs.length > 0 ? (
        <div className="update-card__related">
          <p className="update-card__related-label muted">
            {t("relatedGuides")}
          </p>
          <ul className="update-card__related-list">
            {frontmatter.related_page_slugs.map((href) => (
              <li key={href}>
                <Link href={href}>{ROUTE_TITLES[href] ?? href}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Card>
  );
}
