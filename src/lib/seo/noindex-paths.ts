/** Public paths that must not be indexed (sitemap omit + robots noindex). */
export const NOINDEX_PATHS = [
  "/search",
  "/dashboard",
  "/start",
  "/city",
  "/housing/request",
  "/housing/request/success",
] as const;

const NOINDEX_SET = new Set<string>(NOINDEX_PATHS);

export function isNoindexPath(routePath: string): boolean {
  return NOINDEX_SET.has(routePath);
}
