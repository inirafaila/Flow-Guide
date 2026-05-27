import { describe, expect, it } from "vitest";

import type { SearchIndexRecord } from "@/types/search-index";

import {
  matchSearchRecords,
  normalizeSearchQuery,
  pickBestMatch,
} from "./match-search-records";

const sample: SearchIndexRecord[] = [
  {
    id: "page:address-registration",
    type: "page",
    title: "Address registration",
    excerpt: "Register your residential address in Armenia",
    href: "/documents/address-registration",
    group: "guides",
  },
  {
    id: "page:terminals",
    type: "page",
    title: "Payment terminals",
    excerpt: "Street payment terminals in Armenia",
    href: "/payments/terminals",
    group: "guides",
  },
  {
    id: "faq:sim-card-arrival",
    type: "faq",
    title: "How do I get a SIM card when I arrive?",
    excerpt: "prepaid SIM on arrival passport",
    href: "/faq#sim-card-arrival",
    group: "faq",
  },
  {
    id: "tool:stay-calculator",
    type: "tool",
    title: "Stay calculator",
    excerpt: "rolling 90-in-180 window days",
    href: "/documents/stay-calculator",
    group: "tools",
  },
];

describe("matchSearchRecords", () => {
  it("returns empty for blank query", () => {
    expect(matchSearchRecords(sample, "   ")).toEqual([]);
  });

  it("matches single token forgivingly", () => {
    const hits = matchSearchRecords(sample, "sim");
    expect(hits.map((h) => h.record.id)).toContain("faq:sim-card-arrival");
  });

  it("rejects multi-token when only one token hits", () => {
    const hits = matchSearchRecords(sample, "payment registration");
    expect(hits.map((h) => h.record.id)).not.toContain("page:terminals");
    expect(hits.map((h) => h.record.id)).not.toContain("page:address-registration");
  });

  it("accepts multi-token full phrase substring", () => {
    const hits = matchSearchRecords(sample, "payment terminals");
    expect(hits[0]?.record.id).toBe("page:terminals");
  });

  it("accepts multi-token with two field hits", () => {
    const hits = matchSearchRecords(sample, "address armenia");
    expect(hits.map((h) => h.record.id)).toContain("page:address-registration");
  });

  it("preserves FAQ href in results", () => {
    const hits = matchSearchRecords(sample, "sim card");
    const faq = hits.find((h) => h.record.type === "faq");
    expect(faq?.record.href).toBe("/faq#sim-card-arrival");
  });
});

describe("pickBestMatch", () => {
  it("returns null when normalized query is shorter than 2 characters", () => {
    const results = matchSearchRecords(sample, "sim");
    const { normalizedQuery } = normalizeSearchQuery("s");
    expect(pickBestMatch(results, normalizedQuery)).toBeNull();
  });

  it("returns null when top score is weak", () => {
    const results = matchSearchRecords(sample, "xy");
    const { normalizedQuery } = normalizeSearchQuery("xy");
    expect(pickBestMatch(results, normalizedQuery)).toBeNull();
  });

  it("returns clear winner when margin is sufficient", () => {
    const results = matchSearchRecords(sample, "payment terminals");
    const { normalizedQuery } = normalizeSearchQuery("payment terminals");
    const best = pickBestMatch(results, normalizedQuery);
    expect(best?.record.id).toBe("page:terminals");
  });

  it("returns null on near tie", () => {
    const tied: SearchIndexRecord[] = [
      {
        id: "page:a",
        type: "page",
        title: "foo bar",
        excerpt: "baz",
        href: "/a",
        group: "guides",
      },
      {
        id: "page:b",
        type: "page",
        title: "foo bar",
        excerpt: "baz qux",
        href: "/b",
        group: "guides",
      },
    ];
    const results = matchSearchRecords(tied, "foo bar");
    const { normalizedQuery } = normalizeSearchQuery("foo bar");
    expect(pickBestMatch(results, normalizedQuery)).toBeNull();
  });
});
