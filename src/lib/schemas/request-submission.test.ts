import { describe, expect, it } from "vitest";
import {
  requestSubmissionRecordSchema,
  requestSubmissionStatusSchema,
  requestSubmissionTypeSchema,
} from "@/lib/schemas/request-submission";

describe("Request Submission (DATA_CONTENT_MODEL_SPEC §13)", () => {
  it("accepts request_type values", () => {
    expect(requestSubmissionTypeSchema.parse("housing-request")).toBe(
      "housing-request",
    );
    expect(requestSubmissionTypeSchema.parse("casino-referral")).toBe(
      "casino-referral",
    );
  });

  it("accepts status values", () => {
    expect(requestSubmissionStatusSchema.parse("submitted")).toBe("submitted");
    expect(requestSubmissionStatusSchema.parse("reviewing")).toBe("reviewing");
    expect(requestSubmissionStatusSchema.parse("closed")).toBe("closed");
  });

  it("rejects invalid request_type", () => {
    expect(() =>
      requestSubmissionTypeSchema.parse("other-request"),
    ).toThrow();
  });

  it("parses minimal record with null user_id", () => {
    const row = requestSubmissionRecordSchema.parse({
      id: "req-1",
      request_type: "housing-request",
      user_id: null,
      contact_name: "A",
      contact_method: "email",
      payload_json: { rooms: 2 },
      status: "submitted",
      submitted_at: "2026-04-04T12:00:00Z",
    });
    expect(row.user_id).toBeNull();
    expect(row.payload_json).toEqual({ rooms: 2 });
  });

  it("rejects record with invalid status", () => {
    expect(() =>
      requestSubmissionRecordSchema.parse({
        id: "req-1",
        request_type: "housing-request",
        user_id: null,
        contact_name: "A",
        contact_method: "email",
        payload_json: {},
        status: "draft",
        submitted_at: "2026-04-04",
      }),
    ).toThrow();
  });
});
