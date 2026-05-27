import { describe, expect, it } from "vitest";

import { normalizeSearchExcerpt } from "./normalize-search-excerpt";

describe("normalizeSearchExcerpt", () => {
  it("collapses whitespace and strips markdown", () => {
    expect(
      normalizeSearchExcerpt("From **Zvartnots** to [Yerevan](/city)."),
    ).toBe("From Zvartnots to Yerevan.");
  });

  it("caps length", () => {
    expect(normalizeSearchExcerpt("a".repeat(300), 10)).toHaveLength(10);
  });
});
