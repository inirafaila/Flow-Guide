import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import {
  loadUpdateItems,
  SUMMARY_EXCERPT_THRESHOLD,
} from "./load-update-items";

const repoContentRoot = path.join(process.cwd(), "src", "content");

function writeUpdate(
  contentRoot: string,
  filename: string,
  frontmatter: Record<string, unknown>,
  body = "",
): void {
  const updatesDir = path.join(contentRoot, "updates");
  fs.mkdirSync(updatesDir, { recursive: true });
  const lines = ["---", ...Object.entries(frontmatter).flatMap(([k, v]) => {
    if (Array.isArray(v)) {
      return [k + ":", ...v.map((item) => `  - ${item}`)];
    }
    if (typeof v === "boolean") return [`${k}: ${v}`];
    return [`${k}: ${JSON.stringify(v)}`];
  }), "---", "", body].join("\n");
  fs.writeFileSync(path.join(updatesDir, filename), lines, "utf8");
}

describe("loadUpdateItems", () => {
  it("loads repo seeds: inactive fixture excluded, active sorted published_at desc", () => {
    const items = loadUpdateItems(repoContentRoot);
    expect(items.some((i) => i.slug === "sample-update-entry")).toBe(false);
    expect(items.length).toBeGreaterThanOrEqual(3);

    for (let i = 1; i < items.length; i++) {
      const prev = items[i - 1]!.frontmatter.published_at!;
      const curr = items[i]!.frontmatter.published_at!;
      expect(prev.localeCompare(curr)).toBeGreaterThanOrEqual(0);
    }
  });

  it("throws when active item missing published_at", () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "fg-updates-"));
    writeUpdate(tmp, "bad.md", {
      id: "bad-1",
      slug: "bad-entry",
      title: "Bad",
      is_active: true,
    });
    expect(() => loadUpdateItems(tmp)).toThrow(/requires non-empty published_at/);
  });

  it("allows inactive item without published_at", () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "fg-updates-"));
    writeUpdate(
      tmp,
      "inactive.md",
      {
        id: "in-1",
        slug: "inactive-entry",
        title: "Inactive",
        is_active: false,
      },
      "body",
    );
    writeUpdate(
      tmp,
      "active.md",
      {
        id: "ac-1",
        slug: "active-entry",
        title: "Active",
        published_at: "2026-05-01",
        is_active: true,
        related_page_slugs: ["/payments/terminals"],
      },
      "Short body detail.",
    );
    const items = loadUpdateItems(tmp);
    expect(items).toHaveLength(1);
    expect(items[0]!.slug).toBe("active-entry");
  });

  it("tie-breaks same published_at by title ascending", () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "fg-updates-"));
    writeUpdate(tmp, "b.md", {
      id: "b",
      slug: "b-slug",
      title: "Bravo",
      published_at: "2026-05-10",
      related_page_slugs: ["/newcomer"],
    });
    writeUpdate(tmp, "a.md", {
      id: "a",
      slug: "a-slug",
      title: "Alpha",
      published_at: "2026-05-10",
      related_page_slugs: ["/newcomer"],
    });
    const items = loadUpdateItems(tmp);
    expect(items.map((i) => i.slug)).toEqual(["a-slug", "b-slug"]);
  });

  it("omits body excerpt when summary length >= threshold", () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "fg-updates-"));
    const longSummary = "x".repeat(SUMMARY_EXCERPT_THRESHOLD);
    writeUpdate(
      tmp,
      "long.md",
      {
        id: "l",
        slug: "long-summary",
        title: "Long",
        published_at: "2026-05-01",
        summary: longSummary,
        related_page_slugs: ["/newcomer"],
      },
      "Body should not appear as excerpt.",
    );
    const items = loadUpdateItems(tmp);
    expect(items[0]!.bodyExcerpt).toBeUndefined();
  });

  it("includes body excerpt when summary is short", () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "fg-updates-"));
    writeUpdate(
      tmp,
      "short.md",
      {
        id: "s",
        slug: "short-summary",
        title: "Short",
        published_at: "2026-05-01",
        summary: "Brief.",
        related_page_slugs: ["/newcomer"],
      },
      "Extra detail in the body for readers.",
    );
    const items = loadUpdateItems(tmp);
    expect(items[0]!.bodyExcerpt).toContain("Extra detail");
  });

  it("rejects invalid related_page_slugs", () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "fg-updates-"));
    writeUpdate(tmp, "bad-link.md", {
      id: "bl",
      slug: "bad-link",
      title: "Bad link",
      published_at: "2026-05-01",
      related_page_slugs: ["/not-a-real-route"],
    });
    expect(() => loadUpdateItems(tmp)).toThrow(/unknown related_page_slug/);
  });

  afterEach(() => {
    // tmp dirs are OS-cleaned; no global state
  });
});
