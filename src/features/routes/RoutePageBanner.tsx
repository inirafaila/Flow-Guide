import nodePath from "node:path";
import { getTranslations } from "next-intl/server";
import { loadPageContent } from "@/lib/content/load-page-content";
import { contentSlugFromRoutePath } from "@/lib/content/route-path-to-slug";
import { ROUTE_TITLES } from "@/lib/routes";

/** i18n keys under `routeBanner.summaries` for routes without Markdown body files. */
const I18N_SUMMARY_KEY_BY_PATH: Record<string, string> = {
  "/faq": "faq",
  "/search": "search",
  "/updates": "updates",
  "/documents/stay-calculator": "stayCalculator",
  "/city": "city",
};

type RoutePageBannerProps = {
  path: string;
  summary?: string;
};

/** Route header: title + optional summary (content frontmatter or i18n). */
export async function RoutePageBanner({
  path,
  summary: summaryProp,
}: RoutePageBannerProps) {
  const title = ROUTE_TITLES[path] ?? path;
  let summary = summaryProp?.trim();

  if (!summary) {
    const slug = contentSlugFromRoutePath(path);
    if (slug) {
      const contentRoot = nodePath.join(process.cwd(), "src", "content");
      const page = loadPageContent(contentRoot, slug);
      if (page && page.frontmatter.is_active !== false) {
        summary = page.frontmatter.summary?.trim();
      }
    }
  }

  if (!summary) {
    const summaryKey = I18N_SUMMARY_KEY_BY_PATH[path];
    if (summaryKey) {
      const t = await getTranslations("routeBanner.summaries");
      summary = t(summaryKey);
    }
  }

  return (
    <header className="route-page-banner">
      <h1>{title}</h1>
      {summary ? (
        <p className="route-page-banner__summary muted">{summary}</p>
      ) : null}
    </header>
  );
}
