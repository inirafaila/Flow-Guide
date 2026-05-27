import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

import { formatPublishedDate } from "@/lib/content/format-published-date";
import type { UpdateItem } from "@/lib/content/load-update-items";

export type DashboardUpdateRowProps = {
  item: UpdateItem;
};

function rowHref(item: UpdateItem): string {
  const related = item.frontmatter.related_page_slugs;
  if (related && related.length > 0) {
    const first = related[0]?.trim();
    if (first) return first;
  }
  return "/updates";
}

/**
 * Compact update row for dashboard (Phase 4.6) — title + date only.
 */
export async function DashboardUpdateRow({ item }: DashboardUpdateRowProps) {
  const t = await getTranslations("updates");
  const locale = await getLocale();
  const publishedAt = item.frontmatter.published_at!.trim();
  const href = rowHref(item);

  return (
    <li className="dashboard-updates__row">
      <Link href={href} className="dashboard-updates__row-link">
        <span className="dashboard-updates__row-title">
          {item.frontmatter.title}
        </span>
        <time
          className="dashboard-updates__row-date muted"
          dateTime={publishedAt}
        >
          <span className="visually-hidden">{t("publishedLabel")} </span>
          {formatPublishedDate(publishedAt, locale)}
        </time>
      </Link>
    </li>
  );
}
