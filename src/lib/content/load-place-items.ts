import fs from "node:fs";
import path from "node:path";

import { allowedInternalLinkPaths } from "@/lib/content/allowed-internal-link-paths";
import { parseMarkdownPlace } from "@/lib/content/parse-md";
import { assertMapsUrlAllowed } from "@/lib/places/assert-maps-url";
import type { PlaceFrontmatter } from "@/lib/schemas/place";
import { ROUTE_TITLES } from "@/lib/routes";

export const MAX_ACTIVE_PLACES = 5;

export const MAX_PLACES_PER_GUIDE = 3;

export type PlaceItem = {
  slug: string;
  frontmatter: PlaceFrontmatter;
};

function listPlaceMarkdownFiles(placesDir: string): string[] {
  if (!fs.existsSync(placesDir)) return [];
  return fs
    .readdirSync(placesDir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => path.join(placesDir, name));
}

function isActive(frontmatter: PlaceFrontmatter): boolean {
  return frontmatter.is_active !== false;
}

function assertParentGuideHref(
  filePath: string,
  slug: string,
  href: string | undefined,
): string {
  const trimmed = href?.trim();
  if (!trimmed) {
    throw new Error(
      `Active place "${slug}" in ${filePath} requires non-empty parent_guide_href`,
    );
  }
  if (!trimmed.startsWith("/")) {
    throw new Error(
      `Active place "${slug}" in ${filePath}: parent_guide_href must be a full path (got "${href}")`,
    );
  }
  const allowlist = allowedInternalLinkPaths();
  if (!ROUTE_TITLES[trimmed] && !allowlist.has(trimmed)) {
    throw new Error(
      `Active place "${slug}" in ${filePath}: unknown parent_guide_href "${trimmed}"`,
    );
  }
  return trimmed;
}

function assertNotes(filePath: string, slug: string, notes: string | undefined): void {
  if (!notes?.trim()) {
    throw new Error(
      `Active place "${slug}" in ${filePath} requires non-empty notes`,
    );
  }
}

function sortPlaceItems(items: PlaceItem[]): PlaceItem[] {
  return [...items].sort((a, b) => {
    const hrefA = a.frontmatter.parent_guide_href!.trim();
    const hrefB = b.frontmatter.parent_guide_href!.trim();
    const byHref = hrefA.localeCompare(hrefB, "en");
    if (byHref !== 0) return byHref;
    const byType = a.frontmatter.place_type.localeCompare(
      b.frontmatter.place_type,
      "en",
    );
    if (byType !== 0) return byType;
    return a.frontmatter.name.localeCompare(b.frontmatter.name, "en");
  });
}

/**
 * Load active place items for Places-lite (SSG + search index). Fails fast on invalid active rows.
 */
export function loadPlaceItems(contentRoot: string): PlaceItem[] {
  const placesDir = path.join(contentRoot, "places");
  const items: PlaceItem[] = [];

  for (const filePath of listPlaceMarkdownFiles(placesDir)) {
    const raw = fs.readFileSync(filePath, "utf8");
    let parsed;
    try {
      parsed = parseMarkdownPlace(raw);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      throw new Error(`Invalid place Markdown in ${filePath}: ${msg}`);
    }

    const { frontmatter } = parsed;
    if (!isActive(frontmatter)) continue;

    const slug = frontmatter.slug;
    assertNotes(filePath, slug, frontmatter.notes);
    const parentHref = assertParentGuideHref(
      filePath,
      slug,
      frontmatter.parent_guide_href,
    );
    frontmatter.parent_guide_href = parentHref;

    if (frontmatter.maps_url?.trim()) {
      assertMapsUrlAllowed(
        frontmatter.maps_url,
        `place "${slug}" in ${filePath}`,
      );
    }

    items.push({ slug, frontmatter });
  }

  if (items.length > MAX_ACTIVE_PLACES) {
    throw new Error(
      `Too many active places (${items.length}); maximum is ${MAX_ACTIVE_PLACES} for Places-lite`,
    );
  }

  return sortPlaceItems(items);
}

/**
 * Places for one guide route — at most {@link MAX_PLACES_PER_GUIDE} cards.
 */
export function loadPlacesForGuide(
  contentRoot: string,
  guideHref: string,
): PlaceItem[] {
  const normalized = guideHref.trim();
  return loadPlaceItems(contentRoot)
    .filter((item) => item.frontmatter.parent_guide_href === normalized)
    .slice(0, MAX_PLACES_PER_GUIDE);
}
