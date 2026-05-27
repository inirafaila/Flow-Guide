import fs from "node:fs";
import path from "node:path";

import {
  assertUniqueFaqIds,
  collectFaqIdEntries,
  faqPublicUrl,
  resolveFaqId,
} from "@/lib/content/faq-id";
import { parseMarkdownPage } from "@/lib/content/parse-md";
import { renderMarkdownToHtml } from "@/lib/content/render-markdown";
import type { PageFrontmatter } from "@/lib/schemas/content-page";
import { shouldIncludeInSearchIndex } from "@/lib/schemas/content-page";

export type FaqItem = {
  faqId: string;
  href: string;
  frontmatter: PageFrontmatter;
  bodyHtml: string;
};

function listFaqMarkdownFiles(faqDir: string): string[] {
  if (!fs.existsSync(faqDir)) return [];
  return fs
    .readdirSync(faqDir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => path.join(faqDir, name));
}

/**
 * Load active FAQ entries for /faq. Node-only (SSG). Fails on duplicate faq_id.
 */
export function loadFaqItems(contentRoot: string): FaqItem[] {
  const faqDir = path.join(contentRoot, "faq");
  assertUniqueFaqIds(collectFaqIdEntries(contentRoot));

  const items: FaqItem[] = [];
  for (const filePath of listFaqMarkdownFiles(faqDir)) {
    const raw = fs.readFileSync(filePath, "utf8");
    let parsed;
    try {
      parsed = parseMarkdownPage(raw);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      throw new Error(`Invalid FAQ Markdown in ${filePath}: ${msg}`);
    }
    if (!shouldIncludeInSearchIndex(parsed.frontmatter)) continue;

    const faqId = resolveFaqId(
      parsed.frontmatter,
      path.basename(filePath),
    );
    const bodyHtml = renderMarkdownToHtml(parsed.body);
    items.push({
      faqId,
      href: faqPublicUrl(faqId),
      frontmatter: parsed.frontmatter,
      bodyHtml,
    });
  }

  items.sort((a, b) =>
    a.frontmatter.title.localeCompare(b.frontmatter.title, "en"),
  );
  return items;
}
