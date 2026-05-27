import fs from "node:fs";
import path from "node:path";

import { allowedInternalLinkPaths } from "@/lib/content/allowed-internal-link-paths";
import { normalizeSearchExcerpt } from "@/lib/content/normalize-search-excerpt";
import { parseMarkdownUpdateItem } from "@/lib/content/parse-md";
import type { UpdateItemFrontmatter } from "@/lib/schemas/update-item";
import { ROUTE_TITLES } from "@/lib/routes";

/** If summary is this long or longer, body excerpt is omitted. */
export const SUMMARY_EXCERPT_THRESHOLD = 140;

const BODY_EXCERPT_MAX_LEN = 200;

export type UpdateItem = {
  slug: string;
  frontmatter: UpdateItemFrontmatter;
  bodyExcerpt?: string;
};

function listUpdateMarkdownFiles(updatesDir: string): string[] {
  if (!fs.existsSync(updatesDir)) return [];
  return fs
    .readdirSync(updatesDir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => path.join(updatesDir, name));
}

function isActive(frontmatter: UpdateItemFrontmatter): boolean {
  return frontmatter.is_active !== false;
}

function assertPublishedAt(
  filePath: string,
  frontmatter: UpdateItemFrontmatter,
): string {
  const published = frontmatter.published_at?.trim();
  if (!published) {
    throw new Error(
      `Active update "${frontmatter.slug}" in ${filePath} requires non-empty published_at`,
    );
  }
  return published;
}

function assertRelatedPageSlugs(
  filePath: string,
  slug: string,
  related: string[] | undefined,
): void {
  if (!related || related.length === 0) return;

  const allowlist = allowedInternalLinkPaths();
  for (const href of related) {
    const trimmed = href.trim();
    if (!trimmed.startsWith("/")) {
      throw new Error(
        `Update "${slug}" in ${filePath}: related_page_slugs must be full paths (got "${href}")`,
      );
    }
    if (!ROUTE_TITLES[trimmed] && !allowlist.has(trimmed)) {
      throw new Error(
        `Update "${slug}" in ${filePath}: unknown related_page_slug "${href}"`,
      );
    }
  }
}

function bodyExcerptForItem(
  summary: string | undefined,
  body: string,
): string | undefined {
  const summaryLen = (summary?.trim() ?? "").length;
  if (summaryLen >= SUMMARY_EXCERPT_THRESHOLD) return undefined;
  const trimmedBody = body.trim();
  if (!trimmedBody) return undefined;
  return normalizeSearchExcerpt(trimmedBody, BODY_EXCERPT_MAX_LEN);
}

/**
 * Load active update items for /updates (SSG). Fails fast on invalid active rows.
 */
export function loadUpdateItems(contentRoot: string): UpdateItem[] {
  const updatesDir = path.join(contentRoot, "updates");
  const items: UpdateItem[] = [];

  for (const filePath of listUpdateMarkdownFiles(updatesDir)) {
    const raw = fs.readFileSync(filePath, "utf8");
    let parsed;
    try {
      parsed = parseMarkdownUpdateItem(raw);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      throw new Error(`Invalid update Markdown in ${filePath}: ${msg}`);
    }

    const { frontmatter, body } = parsed;
    if (!isActive(frontmatter)) continue;

    assertPublishedAt(filePath, frontmatter);
    assertRelatedPageSlugs(filePath, frontmatter.slug, frontmatter.related_page_slugs);

    const excerpt = bodyExcerptForItem(frontmatter.summary, body);
    items.push({
      slug: frontmatter.slug,
      frontmatter,
      bodyExcerpt: excerpt,
    });
  }

  items.sort((a, b) => {
    const dateA = a.frontmatter.published_at!.trim();
    const dateB = b.frontmatter.published_at!.trim();
    const byDate = dateB.localeCompare(dateA);
    if (byDate !== 0) return byDate;
    return a.frontmatter.title.localeCompare(b.frontmatter.title, "en");
  });

  return items;
}
