import fs from "node:fs";
import path from "node:path";

import { parseMarkdownPage } from "@/lib/content/parse-md";
import type { PageFrontmatter } from "@/lib/schemas/content-page";

/** Kebab-case FAQ anchor id: lowercase letters, digits, single hyphens between segments. */
export const FAQ_ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export function normalizeFaqId(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Resolve canonical faq_id from frontmatter or file basename.
 */
export function resolveFaqId(
  frontmatter: Pick<PageFrontmatter, "faq_id">,
  fileBasename: string,
): string {
  const fromFm = frontmatter.faq_id?.trim();
  if (fromFm) {
    const normalized = normalizeFaqId(fromFm);
    if (!FAQ_ID_PATTERN.test(normalized)) {
      throw new Error(
        `Invalid faq_id "${fromFm}" (normalized: "${normalized}") — expected kebab-case`,
      );
    }
    return normalized;
  }
  const fromFile = normalizeFaqId(fileBasename.replace(/\.md$/i, ""));
  if (!fromFile || !FAQ_ID_PATTERN.test(fromFile)) {
    throw new Error(
      `Missing faq_id in frontmatter and could not derive valid id from filename "${fileBasename}"`,
    );
  }
  return fromFile;
}

/** Public deep-link URL for a FAQ entry (single route + anchor). */
export function faqPublicUrl(faqId: string): string {
  return `/faq#${faqId}`;
}

export type FaqIdEntry = {
  faqId: string;
  filePath: string;
};

/**
 * Throws if any faq_id appears more than once. Message lists id and both paths.
 */
export function assertUniqueFaqIds(entries: FaqIdEntry[]): void {
  const byId = new Map<string, string>();
  for (const { faqId, filePath } of entries) {
    const existing = byId.get(faqId);
    if (existing) {
      throw new Error(
        `Duplicate faq_id "${faqId}" in ${existing} and ${filePath}`,
      );
    }
    byId.set(faqId, filePath);
  }
}

function listFaqMarkdownFiles(faqDir: string): string[] {
  if (!fs.existsSync(faqDir)) return [];
  return fs
    .readdirSync(faqDir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => path.join(faqDir, name));
}

/**
 * Parse every FAQ file and return resolved ids (for uniqueness checks).
 */
export function collectFaqIdEntries(contentRoot: string): FaqIdEntry[] {
  const faqDir = path.join(contentRoot, "faq");
  const entries: FaqIdEntry[] = [];
  for (const filePath of listFaqMarkdownFiles(faqDir)) {
    const raw = fs.readFileSync(filePath, "utf8");
    let parsed;
    try {
      parsed = parseMarkdownPage(raw);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      throw new Error(`Invalid FAQ Markdown in ${filePath}: ${msg}`);
    }
    const faqId = resolveFaqId(
      parsed.frontmatter,
      path.basename(filePath),
    );
    entries.push({ faqId, filePath });
  }
  return entries;
}

/** Validate all FAQ files under contentRoot have unique faq_id values. */
export function validateFaqContentDir(contentRoot: string): void {
  assertUniqueFaqIds(collectFaqIdEntries(contentRoot));
}
