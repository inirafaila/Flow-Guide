import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Button } from "./Button";
import { Card } from "./Card";
import { SectionHeader } from "./SectionHeader";

describe("Phase 1 UI primitives", () => {
  it("Button renders secondary classes by default", () => {
    const html = renderToStaticMarkup(createElement(Button, {}, "Go"));
    expect(html).toContain("fg-button");
    expect(html).toContain("fg-button--secondary");
  });

  it("Button renders primary when requested", () => {
    const html = renderToStaticMarkup(
      createElement(Button, { variant: "primary" }, "Go"),
    );
    expect(html).toContain("fg-button--primary");
  });

  it("Card wraps children with fg-card", () => {
    const html = renderToStaticMarkup(createElement(Card, {}, "x"));
    expect(html).toContain('class="fg-card"');
    expect(html).toContain("x");
  });

  it("SectionHeader uses fg-section-header", () => {
    const html = renderToStaticMarkup(
      createElement(SectionHeader, {}, "Title"),
    );
    expect(html).toContain("fg-section-header");
    expect(html).toContain("Title");
  });
});
