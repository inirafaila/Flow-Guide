import { describe, expect, it } from "vitest";
import {
  parsePageFrontmatter,
  pageFrontmatterSchema,
  shouldIncludeInSearchIndex,
} from "./content-page";

describe("pageFrontmatterSchema", () => {
  it("accepts minimal valid frontmatter", () => {
    const data = { title: "Test", slug: "/test" };
    expect(parsePageFrontmatter(data)).toMatchObject(data);
  });

  it("accepts spec page_type and optional audience_tags", () => {
    const data = {
      title: "T",
      slug: "/t",
      page_type: "guide" as const,
      audience_tags: ["a", "b"],
    };
    expect(parsePageFrontmatter(data)).toMatchObject(data);
  });

  it("accepts bounded §9-aligned optional fields", () => {
    const data = {
      title: "T",
      slug: "/t",
      intent_type: "start" as const,
      related_page_slugs: ["/other"],
      searchable: true,
      dashboard_linkable: false,
      map_linked: false,
      urgency_tag: "high" as const,
      published_at: "2026-01-01",
      updated_at: "2026-04-01",
      is_active: true,
    };
    expect(parsePageFrontmatter(data)).toMatchObject(data);
  });

  it("rejects invalid page_type", () => {
    expect(() =>
      pageFrontmatterSchema.parse({
        title: "T",
        slug: "/t",
        page_type: "not-a-type",
      }),
    ).toThrow();
  });

  it("rejects invalid intent_type", () => {
    expect(() =>
      pageFrontmatterSchema.parse({
        title: "T",
        slug: "/t",
        intent_type: "not-intent",
      }),
    ).toThrow();
  });

  it("rejects invalid urgency_tag", () => {
    expect(() =>
      pageFrontmatterSchema.parse({
        title: "T",
        slug: "/t",
        urgency_tag: "mega",
      }),
    ).toThrow();
  });

  it("rejects empty string in related_page_slugs", () => {
    expect(() =>
      pageFrontmatterSchema.parse({
        title: "T",
        slug: "/t",
        related_page_slugs: [""],
      }),
    ).toThrow();
  });

  it("rejects missing title", () => {
    expect(() => pageFrontmatterSchema.parse({ slug: "/x" })).toThrow();
  });
});

describe("shouldIncludeInSearchIndex", () => {
  it("includes when flags omitted", () => {
    expect(shouldIncludeInSearchIndex({})).toBe(true);
  });

  it("excludes when searchable is false", () => {
    expect(shouldIncludeInSearchIndex({ searchable: false })).toBe(false);
  });

  it("excludes when is_active is false", () => {
    expect(shouldIncludeInSearchIndex({ is_active: false })).toBe(false);
  });
});
