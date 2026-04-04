import { describe, expect, it } from "vitest";
import {
  housingStageSchema,
  paymentReadinessSchema,
  remainingDaysStatusSchema,
  residencyStageSchema,
  userStateStubSchema,
  workStageSchema,
} from "@/lib/schemas/user-state";

describe("User State enum schemas (DATA_CONTENT_MODEL_SPEC §6)", () => {
  it("accepts overdue-risk for remaining_days_status", () => {
    expect(remainingDaysStatusSchema.parse("overdue-risk")).toBe(
      "overdue-risk",
    );
  });

  it("accepts hyphenated residency and housing stages", () => {
    expect(residencyStageSchema.parse("social-card-pending")).toBe(
      "social-card-pending",
    );
    expect(housingStageSchema.parse("searching-rental")).toBe(
      "searching-rental",
    );
  });

  it("accepts work_stage tokens", () => {
    expect(workStageSchema.parse("quick-income-track")).toBe(
      "quick-income-track",
    );
  });

  it("accepts payment_readiness tokens", () => {
    expect(paymentReadinessSchema.parse("bank-ready")).toBe("bank-ready");
  });

  it("rejects invalid remaining_days_status", () => {
    expect(() => remainingDaysStatusSchema.parse("critical")).toThrow();
  });

  it("parses minimal userStateStubSchema", () => {
    const row = userStateStubSchema.parse({
      user_id: "guest-1",
      remaining_days_status: "watch",
      residency_stage: "not-started",
    });
    expect(row.user_id).toBe("guest-1");
    expect(row.remaining_days_status).toBe("watch");
  });

  it("rejects userStateStubSchema without user_id", () => {
    expect(() =>
      userStateStubSchema.parse({
        remaining_days_status: "safe",
      }),
    ).toThrow();
  });
});
