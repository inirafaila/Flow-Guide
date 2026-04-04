import { describe, expect, it } from "vitest";
import {
  deriveGuestOnboardingEmphasisV1,
  deriveGuestOnboardingSignalsV2,
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

/** Five Step 5 booleans for tests (values chosen for R1 except where overridden). */
const completeStep5R1Pattern: Pick<
  GuestOnboardingPartial,
  | "has_housing"
  | "has_sim"
  | "has_address_registration"
  | "has_social_card"
  | "has_bank_account"
> = {
  has_housing: true,
  has_sim: true,
  has_address_registration: false,
  has_social_card: false,
  has_bank_account: false,
};

describe("deriveGuestOnboardingSignalsV2", () => {
  it("G0: undefined -> { emphasis: neutral }", () => {
    expect(deriveGuestOnboardingSignalsV2(undefined)).toEqual({
      emphasis: "neutral",
    });
  });

  it("G1: missing core field -> { emphasis: base }", () => {
    expect(deriveGuestOnboardingSignalsV2({})).toEqual({ emphasis: "neutral" });
    const partial: GuestOnboardingPartial = {
      language: "en",
      nationality: "iran",
      ...completeStep5R1Pattern,
    };
    expect(deriveGuestOnboardingSignalsV2(partial)).toEqual({
      emphasis: "neutral",
    });
  });

  it("G2: core complete but Step 5 incomplete -> { emphasis: base }", () => {
    const coreOnly: GuestOnboardingPartial = {
      ...completeBase,
      primary_goal: "housing",
      has_housing: true,
    };
    expect(deriveGuestOnboardingSignalsV2(coreOnly)).toEqual({
      emphasis: deriveGuestOnboardingEmphasisV1(coreOnly),
    });
  });

  it("R1-positive: iran + inside + pattern -> documents (ignores primary_goal)", () => {
    const r1Input: GuestOnboardingPartial = {
      language: "fa",
      nationality: "iran",
      location_status: "inside_armenia",
      primary_goal: "housing",
      ...completeStep5R1Pattern,
    };
    expect(deriveGuestOnboardingEmphasisV1(r1Input)).toBe("housing");
    expect(deriveGuestOnboardingSignalsV2(r1Input)).toEqual({
      emphasis: "documents",
    });
  });

  it("R1-negative: same has_* pattern but not iran -> base", () => {
    const input: GuestOnboardingPartial = {
      language: "en",
      nationality: "russia",
      location_status: "inside_armenia",
      primary_goal: "housing",
      ...completeStep5R1Pattern,
    };
    expect(deriveGuestOnboardingSignalsV2(input)).toEqual({
      emphasis: "housing",
    });
  });

  it("DEF: complete Step 5 but R1 not matched -> { emphasis: base }", () => {
    const allFalse: GuestOnboardingPartial = {
      ...completeBase,
      has_housing: false,
      has_sim: false,
      has_address_registration: false,
      has_social_card: false,
      has_bank_account: false,
    };
    expect(deriveGuestOnboardingSignalsV2(allFalse)).toEqual({
      emphasis: "documents",
    });

    const iranButHasAddressTrue: GuestOnboardingPartial = {
      language: "en",
      nationality: "iran",
      location_status: "inside_armenia",
      primary_goal: "documents",
      ...completeStep5R1Pattern,
      has_address_registration: true,
    };
    expect(deriveGuestOnboardingSignalsV2(iranButHasAddressTrue)).toEqual({
      emphasis: "documents",
    });
  });

  it("compatibility: non-R1 fixtures match v1 emphasis", () => {
    const fixtures: GuestOnboardingPartial[] = [
      completeBase,
      {
        ...completeBase,
        location_status: "outside_armenia",
        primary_goal: "start-life",
      },
      {
        language: "fa",
        nationality: "other",
        location_status: "inside_armenia",
        primary_goal: "work",
        ...completeStep5R1Pattern,
        has_housing: false,
        has_address_registration: true,
        has_social_card: true,
        has_bank_account: true,
      },
    ];
    for (const o of fixtures) {
      expect(deriveGuestOnboardingSignalsV2(o).emphasis).toBe(
        deriveGuestOnboardingEmphasisV1(o),
      );
    }
  });
});
