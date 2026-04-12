import { describe, expect, it } from "vitest";
import { renderMarkdownToHtml } from "./render-markdown";

describe("renderMarkdownToHtml", () => {
  it("renders paragraph", () => {
    const html = renderMarkdownToHtml("Hello world");
    expect(html).toContain("<p>");
    expect(html).toContain("Hello world");
    expect(html).toContain("</p>");
  });

  it("renders heading", () => {
    const html = renderMarkdownToHtml("## Steps");
    expect(html).toContain("<h2");
    expect(html).toContain("Steps");
  });

  it("renders unordered list", () => {
    const html = renderMarkdownToHtml("- Item 1\n- Item 2");
    expect(html).toContain("<ul");
    expect(html).toContain("<li");
    expect(html).toContain("Item 1");
    expect(html).toContain("Item 2");
  });

  it("renders link", () => {
    const html = renderMarkdownToHtml("[text](https://example.com)");
    expect(html).toContain('<a href="https://example.com"');
    expect(html).toContain("text");
  });

  it("renders bold and italic", () => {
    const html = renderMarkdownToHtml("**bold** and *italic*");
    expect(html).toContain("<strong");
    expect(html).toContain("bold");
    expect(html).toContain("<em");
    expect(html).toContain("italic");
  });
});
