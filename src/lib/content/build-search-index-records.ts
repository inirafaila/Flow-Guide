import fs from "node:fs";
import path from "node:path";

import type { SearchIndexRecord } from "@/types/search-index";

import { parseMarkdownPage } from "./parse-md";

const EXCERPT_MAX = 240;

function walkMdFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...walkMdFiles(p));
    else if (e.isFile() && e.name.endsWith(".md")) files.push(p);
  }
  return files;
}

/** Page rows: prefer summary, then body (Phase 1 search stub). */
function excerptForPage(
  summary: string | undefined,
  body: string,
): string {
  const s = summary?.trim();
  if (s && s.length > 0) return s.slice(0, EXCERPT_MAX);
  return body.replace(/\s+/g, " ").trim().slice(0, EXCERPT_MAX);
}

/**
 * FAQ rows: index excerpt from answer **body** (matches legacy build-search-index).
 * If body is empty, fall back to `summary` so validation still yields a row.
 */
function excerptForFaq(summary: string | undefined, body: string): string {
  const fromBody = body.replace(/\s+/g, " ").trim().slice(0, EXCERPT_MAX);
  if (fromBody.length > 0) return fromBody;
  return (summary?.trim() ?? "").slice(0, EXCERPT_MAX);
}

function recordFromFile(
  absolutePath: string,
  kind: "page" | "faq",
): SearchIndexRecord {
  const raw = fs.readFileSync(absolutePath, "utf8");
  let parsed;
  try {
    parsed = parseMarkdownPage(raw);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    throw new Error(`Invalid Markdown/frontmatter in ${absolutePath}: ${msg}`);
  }

  const { frontmatter, body } = parsed;
  const { title, slug, summary, primary_category, audience_tags } = frontmatter;

  if (kind === "faq") {
    return {
      id: `faq:${slug}`,
      type: "faq",
      title,
      excerpt: excerptForFaq(summary, body),
      slug,
      category: primary_category ?? "faq",
      tags: audience_tags ?? [],
    };
  }

  return {
    id: `page:${slug}`,
    type: "page",
    title,
    excerpt: excerptForPage(summary, body),
    slug,
    category: primary_category,
    tags: audience_tags ?? [],
  };
}

/**
 * Build search index records from validated Markdown under src/content/{pages,faq}.
 */
export function buildSearchIndexRecords(projectRoot: string): SearchIndexRecord[] {
  const contentRoot = path.join(projectRoot, "src", "content");
  const pagesDir = path.join(contentRoot, "pages");
  const faqDir = path.join(contentRoot, "faq");

  const records: SearchIndexRecord[] = [];
  const seenIds = new Set<string>();

  for (const file of walkMdFiles(pagesDir)) {
    const rec = recordFromFile(file, "page");
    if (seenIds.has(rec.id)) {
      throw new Error(`Duplicate search index id "${rec.id}" (${file})`);
    }
    seenIds.add(rec.id);
    records.push(rec);
  }

  for (const file of walkMdFiles(faqDir)) {
    const rec = recordFromFile(file, "faq");
    if (seenIds.has(rec.id)) {
      throw new Error(`Duplicate search index id "${rec.id}" (${file})`);
    }
    seenIds.add(rec.id);
    records.push(rec);
  }

  return records;
}
