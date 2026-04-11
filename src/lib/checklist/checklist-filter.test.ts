import { describe, expect, it } from "vitest";
import type { ChecklistItemFrontmatter } from "@/lib/schemas/checklist-item";
import type { GuestOnboardingPartial } from "@/lib/schemas/guest-blob";
import {
  evaluateChecklistRule,
  filterChecklistItems,
  parseChecklistRule,
} from "./checklist-filter";

function item(
  overrides: Partial<ChecklistItemFrontmatter> & {
    id: string;
    slug: string;
    title: string;
  },
): ChecklistItemFrontmatter {
  return {
    id: overrides.id,
    slug: overrides.slug,
    title: overrides.title,
    ...overrides,
  };
}

describe("parseChecklistRule", () => {
  it("parses field_name = value with trim", () => {
    expect(parseChecklistRule(" nationality = iran ")).toEqual({
      field: "nationality",
      operator: "=",
      value: "iran",
    });
  });

  it("splits on first equals only", () => {
    expect(parseChecklistRule("primary_goal = start-life")).toEqual({
      field: "primary_goal",
      operator: "=",
      value: "start-life",
    });
  });

  it("returns null when no equals (malformed)", () => {
    expect(parseChecklistRule("nationality iran")).toBeNull();
  });

  it("returns null for empty field or value", () => {
    expect(parseChecklistRule("=iran")).toBeNull();
    expect(parseChecklistRule("nationality=")).toBeNull();
  });

  it("returns null for unknown field name", () => {
    expect(parseChecklistRule("foo = bar")).toBeNull();
  });
});

describe("evaluateChecklistRule", () => {
  it("returns true when referenced field is undefined in state (inclusive)", () => {
    const rule = parseChecklistRule("nationality = iran")!;
    expect(evaluateChecklistRule(rule, {})).toBe(true);
  });

  it("matches string enum field by equality", () => {
    const rule = parseChecklistRule("nationality = iran")!;
    const state: GuestOnboardingPartial = { nationality: "iran" };
    expect(evaluateChecklistRule(rule, state)).toBe(true);
    expect(
      evaluateChecklistRule(rule, { nationality: "russia" }),
    ).toBe(false);
  });

  it("compares boolean has_* via String(state[field]) vs rule value", () => {
    const rule = parseChecklistRule("has_address_registration = false")!;
    expect(
      evaluateChecklistRule(rule, { has_address_registration: false }),
    ).toBe(true);
    expect(
      evaluateChecklistRule(rule, { has_address_registration: true }),
    ).toBe(false);
  });
});

