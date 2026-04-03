import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { loadValidatedSourceRecords } from "@/lib/content/load-sources";
import { parseMarkdownSourceRecord } from "@/lib/content/parse-md";

const contentRoot = path.join(process.cwd(), "src", "content");

describe("loadValidatedSourceRecords", () => {
  let tmpDir: string | undefined;

  afterEach(() => {
    if (tmpDir && fs.existsSync(tmpDir)) {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      tmpDir = undefined;
    }
  });

  it("loads canonical sample file without error", () => {
    const sources = loadValidatedSourceRecords(contentRoot);
    expect(sources.some((s) => s.frontmatter.id === "sample-source-001")).toBe(
      true,
    );
  });

  it("throws on invalid source frontmatter (fail fast)", () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "fg-source-load-"));
    const sourcesDir = path.join(tmpDir, "sources");
    fs.mkdirSync(sourcesDir, { recursive: true });
    fs.writeFileSync(
      path.join(sourcesDir, "bad.md"),
      `---
id: bad-id
page_id: p
source_type: invalid-enum-value
source_label: L
source_url: https://example.com
confidence_level: high
---
`,
      "utf8",
    );
    expect(() => loadValidatedSourceRecords(tmpDir)).toThrow(
      /Invalid source record .*bad\.md/,
    );
  });

  it("rejects invalid record via parseMarkdownSourceRecord", () => {
    const invalid = `---
id: x
page_id: p
source_type: official
source_label: ""
source_url: https://a
confidence_level: high
---
`;
    expect(() => parseMarkdownSourceRecord(invalid)).toThrow();
  });
});
