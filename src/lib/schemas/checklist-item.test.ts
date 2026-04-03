import { describe, expect, it } from "vitest";
import {
  checklistItemFrontmatterSchema,
  parseChecklistItemFrontmatter,
} from "@/lib/schemas/checklist-item";
import { parseMarkdownChecklistItem } from "@/lib/content/parse-md";

describe("checklistItemFrontmatterSchema", () => {
  it("accepts minimal valid frontmatter", () => {
    const data = {
      id: "x",
      slug: "y",
      title: "T",
    };
    expect(parseChecklistItemFrontmatter(data)).toMatchObject(data);
  });

  it("accepts full optional fields", () => {
    const data = {
      id: "1",
      slug: "s",
      title: "Title",
      category: "documents",
      urgency_level: "high",
      estimated_effort: "half-day",
      applies_to_rules: ["if nationality = iran"],
      prerequisite_ids: ["other"],
      primary_destination_slug: "/newcomer",
      secondary_destination_slugs: ["/faq"],
      default_order: 2,
      is_active: false,
    };
    expect(parseChecklistItemFrontmatter(data)).toMatchObject(data);
  });

  it("rejects invalid category", () => {
    expect(() =>
      checklistItemFrontmatterSchema.parse({
        id: "1",
        slug: "s",
        title: "T",
        category: "not-a-category",
      }),
    ).toThrow();
  });

  it("rejects missing required title", () => {
    expect(() =>
      checklistItemFrontmatterSchema.parse({ id: "1", slug: "s" }),
    ).toThrow();
  });

  it("parses Markdown wrapper via parseMarkdownChecklistItem", () => {
    const src = `---
id: md-1
slug: md-slug
title: From MD
category: work
---
Body here.
`;
    const parsed = parseMarkdownChecklistItem(src);
    expect(parsed.frontmatter.slug).toBe("md-slug");
    expect(parsed.body).toContain("Body here.");
  });
});
