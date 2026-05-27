import fs from "node:fs";
import path from "node:path";

import { ROUTE_TITLES } from "@/lib/routes";
import type {
  SearchIndexRecord,
  SearchResultGroup,
} from "@/types/search-index";
import type { PageFrontmatter } from "@/lib/schemas/content-page";
import { shouldIncludeInSearchIndex } from "@/lib/schemas/content-page";

import {
  faqPublicUrl,
  resolveFaqId,
  validateFaqContentDir,
} from "./faq-id";
import { normalizeSearchExcerpt } from "./normalize-search-excerpt";
import { resolvePageHref } from "./page-slug-to-href";
import { parseMarkdownPage, type ParsedMarkdownPage } from "./parse-md";

/** Matches `messages/en.json` → `routeBanner.summaries.stayCalculator`. */
const STAY_CALCULATOR_SEARCH_EXCERPT =
  "Estimate days used in the rolling 90-in-180 window. Rules vary by nationality — confirm with official guidance.";

const STAY_CALCULATOR_HREF = "/documents/stay-calculator";

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

function contentSlugFromFrontmatter(
  slug: string | undefined,
  filePath: string,
): string {
  const raw = slug ?? path.basename(filePath, ".md");
  const basename = raw.replace(/^\/+/, "").split("/").pop() ?? raw;
  return basename;
}

function groupForPage(pageType: PageFrontmatter["page_type"]): SearchResultGroup {
  if (pageType === "calculator") return "tools";
  return "guides";
}

function excerptForPage(
  summary: string | undefined,
  body: string,
): string {
  const s = summary?.trim();
  if (s && s.length > 0) return normalizeSearchExcerpt(s);
  return normalizeSearchExcerpt(body);
}

function excerptForFaq(summary: string | undefined, body: string): string {
  const fromBody = body.replace(/\s+/g, " ").trim();
  if (fromBody.length > 0) return normalizeSearchExcerpt(fromBody);
  return normalizeSearchExcerpt(summary ?? "");
}

function recordFromParsed(
  parsed: ParsedMarkdownPage,
  kind: "page" | "faq",
  filePath: string,
): SearchIndexRecord {
  const { frontmatter, body } = parsed;
  const { title, slug, summary, audience_tags, page_type } = frontmatter;

  if (kind === "faq") {
    const faqId = resolveFaqId(frontmatter, path.basename(filePath));
    return {
      id: `faq:${faqId}`,
      type: "faq",
      title,
      excerpt: excerptForFaq(summary, body),
      href: faqPublicUrl(faqId),
      group: "faq",
      tags: audience_tags ?? [],
    };
  }

  const pageSlug = contentSlugFromFrontmatter(slug, filePath);
  return {
    id: `page:${pageSlug}`,
    type: "page",
    title,
    excerpt: excerptForPage(summary, body),
    href: resolvePageHref(pageSlug),
    group: groupForPage(page_type),
    tags: audience_tags ?? [],
  };
}

function syntheticStayCalculatorRecord(): SearchIndexRecord {
  return {
    id: "tool:stay-calculator",
    type: "tool",
    title: ROUTE_TITLES[STAY_CALCULATOR_HREF] ?? "Stay calculator",
    excerpt: normalizeSearchExcerpt(STAY_CALCULATOR_SEARCH_EXCERPT),
    href: STAY_CALCULATOR_HREF,
    group: "tools",
    tags: [],
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

  const toolRec = syntheticStayCalculatorRecord();
  if (seenIds.has(toolRec.id)) {
    throw new Error(`Duplicate search index id "${toolRec.id}"`);
  }
  seenIds.add(toolRec.id);
  records.push(toolRec);

  return records;
}
