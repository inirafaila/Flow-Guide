import fs from "node:fs";
import path from "node:path";
import { parseMarkdownPage } from "@/lib/content/parse-md";
import { loadValidatedSourceRecords } from "@/lib/content/load-sources";
import type { SourceRecordFrontmatter } from "@/lib/schemas/source-record";

export type PageTrustData = {
  sources: SourceRecordFrontmatter[];
  lastVerifiedAt: string | undefined;
  whatMayVary: string | undefined;
};

/**
 * Server-only: load source records for a page slug plus optional trust metadata
 * from the matching content page Markdown file.
 */
export function loadTrustDataForPage(
  contentRoot: string,
  pageSlug: string,
): PageTrustData {
  const allSources = loadValidatedSourceRecords(contentRoot);
  const sources = allSources
    .filter((s) => s.frontmatter.page_id === pageSlug)
    .map((s) => s.frontmatter);

  const pagePath = path.join(contentRoot, "pages", `${pageSlug}.md`);
  let lastVerifiedAt: string | undefined;
  let whatMayVary: string | undefined;

  if (fs.existsSync(pagePath)) {
    const raw = fs.readFileSync(pagePath, "utf8");
    const { frontmatter } = parseMarkdownPage(raw);
    lastVerifiedAt = frontmatter.last_verified_at;
    whatMayVary = frontmatter.what_may_vary;
  }

  return { sources, lastVerifiedAt, whatMayVary };
}
