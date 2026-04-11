import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  loadValidatedChecklistItems,
  loadValidatedUpdateItems,
} from "@/lib/content/load-checklist-and-updates";
import { parseMarkdownChecklistItem } from "@/lib/content/parse-md";

const contentRoot = path.join(process.cwd(), "src", "content");

describe("loadValidatedChecklistItems / loadValidatedUpdateItems", () => {
  it("loads canonical sample files without error", () => {
    const checklists = loadValidatedChecklistItems(contentRoot);
    expect(checklists.length).toBeGreaterThanOrEqual(9);
    const updates = loadValidatedUpdateItems(contentRoot);
    expect(checklists.some((c) => c.frontmatter.slug === "sample-checklist-row"))
      .toBe(true);
    expect(updates.some((u) => u.frontmatter.slug === "sample-update-entry")).toBe(
      true,
    );
  });

  it("throws on invalid checklist frontmatter (fail fast)", () => {
    const invalid = `---
id: bad
slug: bad
title: T
category: invalid-category
---
`;
    expect(() => parseMarkdownChecklistItem(invalid)).toThrow();
  });
});
