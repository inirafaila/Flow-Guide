import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { loadValidatedPlaces } from "@/lib/content/load-places";
import { parseMarkdownPlace } from "@/lib/content/parse-md";

const contentRoot = path.join(process.cwd(), "src", "content");

describe("loadValidatedPlaces", () => {
  let tmpDir: string | undefined;

  afterEach(() => {
    if (tmpDir && fs.existsSync(tmpDir)) {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      tmpDir = undefined;
    }
  });

  it("loads canonical sample file without error", () => {
    const places = loadValidatedPlaces(contentRoot);
    expect(places.some((p) => p.frontmatter.id === "sample-place-001")).toBe(
      true,
    );
  });

  it("throws on invalid place frontmatter (fail fast)", () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "fg-place-load-"));
    const placesDir = path.join(tmpDir, "places");
    fs.mkdirSync(placesDir, { recursive: true });
    fs.writeFileSync(
      path.join(placesDir, "bad.md"),
      `---
id: bad-id
slug: bad-slug
name: Bad
place_type: invalid-enum-value
---
`,
      "utf8",
    );
    expect(() => loadValidatedPlaces(tmpDir)).toThrow(
      /Invalid place record .*bad\.md/,
    );
  });

  it("rejects invalid record via parseMarkdownPlace", () => {
    const invalid = `---
id: x
slug: s
name: ""
place_type: office
---
`;
    expect(() => parseMarkdownPlace(invalid)).toThrow();
  });
});
