import matter from "gray-matter";
import { parsePageFrontmatter } from "@/lib/schemas/content-page";
import {
  parseChecklistItemFrontmatter,
  type ChecklistItemFrontmatter,
} from "@/lib/schemas/checklist-item";
import {
  parseUpdateItemFrontmatter,
  type UpdateItemFrontmatter,
} from "@/lib/schemas/update-item";

export type ParsedMarkdownPage = {
  frontmatter: ReturnType<typeof parsePageFrontmatter>;
  body: string;
};

export type ParsedMarkdownChecklistItem = {
  frontmatter: ChecklistItemFrontmatter;
  body: string;
};

export type ParsedMarkdownUpdateItem = {
  frontmatter: UpdateItemFrontmatter;
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

/** Canonical checklist row: src/content/checklist-items/*.md */
export function parseMarkdownChecklistItem(
  source: string,
): ParsedMarkdownChecklistItem {
  const { data, content } = matter(source);
  const frontmatter = parseChecklistItemFrontmatter(data);
  return { frontmatter, body: content.trim() };
}

/** Canonical update entry: src/content/updates/*.md */
export function parseMarkdownUpdateItem(
  source: string,
): ParsedMarkdownUpdateItem {
  const { data, content } = matter(source);
  const frontmatter = parseUpdateItemFrontmatter(data);
  return { frontmatter, body: content.trim() };
}
