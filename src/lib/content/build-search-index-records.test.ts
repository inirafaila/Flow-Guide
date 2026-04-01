import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { searchIndexFileSchema } from "@/lib/schemas/search-index";

import { buildSearchIndexRecords } from "./build-search-index-records";
import { parseMarkdownPage } from "./parse-md";

const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(here, "..", "..", "..");

describe("buildSearchIndexRecords", () => {
  it("builds records from repo sample content and passes output schema", () => {
    const records = buildSearchIndexRecords(projectRoot);
    expect(records.length).toBeGreaterThanOrEqual(2);
    const parsed = searchIndexFileSchema.safeParse(records);
    expect(parsed.success).toBe(true);
    const page = records.find((r) => r.type === "page");
    expect(page?.slug).toBe("/start");
    const faq = records.find((r) => r.type === "faq");
    expect(faq?.slug).toBe("/faq/sample-question");
  });

  it("rejects invalid frontmatter with file context", () => {
    expect(() =>
      parseMarkdownPage(`---
title: "x"
slug: "/bad"
page_type: not-a-real-type
---
body`),
    ).toThrow();
  });
});
