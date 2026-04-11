import { describe, expect, it } from "vitest";
import { filterValidEntries } from "./StayCalculatorBlock";

describe("filterValidEntries", () => {
  it("filters out entries with empty arrival", () => {
    expect(
      filterValidEntries([
        { arrival: "", departure: "2025-01-10" },
        { arrival: "2025-01-01", departure: "2025-01-05" },
      ]),
    ).toEqual([{ arrival: "2025-01-01", departure: "2025-01-05" }]);
  });

  it("filters out entries with empty departure", () => {
    expect(
      filterValidEntries([
        { arrival: "2025-01-01", departure: "" },
        { arrival: "2025-02-01", departure: "2025-02-10" },
      ]),
    ).toEqual([{ arrival: "2025-02-01", departure: "2025-02-10" }]);
  });

  it("keeps valid entries with both dates filled", () => {
    const row = { arrival: "2025-03-01", departure: "2025-03-15" };
    expect(filterValidEntries([row])).toEqual([row]);
  });

  it("returns empty array for empty input", () => {
    expect(filterValidEntries([])).toEqual([]);
  });

  it("handles mixed valid and invalid entries", () => {
    expect(
      filterValidEntries([
        { arrival: "", departure: "" },
        { arrival: "  ", departure: "2025-01-01" },
        { arrival: "2025-06-01", departure: "2025-06-10" },
        { arrival: "2025-07-01", departure: "   " },
      ]),
    ).toEqual([{ arrival: "2025-06-01", departure: "2025-06-10" }]);
  });
});
