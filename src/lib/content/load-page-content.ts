import fs from "node:fs";
import path from "node:path";
import { parseMarkdownPage } from "@/lib/content/parse-md";
import { renderMarkdownToHtml } from "@/lib/content/render-markdown";
import type { PageFrontmatter } from "@/lib/schemas/content-page";

export type PageContent = {
  frontmatter: PageFrontmatter;
  bodyHtml: string;
};

/**
 * Load a content page by slug, parse frontmatter, and render body to HTML.
 * Returns null if the page file does not exist.
 */
export function loadPageContent(
  contentRoot: string,
  slug: string,
): PageContent | null {
  const filePath = path.join(contentRoot, "pages", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = parseMarkdownPage(raw);
  const bodyHtml = renderMarkdownToHtml(parsed.body);
  return { frontmatter: parsed.frontmatter, bodyHtml };
}
