import { describe, expect, it } from "vitest";
import type { UpdateItem } from "@/lib/content/load-update-items";
import { selectLatestUpdates } from "./select-latest-updates";

function item(slug: string, publishedAt: string): UpdateItem {
  return {
    slug,
    frontmatter: {
      id: slug,
      slug,
      title: slug,
      published_at: publishedAt,
    },
  };
}

describe("selectLatestUpdates", () => {
  const sorted = [
    item("newest", "2026-05-25"),
    item("middle", "2026-05-20"),
    item("oldest", "2026-05-15"),
  ];

  it("returns empty array when input is empty", () => {
    expect(selectLatestUpdates([], 3)).toEqual([]);
  });

  it("returns empty array when maxCount is zero", () => {
    expect(selectLatestUpdates(sorted, 0)).toEqual([]);
  });

  it("caps at maxCount preserving order", () => {
    expect(selectLatestUpdates(sorted, 2).map((i) => i.slug)).toEqual([
      "newest",
      "middle",
    ]);
  });

  it("returns all items when fewer than maxCount", () => {
    expect(selectLatestUpdates(sorted, 10)).toHaveLength(3);
    expect(selectLatestUpdates(sorted, 10).map((i) => i.slug)).toEqual([
      "newest",
      "middle",
      "oldest",
    ]);
  });
});
