import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { allowedInternalLinkPaths } from "./allowed-internal-link-paths";
import { extractMarkdownInternalLinkPaths } from "./extract-markdown-internal-links";

const here = path.dirname(fileURLToPath(import.meta.url));
const contentRoot = path.join(here, "..", "..", "content");

function readMdFiles(dir: string): { file: string; body: string }[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => {
      const file = path.join(dir, name);
      return { file, body: fs.readFileSync(file, "utf8") };
    });
}

describe("content-internal-links", () => {
  it("all internal Markdown links in pages and faq resolve to allowed routes", () => {
    const allowed = allowedInternalLinkPaths();
    const dirs = [
      path.join(contentRoot, "pages"),
      path.join(contentRoot, "faq"),
    ];
    const violations: string[] = [];

    for (const dir of dirs) {
      for (const { file, body } of readMdFiles(dir)) {
        for (const href of extractMarkdownInternalLinkPaths(body)) {
          if (!allowed.has(href)) {
            violations.push(`${path.relative(contentRoot, file)} → ${href}`);
          }
        }
      }
    }

    expect(violations).toEqual([]);
  });
});
