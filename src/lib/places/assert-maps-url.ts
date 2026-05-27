/** Hosts used only for redirects / tracking — never valid maps_url targets. */
const BLOCKED_HOSTS = new Set([
  "bit.ly",
  "t.co",
  "goo.gl",
  "maps.app.goo.gl",
  "tinyurl.com",
  "ow.ly",
  "l.facebook.com",
  "lm.facebook.com",
]);

const BLOCKED_HOST_SUFFIXES = [".bit.ly", ".goo.gl"];

/** Government / public operator hosts allowed for official location links. */
const OFFICIAL_HOST_SUFFIXES = [".gov.am", ".am"];

function hostnameOf(url: URL): string {
  return url.hostname.toLowerCase().replace(/^www\./, "");
}

function isBlockedHost(hostname: string): boolean {
  if (BLOCKED_HOSTS.has(hostname)) return true;
  return BLOCKED_HOST_SUFFIXES.some((s) => hostname.endsWith(s));
}

function hasTrackingQuery(search: string): boolean {
  if (!search || search === "?") return false;
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  for (const key of params.keys()) {
    const k = key.toLowerCase();
    if (k.startsWith("utm_") || k === "fbclid" || k === "gclid") return true;
  }
  return false;
}

function isGoogleMapsHost(hostname: string, pathname: string): boolean {
  if (hostname === "maps.google.com") return true;
  if (hostname === "google.com") return pathname.startsWith("/maps");
  return false;
}

function isAppleMapsHost(hostname: string): boolean {
  return hostname === "maps.apple.com";
}

function isOpenStreetMapHost(hostname: string): boolean {
  return hostname === "openstreetmap.org";
}

function isOfficialPublicHost(hostname: string): boolean {
  return OFFICIAL_HOST_SUFFIXES.some(
    (suffix) => hostname === suffix.slice(1) || hostname.endsWith(suffix),
  );
}

function isAllowedMapsTarget(url: URL): boolean {
  const hostname = hostnameOf(url);
  const pathname = url.pathname;

  if (isBlockedHost(hostname)) return false;
  if (isGoogleMapsHost(hostname, pathname)) return true;
  if (isAppleMapsHost(hostname)) return true;
  if (isOpenStreetMapHost(hostname)) return true;
  if (isOfficialPublicHost(hostname)) return true;

  return false;
}

/**
 * Validates optional place maps_url for Phase 4.3 Places-lite.
 * @throws Error when URL is not https, uses shorteners/trackers, or is not an allowed map target.
 */
export function assertMapsUrlAllowed(mapsUrl: string, context?: string): void {
  const label = context ? ` (${context})` : "";

  let url: URL;
  try {
    url = new URL(mapsUrl.trim());
  } catch {
    throw new Error(`Invalid maps_url${label}: not a valid URL`);
  }

  if (url.protocol !== "https:") {
    throw new Error(`Invalid maps_url${label}: must use https`);
  }

  if (hasTrackingQuery(url.search)) {
    throw new Error(
      `Invalid maps_url${label}: tracking or affiliate query parameters are not allowed`,
    );
  }

  if (!isAllowedMapsTarget(url)) {
    throw new Error(
      `Invalid maps_url${label}: host must be Google Maps, Apple Maps, OpenStreetMap, or an official public location domain`,
    );
  }
}
