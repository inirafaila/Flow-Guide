import { describe, expect, it } from "vitest";
import {
  deriveGuestOnboardingEmphasisV1,
  type GuestOnboardingEmphasisV1,
} from "./onboarding-emphasis";
import type { GuestOnboardingPartial } from "@/lib/schemas/guest-blob";

const completeBase: GuestOnboardingPartial = {
  language: "en",
  nationality: "iran",
  location_status: "inside_armenia",
  primary_goal: "documents",
};

describe("deriveGuestOnboardingEmphasisV1", () => {
  it("returns neutral when onboarding is undefined", () => {
    expect(deriveGuestOnboardingEmphasisV1(undefined)).toBe("neutral");
  });

  it("returns neutral when any of the four required fields is missing", () => {
    expect(deriveGuestOnboardingEmphasisV1({})).toBe("neutral");
    expect(deriveGuestOnboardingEmphasisV1({ language: "fa" })).toBe("neutral");
    expect(
      deriveGuestOnboardingEmphasisV1({
        language: "fa",
        nationality: "india",
      }),
    ).toBe("neutral");
    expect(
      deriveGuestOnboardingEmphasisV1({
        language: "fa",
        nationality: "india",
        location_status: "inside_armenia",
      }),
    ).toBe("neutral");
  });

  describe("inside_armenia with all four fields", () => {
    const loc = "inside_armenia" as const;
    const cases: Array<{
      goal: GuestOnboardingPartial["primary_goal"];
      expected: GuestOnboardingEmphasisV1;
    }> = [
      { goal: "documents", expected: "documents" },
      { goal: "housing", expected: "housing" },
      { goal: "work", expected: "work" },
      { goal: "start-life", expected: "life-setup" },
    ];

    it.each(cases)(
      "maps primary_goal $goal -> $expected",
      ({ goal, expected }) => {
        expect(
          deriveGuestOnboardingEmphasisV1({
            ...completeBase,
            location_status: loc,
            primary_goal: goal,
          }),
        ).toBe(expected);
      },
    );
  });

  describe("outside_armenia with all four fields", () => {
    const loc = "outside_armenia" as const;

    it("maps start-life -> life-setup", () => {
      expect(
        deriveGuestOnboardingEmphasisV1({
          ...completeBase,
          location_status: loc,
          primary_goal: "start-life",
        }),
      ).toBe("life-setup");
    });

    it.each([
      ["documents", "neutral"],
      ["housing", "neutral"],
      ["work", "neutral"],
    ] as const)(
      "maps primary_goal %s -> neutral",
      (goal, expected) => {
        expect(
          deriveGuestOnboardingEmphasisV1({
            ...completeBase,
            location_status: loc,
            primary_goal: goal,
          }),
        ).toBe(expected);
      },
    );
  });

  it("does not branch on language or nationality (same emphasis for different values)", () => {
    const inside: GuestOnboardingPartial = {
      language: "ru",
      nationality: "russia",
      location_status: "inside_armenia",
      primary_goal: "work",
    };
    const inside2: GuestOnboardingPartial = {
      language: "fa",
      nationality: "other",
      location_status: "inside_armenia",
      primary_goal: "work",
    };
    expect(deriveGuestOnboardingEmphasisV1(inside)).toBe("work");
    expect(deriveGuestOnboardingEmphasisV1(inside2)).toBe("work");
  });

  it("ignores has_* boolean fields for v1 output", () => {
    const withFlags: GuestOnboardingPartial = {
      ...completeBase,
      has_housing: true,
      has_sim: false,
      has_address_registration: true,
      has_social_card: false,
      has_bank_account: true,
    };
    expect(deriveGuestOnboardingEmphasisV1(withFlags)).toBe("documents");
    expect(
      deriveGuestOnboardingEmphasisV1({
        ...completeBase,
        has_housing: false,
        has_address_registration: false,
      }),
    ).toBe("documents");
  });
});
