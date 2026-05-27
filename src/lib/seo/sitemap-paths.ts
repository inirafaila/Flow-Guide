import path from "node:path";

import { loadPageContent } from "@/lib/content/load-page-content";
import { contentSlugFromRoutePath } from "@/lib/content/route-path-to-slug";
import { PHASE1_IA_PAGE_PATHS } from "@/lib/ia-phase1-routes";

/** Fixed IA paths excluded from sitemap (utilities, thin shells, forms, redirects). */
export const SITEMAP_EXCLUDE_PATHS = [
  "/search",
  "/start",
  "/dashboard",
  "/city",
  "/housing/request",
  "/housing/request/success",
] as const;

const SITEMAP_EXCLUDE_SET = new Set<string>(SITEMAP_EXCLUDE_PATHS);

function isActiveContentPath(routePath: string, contentRoot: string): boolean {
  const slug = contentSlugFromRoutePath(routePath);
  if (!slug) {
    return true;
  }
  const page = loadPageContent(contentRoot, slug);
  if (!page) {
    return true;
  }
  return page.frontmatter.is_active !== false;
}

/**
 * Indexable public paths for sitemap.xml.
 * Source: PHASE1_IA_PAGE_PATHS — not search-index.json.
 */
export function getSitemapPaths(contentRoot?: string): string[] {
  const root =
    contentRoot ?? path.join(process.cwd(), "src", "content");

  return PHASE1_IA_PAGE_PATHS.filter((routePath) => {
    if (SITEMAP_EXCLUDE_SET.has(routePath)) {
      return false;
    }
    return isActiveContentPath(routePath, root);
  });
}
