import { PHASE1_IA_PAGE_PATHS } from "@/lib/ia-phase1-routes";

import { contentSlugFromRoutePath } from "./route-path-to-slug";

/** Routes excluded from slug→href map (no Markdown page index or not searchable). */
const EXCLUDED_ROUTE_PATHS = new Set<string>([
  "/",
  "/start",
  "/dashboard",
  "/search",
  "/faq",
  "/updates",
  "/city",
  "/housing/request",
  "/housing/request/success",
]);

let slugToHrefCache: Map<string, string> | null = null;

function buildSlugToHrefMap(): Map<string, string> {
  const map = new Map<string, string>();
  for (const routePath of PHASE1_IA_PAGE_PATHS) {
    if (EXCLUDED_ROUTE_PATHS.has(routePath)) continue;
    const slug = contentSlugFromRoutePath(routePath);
    if (!slug) continue;
    const existing = map.get(slug);
    if (existing !== undefined) {
      throw new Error(
        `Duplicate content slug "${slug}" for IA paths "${existing}" and "${routePath}"`,
      );
    }
    map.set(slug, routePath);
  }
  return map;
}

function getSlugToHrefMap(): Map<string, string> {
  if (!slugToHrefCache) {
    slugToHrefCache = buildSlugToHrefMap();
  }
  return slugToHrefCache;
}

/** Resolve a `src/content/pages/{slug}.md` basename to its public IA path. */
export function resolvePageHref(contentSlug: string): string {
  const normalized = contentSlug.replace(/^\/+/, "").split("/").pop() ?? "";
  if (!normalized) {
    throw new Error(`Invalid page content slug: "${contentSlug}"`);
  }
  const href = getSlugToHrefMap().get(normalized);
  if (!href) {
    throw new Error(
      `No IA route for searchable page slug "${normalized}" — add to PHASE1_IA_PAGE_PATHS or exclude from index`,
    );
  }
  return href;
}

/** @internal Test-only reset of memoized map. */
export function resetPageSlugToHrefCacheForTests(): void {
  slugToHrefCache = null;
}
