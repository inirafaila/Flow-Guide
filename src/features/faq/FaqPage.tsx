import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { RoutePageBanner } from "@/features/routes/RoutePageBanner";
import type { FaqItem } from "@/lib/content/load-faq-items";
import { ROUTE_TITLES } from "@/lib/routes";

export type FaqPageProps = {
  items: FaqItem[];
};

/**
 * Phase 3 FAQ — stacked Q&A sections with anchor deep links (/faq#faq_id).
 */
export async function FaqPage({ items }: FaqPageProps) {
  const t = await getTranslations("faq");

  return (
    <article className="page-template page-template--faq faq-page">
      <RoutePageBanner path="/faq" summary={t("intro")} />

      {items.length === 0 ? (
        <p className="faq-page__empty muted">{t("empty")}</p>
      ) : (
        <div className="faq-page__list">
          {items.map((item) => (
            <section
              key={item.faqId}
              id={item.faqId}
              className="faq-item"
              aria-labelledby={`faq-q-${item.faqId}`}
            >
              <h2 id={`faq-q-${item.faqId}`} className="faq-item__title">
                {item.frontmatter.title}
              </h2>
              <div
                className="faq-body"
                dangerouslySetInnerHTML={{ __html: item.bodyHtml }}
              />
              {item.frontmatter.related_page_slugs &&
              item.frontmatter.related_page_slugs.length > 0 ? (
                <div className="faq-item__related">
                  <p className="faq-item__related-label muted">
                    {t("relatedGuides")}
                  </p>
                  <ul className="faq-item__related-list">
                    {item.frontmatter.related_page_slugs.map((href) => (
                      <li key={href}>
                        <Link href={href}>
                          {ROUTE_TITLES[href] ?? href}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </section>
          ))}
        </div>
      )}
    </article>
  );
}
