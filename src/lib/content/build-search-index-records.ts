import fs from "node:fs";
import path from "node:path";

import type { SearchIndexRecord } from "@/types/search-index";
import { shouldIncludeInSearchIndex } from "@/lib/schemas/content-page";

import {
  faqPublicUrl,
  resolveFaqId,
  validateFaqContentDir,
} from "./faq-id";
import { parseMarkdownPage, type ParsedMarkdownPage } from "./parse-md";

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

function recordFromParsed(
  parsed: ParsedMarkdownPage,
  kind: "page" | "faq",
  filePath: string,
): SearchIndexRecord {
  const { frontmatter, body } = parsed;
  const { title, slug, summary, primary_category, audience_tags } = frontmatter;

  if (kind === "faq") {
    const faqId = resolveFaqId(frontmatter, path.basename(filePath));
    const publicSlug = faqPublicUrl(faqId);
    return {
      id: `faq:${faqId}`,
      type: "faq",
      title,
      excerpt: excerptForFaq(summary, body),
      slug: publicSlug,
      category: primary_category ?? "faq",
      tags: audience_tags ?? [],
    };
  }

  const pageSlug = slug ?? path.basename(filePath, ".md");
  return {
    id: `page:${pageSlug}`,
    type: "page",
    title,
    excerpt: excerptForPage(summary, body),
    slug: pageSlug,
    category: primary_category,
    tags: audience_tags ?? [],
  };
}

function parseFile(absolutePath: string): ParsedMarkdownPage {
  const raw = fs.readFileSync(absolutePath, "utf8");
  try {
    return parseMarkdownPage(raw);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    throw new Error(`Invalid Markdown/frontmatter in ${absolutePath}: ${msg}`);
  }
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

  validateFaqContentDir(contentRoot);

  for (const file of walkMdFiles(pagesDir)) {
    const parsed = parseFile(file);
    if (!shouldIncludeInSearchIndex(parsed.frontmatter)) continue;
    const rec = recordFromParsed(parsed, "page", file);
    if (seenIds.has(rec.id)) {
      throw new Error(`Duplicate search index id "${rec.id}" (${file})`);
    }
    seenIds.add(rec.id);
    records.push(rec);
  }

  for (const file of walkMdFiles(faqDir)) {
    const parsed = parseFile(file);
    if (!shouldIncludeInSearchIndex(parsed.frontmatter)) continue;
    const rec = recordFromParsed(parsed, "faq", file);
    if (seenIds.has(rec.id)) {
      throw new Error(`Duplicate search index id "${rec.id}" (${file})`);
    }
    seenIds.add(rec.id);
    records.push(rec);
  }

  return records;
}
