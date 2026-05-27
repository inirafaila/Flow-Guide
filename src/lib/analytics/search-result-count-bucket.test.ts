import { describe, expect, it } from "vitest";
import { searchResultCountBucket } from "./search-result-count-bucket";

describe("searchResultCountBucket", () => {
  it("returns 0 for zero or negative counts", () => {
    expect(searchResultCountBucket(0)).toBe("0");
    expect(searchResultCountBucket(-1)).toBe("0");
  });

  it("returns 1-3 for counts 1 through 3", () => {
    expect(searchResultCountBucket(1)).toBe("1-3");
    expect(searchResultCountBucket(3)).toBe("1-3");
  });

  it("returns 4+ for counts 4 and above", () => {
    expect(searchResultCountBucket(4)).toBe("4+");
    expect(searchResultCountBucket(100)).toBe("4+");
  });
});
