import { describe, expect, it } from "vitest";
import {
  sourceRecordFrontmatterSchema,
  parseSourceRecordFrontmatter,
} from "@/lib/schemas/source-record";
import { parseMarkdownSourceRecord } from "@/lib/content/parse-md";

describe("sourceRecordFrontmatterSchema", () => {
  it("accepts minimal valid frontmatter", () => {
    const data = {
      id: "src-1",
      page_id: "welcome",
      source_type: "official" as const,
      source_label: "Official example",
      source_url: "https://example.com",
      confidence_level: "high" as const,
    };
    expect(parseSourceRecordFrontmatter(data)).toMatchObject(data);
  });

  it("accepts optional fields", () => {
    const data = {
      id: "src-2",
      page_id: "welcome",
      source_type: "community-report" as const,
      source_label: "Community note",
      source_url: "https://example.org/path",
      confidence_level: "medium" as const,
      verified_at: "2026-04-04",
      notes: "Fixture",
      is_primary: true,
    };
    expect(parseSourceRecordFrontmatter(data)).toMatchObject(data);
  });

  it("rejects invalid source_type", () => {
    expect(() =>
      sourceRecordFrontmatterSchema.parse({
        id: "1",
        page_id: "p",
        source_type: "not-a-type",
        source_label: "L",
        source_url: "https://a",
        confidence_level: "low",
      }),
    ).toThrow();
  });

  it("rejects confidence_level critical (not in spec §10)", () => {
    expect(() =>
      sourceRecordFrontmatterSchema.parse({
        id: "1",
        page_id: "p",
        source_type: "official",
        source_label: "L",
        source_url: "https://a",
        confidence_level: "critical",
      }),
    ).toThrow();
  });

  it("parses Markdown wrapper via parseMarkdownSourceRecord", () => {
    const src = `---
id: md-src
page_id: welcome
source_type: field-experience
source_label: From MD
source_url: https://example.com/x
confidence_level: low
---
Body here.
`;
    const parsed = parseMarkdownSourceRecord(src);
    expect(parsed.frontmatter.id).toBe("md-src");
    expect(parsed.body).toContain("Body here.");
  });
});
