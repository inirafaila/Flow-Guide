import { describe, expect, it } from "vitest";
import {
  parseUpdateItemFrontmatter,
  updateItemFrontmatterSchema,
} from "@/lib/schemas/update-item";
import { parseMarkdownUpdateItem } from "@/lib/content/parse-md";

describe("updateItemFrontmatterSchema", () => {
  it("accepts minimal valid frontmatter", () => {
    const data = { id: "u1", slug: "us", title: "Update title" };
    expect(parseUpdateItemFrontmatter(data)).toMatchObject(data);
  });

  it("accepts optional arrays and impact_level", () => {
    const data = {
      id: "u2",
      slug: "us2",
      title: "T2",
      affected_categories: ["housing"],
      impact_level: "critical",
      related_page_slugs: ["/welcome"],
      source_ids: ["src-1"],
      summary: "S",
    };
    expect(parseUpdateItemFrontmatter(data)).toMatchObject(data);
  });

  it("rejects invalid impact_level", () => {
    expect(() =>
      updateItemFrontmatterSchema.parse({
        id: "1",
        slug: "s",
        title: "T",
        impact_level: "nope",
      }),
    ).toThrow();
  });

  it("rejects missing slug", () => {
    expect(() =>
      updateItemFrontmatterSchema.parse({ id: "1", title: "T" }),
    ).toThrow();
  });

  it("parses Markdown wrapper via parseMarkdownUpdateItem", () => {
    const src = `---
id: mu1
slug: mu-slug
title: MU
impact_level: low
---
Detail **markdown**.
`;
    const parsed = parseMarkdownUpdateItem(src);
    expect(parsed.frontmatter.slug).toBe("mu-slug");
    expect(parsed.body).toContain("Detail");
  });
});