describe("filterChecklistItems", () => {
  it("returns empty result and zero totals for empty input", () => {
    expect(filterChecklistItems([], undefined)).toEqual({
      items: [],
      total_before_filter: 0,
      total_after_filter: 0,
    });
  });

  it("returns all active items with no rules when guest is undefined, sorted by urgency then default_order", () => {
    const a = item({
      id: "low-first",
      slug: "a",
      title: "A",
      urgency_level: "low",
      default_order: 1,
    });
    const b = item({
      id: "critical-second",
      slug: "b",
      title: "B",
      urgency_level: "critical",
      default_order: 99,
    });
    const c = item({
      id: "high-third",
      slug: "c",
      title: "C",
      urgency_level: "high",
      default_order: 0,
    });
    const res = filterChecklistItems([a, b, c], undefined);
    expect(res.total_before_filter).toBe(3);
    expect(res.total_after_filter).toBe(3);
    expect(res.items.map((r) => r.item.id)).toEqual([
      "critical-second",
      "high-third",
      "low-first",
    ]);
  });

  it("excludes items with is_active false", () => {
    const active = item({
      id: "keep",
      slug: "k",
      title: "K",
    });
    const inactive = item({
      id: "drop",
      slug: "d",
      title: "D",
      is_active: false,
    });
    const res = filterChecklistItems([active, inactive], undefined);
    expect(res.total_before_filter).toBe(2);
    expect(res.total_after_filter).toBe(1);
    expect(res.items).toHaveLength(1);
    expect(res.items[0]!.item.id).toBe("keep");
  });

  it('includes item when rule is nationality = iran and guest nationality is iran', () => {
    const row = item({
      id: "n1",
      slug: "n1",
      title: "N",
      applies_to_rules: ["nationality = iran"],
    });
    const res = filterChecklistItems([row], { nationality: "iran" });
    expect(res.items).toHaveLength(1);
  });

  it('excludes item when rule is nationality = iran and guest nationality is russia', () => {
    const row = item({
      id: "n1",
      slug: "n1",
      title: "N",
      applies_to_rules: ["nationality = iran"],
    });
    const res = filterChecklistItems([row], { nationality: "russia" });
    expect(res.items).toHaveLength(0);
    expect(res.total_after_filter).toBe(0);
  });

  it("includes item when has_address_registration = false matches false", () => {
    const row = item({
      id: "h1",
      slug: "h1",
      title: "H",
      applies_to_rules: ["has_address_registration = false"],
    });
    const res = filterChecklistItems([row], {
      has_address_registration: false,
    });
    expect(res.items).toHaveLength(1);
  });

  it("excludes item when has_address_registration = false but guest has true", () => {
    const row = item({
      id: "h1",
      slug: "h1",
      title: "H",
      applies_to_rules: ["has_address_registration = false"],
    });
    const res = filterChecklistItems([row], {
      has_address_registration: true,
    });
    expect(res.items).toHaveLength(0);
  });

  it("includes item when rule targets a field missing from guest state", () => {
    const row = item({
      id: "inc",
      slug: "inc",
      title: "I",
      applies_to_rules: ["nationality = iran"],
    });
    const res = filterChecklistItems([row], {
      language: "en",
    });
    expect(res.items).toHaveLength(1);
  });

  it("applies AND across multiple rules — excludes if any parsed rule fails", () => {
    const row = item({
      id: "m",
      slug: "m",
      title: "M",
      applies_to_rules: ["nationality = iran", "primary_goal = work"],
    });
    const pass = filterChecklistItems([row], {
      nationality: "iran",
      primary_goal: "work",
    });
    expect(pass.items).toHaveLength(1);

    const fail = filterChecklistItems([row], {
      nationality: "iran",
      primary_goal: "housing",
    });
    expect(fail.items).toHaveLength(0);
  });

  it("sorts by urgency: critical before high before medium before low before undefined", () => {
    const rows = [
      item({
        id: "undef",
        slug: "u",
        title: "U",
        default_order: 0,
      }),
      item({
        id: "low",
        slug: "l",
        title: "L",
        urgency_level: "low",
        default_order: 0,
      }),
      item({
        id: "crit",
        slug: "c",
        title: "C",
        urgency_level: "critical",
        default_order: 0,
      }),
      item({
        id: "med",
        slug: "m",
        title: "M",
        urgency_level: "medium",
        default_order: 0,
      }),
      item({
        id: "hi",
        slug: "h",
        title: "H",
        urgency_level: "high",
        default_order: 0,
      }),
    ];
    const res = filterChecklistItems(rows, undefined);
    expect(res.items.map((r) => r.item.id)).toEqual([
      "crit",
      "hi",
      "med",
      "low",
      "undef",
    ]);
  });

  it("uses default_order ascending as tiebreaker within same urgency", () => {
    const rows = [
      item({
        id: "second",
        slug: "s",
        title: "S",
        urgency_level: "high",
        default_order: 2,
      }),
      item({
        id: "first",
        slug: "f",
        title: "F",
        urgency_level: "high",
        default_order: 1,
      }),
      item({
        id: "last",
        slug: "l",
        title: "L",
        urgency_level: "high",
      }),
    ];
    const res = filterChecklistItems(rows, undefined);
    expect(res.items.map((r) => r.item.id)).toEqual([
      "first",
      "second",
      "last",
    ]);
  });

  it("sets prerequisites_met false when a prerequisite id is not in the filtered result", () => {
    const parent = item({ id: "parent", slug: "p", title: "P" });
    const child = item({
      id: "child",
      slug: "c",
      title: "C",
      prerequisite_ids: ["missing"],
    });
    const res = filterChecklistItems([parent, child], undefined);
    const childRow = res.items.find((r) => r.item.id === "child");
    expect(childRow?.prerequisites_met).toBe(false);
  });

  it("sets prerequisites_met true when all prerequisite ids exist on other filtered items", () => {
    const parent = item({ id: "parent", slug: "p", title: "P" });
    const child = item({
      id: "child",
      slug: "c",
      title: "C",
      prerequisite_ids: ["parent"],
    });
    const res = filterChecklistItems([parent, child], undefined);
    const childRow = res.items.find((r) => r.item.id === "child");
    expect(childRow?.prerequisites_met).toBe(true);
  });

  it("ignores malformed rule strings (no equals) so the item is not excluded", () => {
    const row = item({
      id: "mal",
      slug: "m",
      title: "M",
      applies_to_rules: ["not a valid rule"],
    });
    const res = filterChecklistItems([row], { nationality: "russia" });
    expect(res.items).toHaveLength(1);
  });

  it("ignores rules with unknown field names so the item is not excluded", () => {
    const row = item({
      id: "unk",
      slug: "u",
      title: "U",
      applies_to_rules: ["unknown_field = x"],
    });
    const res = filterChecklistItems([row], { nationality: "russia" });
    expect(res.items).toHaveLength(1);
  });

  it("when guestState is undefined, items with applies_to_rules still pass relevance", () => {
    const row = item({
      id: "g",
      slug: "g",
      title: "G",
      applies_to_rules: ["nationality = iran"],
    });
    const res = filterChecklistItems([row], undefined);
    expect(res.items).toHaveLength(1);
  });
});
