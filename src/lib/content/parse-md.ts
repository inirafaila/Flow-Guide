import matter from "gray-matter";
import { parsePageFrontmatter } from "@/lib/schemas/content-page";

export type ParsedMarkdownPage = {
  frontmatter: ReturnType<typeof parsePageFrontmatter>;
  body: string;
};

/**
 * Parse a Markdown document with YAML frontmatter (Phase 1 — used by scripts/tests).
 */
export function parseMarkdownPage(source: string): ParsedMarkdownPage {
  const { data, content } = matter(source);
  const frontmatter = parsePageFrontmatter(data);
  return { frontmatter, body: content.trim() };
}
