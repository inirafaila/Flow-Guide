import { describe, expect, it } from "vitest";
import { parsePageFrontmatter, pageFrontmatterSchema } from "./content-page";

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

  it("rejects invalid page_type", () => {
    expect(() =>
      pageFrontmatterSchema.parse({
        title: "T",
        slug: "/t",
        page_type: "not-a-type",
      }),
    ).toThrow();
  });

  it("rejects missing title", () => {
    expect(() => pageFrontmatterSchema.parse({ slug: "/x" })).toThrow();
  });
});
