import { afterEach, describe, expect, it, vi } from "vitest";
import {
  calculateStay,
  countDaysInWindow,
  type StayEntry,
} from "./stay-calculator";

describe("calculateStay", () => {
  it("empty entries — 0 days used, 90 remaining, safe", () => {
    const r = calculateStay({ entries: [], asOf: "2025-03-01" });
    expect(r.daysUsed).toBe(0);
    expect(r.daysRemaining).toBe(90);
    expect(r.status).toBe("safe");
    expect(r.windowDays).toBe(180);
    expect(r.maxDays).toBe(90);
    expect(r.asOf).toBe("2025-03-01");
    expect(r.windowStart).toBe("2024-09-03");
  });

  it("single entry fully inside window — correct day count", () => {
    const entries: StayEntry[] = [
      { arrival: "2025-01-05", departure: "2025-01-14" },
    ];
    const r = calculateStay({ entries, asOf: "2025-06-30" });
    expect(r.daysUsed).toBe(10);
    expect(r.daysRemaining).toBe(80);
    expect(r.status).toBe("safe");
  });

  it("single entry partially inside window — only overlapping days", () => {
    const entries: StayEntry[] = [
      { arrival: "2024-11-01", departure: "2025-02-28" },
    ];
    const asOf = "2025-01-10";
    const r = calculateStay({ entries, asOf });
    expect(countDaysInWindow(entries, r.windowStart, asOf)).toBe(r.daysUsed);
    expect(r.daysUsed).toBe(71);
  });

  it("entry entirely outside window — 0 days used", () => {
    const entries: StayEntry[] = [
      { arrival: "2020-01-01", departure: "2020-01-14" },
    ];
    const r = calculateStay({ entries, asOf: "2025-06-15" });
    expect(r.daysUsed).toBe(0);
    expect(r.daysRemaining).toBe(90);
    expect(r.status).toBe("safe");
  });

  it("multiple non-overlapping entries — sums unique days", () => {
    const entries: StayEntry[] = [
      { arrival: "2025-01-02", departure: "2025-01-06" },
      { arrival: "2025-02-10", departure: "2025-02-14" },
    ];
    const r = calculateStay({ entries, asOf: "2025-06-30" });
    expect(r.daysUsed).toBe(10);
  });

  it("overlapping entries do not double-count", () => {
    const entries: StayEntry[] = [
      { arrival: "2025-10-01", departure: "2025-10-05" },
      { arrival: "2025-10-03", departure: "2025-10-07" },
    ];
    const r = calculateStay({ entries, asOf: "2025-12-31" });
    expect(r.daysUsed).toBe(7);
  });

  it("exactly 90 days used — 0 remaining, urgent", () => {
    const entries: StayEntry[] = [
      { arrival: "2024-10-01", departure: "2024-12-29" },
    ];
    const r = calculateStay({ entries, asOf: "2024-12-31" });
    expect(r.daysUsed).toBe(90);
    expect(r.daysRemaining).toBe(0);
    expect(r.status).toBe("urgent");
  });

  it("70 days used — 20 remaining, watch", () => {
    const entries: StayEntry[] = [
      { arrival: "2024-11-01", departure: "2025-01-09" },
    ];
    const r = calculateStay({ entries, asOf: "2025-01-15" });
    expect(r.daysUsed).toBe(70);
    expect(r.daysRemaining).toBe(20);
    expect(r.status).toBe("watch");
  });

  it("89 days used — 1 remaining, urgent", () => {
    const entries: StayEntry[] = [
      { arrival: "2024-10-03", departure: "2024-12-30" },
    ];
    const r = calculateStay({ entries, asOf: "2024-12-31" });
    expect(r.daysUsed).toBe(89);
    expect(r.daysRemaining).toBe(1);
    expect(r.status).toBe("urgent");
  });

  it("60 days used — 30 remaining, safe", () => {
    const entries: StayEntry[] = [
      { arrival: "2024-12-01", departure: "2025-01-29" },
    ];
    const r = calculateStay({ entries, asOf: "2025-01-31" });
    expect(r.daysUsed).toBe(60);
    expect(r.daysRemaining).toBe(30);
    expect(r.status).toBe("safe");
  });

  it("future departure clamped to asOf — counts only through asOf", () => {
    const entries: StayEntry[] = [
      { arrival: "2025-06-01", departure: "2025-08-31" },
    ];
    const r = calculateStay({ entries, asOf: "2025-06-15" });
    expect(r.daysUsed).toBe(15);
  });
});

describe("calculateStay default asOf", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("defaults asOf to today (UTC date) when omitted", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-06-15T12:00:00.000Z"));
    const r = calculateStay({ entries: [] });
    expect(r.asOf).toBe("2024-06-15");
    expect(r.daysRemaining).toBe(90);
  });
});
