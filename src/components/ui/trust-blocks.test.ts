import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { SourceRecordFrontmatter } from "@/lib/schemas/source-record";
import { LastVerifiedNote } from "./LastVerifiedNote";
import { SourceBlock } from "./SourceBlock";
import { WhatMayVaryNote } from "./WhatMayVaryNote";

function sampleSource(
  overrides: Partial<SourceRecordFrontmatter> = {},
): SourceRecordFrontmatter {
  return {
    id: "trust-test-src-1",
    page_id: "welcome",
    source_type: "official",
    source_label: "Armenian government portal",
    source_url: "https://example.com/source",
    confidence_level: "high",
    ...overrides,
  };
}

describe("SourceBlock", () => {
  it("renders nothing when sources is empty", () => {
    const html = renderToStaticMarkup(
      createElement(SourceBlock, { sources: [] }),
    );
    expect(html).toBe("");
  });

  it("renders source label", () => {
    const html = renderToStaticMarkup(
      createElement(SourceBlock, {
        sources: [sampleSource({ source_label: "Unique attribution label" })],
      }),
    );
    expect(html).toContain("Unique attribution label");
  });

  it("renders source type badge with correct class", () => {
    const html = renderToStaticMarkup(
      createElement(SourceBlock, {
        sources: [sampleSource({ source_type: "official" })],
      }),
    );
    expect(html).toContain("fg-source-block__type");
    expect(html).toContain("Official");
  });

  it("renders confidence level with high modifier when confidence is high", () => {
    const html = renderToStaticMarkup(
      createElement(SourceBlock, {
        sources: [sampleSource({ confidence_level: "high" })],
      }),
    );
    expect(html).toContain("fg-source-block__confidence--high");
  });

  it("renders external link when source_url exists", () => {
    const html = renderToStaticMarkup(
      createElement(SourceBlock, {
        sources: [
          sampleSource({
            source_url: "https://gov.example/doc",
            source_label: "Linked label",
          }),
        ],
      }),
    );
    expect(html).toContain('href="https://gov.example/doc"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });
});

describe("LastVerifiedNote", () => {
  it("renders last verified prefix and date string", () => {
    const html = renderToStaticMarkup(
      createElement(LastVerifiedNote, { verifiedAt: "2026-04-01" }),
    );
    expect(html).toContain("Last verified:");
    expect(html).toContain("2026-04-01");
    expect(html).toContain("fg-last-verified");
  });

  it("renders nothing when verifiedAt is empty string", () => {
    const html = renderToStaticMarkup(
      createElement(LastVerifiedNote, { verifiedAt: "" }),
    );
    expect(html).toBe("");
  });
});

describe("WhatMayVaryNote", () => {
  it("renders note text", () => {
    const html = renderToStaticMarkup(
      createElement(WhatMayVaryNote, { note: "Fees change by branch." }),
    );
    expect(html).toContain("Fees change by branch.");
    expect(html).toContain("What may vary");
  });

  it("defaults variant to low", () => {
    const html = renderToStaticMarkup(
      createElement(WhatMayVaryNote, { note: "x" }),
    );
    expect(html).toContain("fg-what-may-vary--low");
  });

  it("uses high modifier when variant is high", () => {
    const html = renderToStaticMarkup(
      createElement(WhatMayVaryNote, { note: "y", variant: "high" }),
    );
    expect(html).toContain("fg-what-may-vary--high");
  });
});
