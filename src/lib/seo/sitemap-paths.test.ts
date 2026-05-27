import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { PHASE1_IA_AIRPORT_REDIRECT } from "@/lib/ia-phase1-routes";

import { getSitemapPaths } from "./sitemap-paths";

describe("getSitemapPaths", () => {
  const contentRoot = join(process.cwd(), "src", "content");

  it("returns 26 indexable paths", () => {
    expect(getSitemapPaths(contentRoot)).toHaveLength(26);
  });

  it("includes updates and stay-calculator", () => {
    const paths = getSitemapPaths(contentRoot);
    expect(paths).toContain("/updates");
    expect(paths).toContain("/documents/stay-calculator");
  });

  it("excludes utility, thin, and form paths", () => {
    const paths = getSitemapPaths(contentRoot);
    expect(paths).not.toContain("/search");
    expect(paths).not.toContain("/start");
    expect(paths).not.toContain("/dashboard");
    expect(paths).not.toContain("/city");
    expect(paths).not.toContain("/housing/request");
    expect(paths).not.toContain("/housing/request/success");
    expect(paths).not.toContain(PHASE1_IA_AIRPORT_REDIRECT.fromPath);
  });

  it("does not include hash URLs", () => {
    const paths = getSitemapPaths(contentRoot);
    expect(paths.every((p) => !p.includes("#"))).toBe(true);
  });

  it("is not equal to the set of search-index href values", () => {
    const sitemapSet = new Set(getSitemapPaths(contentRoot));
    const indexRaw = readFileSync(
      join(process.cwd(), "public", "search-index.json"),
      "utf8",
    );
    const index = JSON.parse(indexRaw) as { href: string }[];
    const indexHrefs = new Set(index.map((r) => r.href));

    expect(sitemapSet.size).not.toBe(indexHrefs.size);
    for (const href of indexHrefs) {
      if (href.includes("#")) {
        expect(sitemapSet.has(href)).toBe(false);
      }
    }
  });
});
