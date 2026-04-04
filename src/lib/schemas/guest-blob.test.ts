import { describe, expect, it } from "vitest";
import {
  guestBlobV1Schema,
  guestOnboardingPartialSchema,
} from "./guest-blob";

const validBase = {
  schemaVersion: 1 as const,
  guestSessionId: "550e8400-e29b-41d4-a716-446655440000",
  createdAt: "2026-01-01T00:00:00.000Z",
  lastActiveAt: "2026-01-02T00:00:00.000Z",
};

describe("guestBlobV1Schema", () => {
  it("accepts minimal valid envelope", () => {
    const r = guestBlobV1Schema.safeParse(validBase);
    expect(r.success).toBe(true);
  });

  it("accepts optional onboarding with enum fields", () => {
    const r = guestBlobV1Schema.safeParse({
      ...validBase,
      onboarding: {
        language: "en",
        nationality: "iran",
        location_status: "inside_armenia",
        primary_goal: "documents",
        has_housing: true,
      },
    });
    expect(r.success).toBe(true);
  });

  it("rejects wrong schemaVersion", () => {
    const r = guestBlobV1Schema.safeParse({ ...validBase, schemaVersion: 2 });
    expect(r.success).toBe(false);
  });

  it("rejects non-uuid guestSessionId", () => {
    const r = guestBlobV1Schema.safeParse({
      ...validBase,
      guestSessionId: "not-a-uuid",
    });
    expect(r.success).toBe(false);
  });

  it("rejects extra top-level keys (strict)", () => {
    const r = guestBlobV1Schema.safeParse({
      ...validBase,
      extra: true,
    });
    expect(r.success).toBe(false);
  });
});

describe("guestOnboardingPartialSchema", () => {
  it("rejects invalid enum in onboarding", () => {
    const r = guestOnboardingPartialSchema.safeParse({ language: "de" });
    expect(r.success).toBe(false);
  });
});
