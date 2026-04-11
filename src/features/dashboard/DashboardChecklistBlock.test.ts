import { describe, expect, it } from "vitest";
import type { FilteredChecklistItemV1 } from "@/lib/checklist/checklist-filter";
import {
  CATEGORY_ORDER,
  groupChecklistByCategory,
} from "./DashboardChecklistBlock";

function row(
  id: string,
  category: FilteredChecklistItemV1["item"]["category"],
): FilteredChecklistItemV1 {
  return {
    item: {
      id,
      slug: id,
      title: `Title ${id}`,
      category,
    },
    prerequisites_met: true,
  };
}

describe("groupChecklistByCategory", () => {
  it("groups items by category into separate groups", () => {
    const items = [row("a", "documents"), row("b", "newcomer")];
    const groups = groupChecklistByCategory(items, CATEGORY_ORDER);
    expect(groups).toHaveLength(2);
    const cats = groups.map((g) => g.category).sort();
    expect(cats).toEqual(["documents", "newcomer"]);
  });

  it("orders newcomer before documents per category order", () => {
    const items = [row("d1", "documents"), row("n1", "newcomer")];
    const groups = groupChecklistByCategory(items, CATEGORY_ORDER);
    expect(groups.map((g) => g.category)).toEqual(["newcomer", "documents"]);
  });

  it("places unknown categories after known categories, sorted alphabetically", () => {
    const items = [
      row("n1", "newcomer"),
      row("z1", "zebra-cat"),
      row("a1", "alpha-cat"),
    ];
    const groups = groupChecklistByCategory(items, CATEGORY_ORDER);
    expect(groups.map((g) => g.category)).toEqual([
      "newcomer",
      "alpha-cat",
      "zebra-cat",
    ]);
  });

  it("defaults undefined category to newcomer", () => {
    const items: FilteredChecklistItemV1[] = [
      {
        item: { id: "x", slug: "x", title: "T" },
        prerequisites_met: true,
      },
    ];
    const groups = groupChecklistByCategory(items, CATEGORY_ORDER);
    expect(groups).toHaveLength(1);
    expect(groups[0]!.category).toBe("newcomer");
    expect(groups[0]!.items).toHaveLength(1);
  });

  it("returns empty array for empty input", () => {
    expect(groupChecklistByCategory([], CATEGORY_ORDER)).toEqual([]);
  });

  it("returns a single group when all items share one category", () => {
    const items = [row("1", "work"), row("2", "work")];
    const groups = groupChecklistByCategory(items, CATEGORY_ORDER);
    expect(groups).toHaveLength(1);
    expect(groups[0]!.category).toBe("work");
    expect(groups[0]!.items).toHaveLength(2);
  });

  it("preserves item order within each group as in the input array", () => {
    const items = [
      row("first", "documents"),
      row("second", "documents"),
      row("third", "documents"),
    ];
    const groups = groupChecklistByCategory(items, CATEGORY_ORDER);
    expect(groups[0]!.items.map((r) => r.item.id)).toEqual([
      "first",
      "second",
      "third",
    ]);
  });
});
