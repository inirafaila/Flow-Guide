import { describe, expect, it } from "vitest";
import { formatPublishedDate } from "./format-published-date";

describe("formatPublishedDate", () => {
  it("formats valid ISO date with locale", () => {
    const out = formatPublishedDate("2026-05-27", "en");
    expect(out).toMatch(/2026/);
    expect(out).toMatch(/27/);
  });

  it("falls back to raw string when parse fails", () => {
    expect(formatPublishedDate("not-a-date", "en")).toBe("not-a-date");
    expect(formatPublishedDate("2026-13-40", "en")).toBe("2026-13-40");
  });
});
