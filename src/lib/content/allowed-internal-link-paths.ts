import { ROUTE_TITLES } from "@/lib/routes";

/** Paths excluded from Group I Markdown link audit (deferred / non-launch / redirect-only). */
export const IGNORED_INTERNAL_LINK_PATHS = new Set([
  "/city",
  "/search",
  "/updates",
  "/housing/request",
  "/housing/request/success",
  "/transport/airport",
]);

/** Allowlist for `content-internal-links` test — `ROUTE_TITLES` minus ignored paths. */
export function allowedInternalLinkPaths(): Set<string> {
  return new Set(
    Object.keys(ROUTE_TITLES).filter((p) => !IGNORED_INTERNAL_LINK_PATHS.has(p)),
  );
}
