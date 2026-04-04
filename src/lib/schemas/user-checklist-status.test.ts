import { describe, expect, it } from "vitest";
import {
  userChecklistStatusRecordSchema,
  userChecklistStatusSchema,
} from "@/lib/schemas/user-checklist-status";

describe("User Checklist Status (DATA_CONTENT_MODEL_SPEC §8)", () => {
  it.each([
    "not-started",
    "in-progress",
    "done",
    "revisit",
  ] as const)("accepts status %s", (status) => {
    expect(userChecklistStatusSchema.parse(status)).toBe(status);
  });

  it("rejects invalid status", () => {
    expect(() => userChecklistStatusSchema.parse("pending")).toThrow();
  });

  it("parses minimal record", () => {
    const row = userChecklistStatusRecordSchema.parse({
      user_id: "u1",
      checklist_item_id: "chk-sim",
      status: "in-progress",
    });
    expect(row.status).toBe("in-progress");
  });

  it("parses record with optional fields", () => {
    const row = userChecklistStatusRecordSchema.parse({
      user_id: "u1",
      checklist_item_id: "chk-sim",
      status: "done",
      updated_at: "2026-04-04",
      note: "ok",
    });
    expect(row.note).toBe("ok");
  });
});
