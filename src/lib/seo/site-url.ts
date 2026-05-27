const DEFAULT_ORIGIN = "http://localhost:3000";

/** Production site origin (no trailing slash). */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const origin = raw && raw.length > 0 ? raw : DEFAULT_ORIGIN;
  return origin.replace(/\/+$/, "");
}

export function getMetadataBase(): URL {
  return new URL(`${getSiteUrl()}/`);
}

/**
 * Absolute canonical URL for a public IA path (no locale prefix, no query).
 * Root `/` resolves to origin only.
 */
export function canonicalUrlForPath(path: string): string {
  const origin = getSiteUrl();
  if (path === "/") {
    return origin;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${normalized}`;
}
