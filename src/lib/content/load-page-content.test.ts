import path from "node:path";
import { describe, expect, it } from "vitest";
import { loadPageContent } from "./load-page-content";

const contentRoot = path.join(process.cwd(), "src", "content");

describe("loadPageContent", () => {
  it("loads address-registration with title and non-empty bodyHtml", () => {
    const page = loadPageContent(contentRoot, "address-registration");
    expect(page).not.toBeNull();
    expect(page?.frontmatter.title).toBe("Address registration");
    expect(page?.bodyHtml.length).toBeGreaterThan(0);
  });

  it("bodyHtml contains rendered structural tags", () => {
    const page = loadPageContent(contentRoot, "address-registration");
    const html = page?.bodyHtml ?? "";
    const hasBlock =
      html.includes("<h2") ||
      html.includes("<h3") ||
      html.includes("<p>") ||
      html.includes("<ul");
    expect(hasBlock).toBe(true);
  });

  it("returns null for nonexistent slug", () => {
    expect(loadPageContent(contentRoot, "nonexistent-page-xyz")).toBeNull();
  });

  it("frontmatter matches schema fields", () => {
    const page = loadPageContent(contentRoot, "address-registration");
    expect(page?.frontmatter.slug).toBe("address-registration");
    expect(page?.frontmatter.page_type).toBe("guide");
    expect(page?.frontmatter.title).toBeDefined();
  });
});
