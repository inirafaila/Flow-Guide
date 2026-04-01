import { describe, expect, it } from "vitest";
import { parsePageFrontmatter, pageFrontmatterSchema } from "./content-page";

describe("pageFrontmatterSchema", () => {
  it("accepts minimal valid frontmatter", () => {
    const data = { title: "Test", slug: "/test" };
    expect(parsePageFrontmatter(data)).toEqual(data);
  });

  it("rejects missing title", () => {
    expect(() => pageFrontmatterSchema.parse({ slug: "/x" })).toThrow();
  });
});
