import { describe, expect, it } from "vitest";
import {
  isStep5HasComplete,
  mergeOnboardingAfterStep,
  mergeOnboardingAfterStep5,
  patchForCompletedStep,
  readStep5StateFromOnboarding,
  resolveStartSlicePhase,
  STEP5_HAS_FIELD_ORDER,
} from "./start-slice";

const core4 = {
  language: "en" as const,
  nationality: "iran" as const,
  location_status: "inside_armenia" as const,
  primary_goal: "work" as const,
};

const hasAll5 = {
  has_housing: true,
  has_sim: false,
  has_address_registration: true,
  has_social_card: false,
  has_bank_account: true,
};

describe("resolveStartSlicePhase", () => {
  it("returns step 1 when onboarding missing or empty", () => {
    expect(resolveStartSlicePhase(undefined)).toEqual({
      kind: "step",
      step: 1,
    });
    expect(resolveStartSlicePhase({})).toEqual({ kind: "step", step: 1 });
  });

  it("returns first missing step in core order", () => {
    expect(
      resolveStartSlicePhase({ language: "en" }),
    ).toEqual({ kind: "step", step: 2 });
    expect(
      resolveStartSlicePhase({
        language: "en",
        nationality: "iran",
      }),
    ).toEqual({ kind: "step", step: 3 });
    expect(
      resolveStartSlicePhase({
        language: "en",
        nationality: "iran",
        location_status: "inside_armenia",
      }),
    ).toEqual({ kind: "step", step: 4 });
  });

  it("returns step 5 when core four complete but any has_* missing", () => {
    expect(resolveStartSlicePhase({ ...core4 })).toEqual({
      kind: "step",
      step: 5,
    });
    expect(
      resolveStartSlicePhase({
        ...core4,
        has_housing: true,
        has_sim: true,
      }),
    ).toEqual({ kind: "step", step: 5 });
  });

  it("returns end only when all four core and five has_* booleans present", () => {
    expect(
      resolveStartSlicePhase({
        ...core4,
        ...hasAll5,
      }),
    ).toEqual({ kind: "end" });
  });
});

describe("mergeOnboardingAfterStep", () => {
  it("after step 1 keeps only language", () => {
    expect(
      mergeOnboardingAfterStep(undefined, 1, { language: "ru" }),
    ).toEqual({ language: "ru" });
  });

  it("after step 2 keeps language and nationality", () => {
    expect(
      mergeOnboardingAfterStep(
        { language: "en", nationality: "india" },
        2,
        { nationality: "india" },
      ),
    ).toEqual({ language: "en", nationality: "india" });
  });

  it("prunes fields after completed step", () => {
    const prev = {
      language: "en" as const,
      nationality: "iran" as const,
      location_status: "inside_armenia" as const,
      primary_goal: "documents" as const,
    };
    expect(
      mergeOnboardingAfterStep(prev, 2, { nationality: "russia" }),
    ).toEqual({ language: "en", nationality: "russia" });
  });

  it("after step 4 keeps all four when patch completes primary_goal", () => {
    expect(
      mergeOnboardingAfterStep(
        {
          language: "en",
          nationality: "other",
          location_status: "inside_armenia",
        },
        4,
        { primary_goal: "housing" },
      ),
    ).toEqual({
      language: "en",
      nationality: "other",
      location_status: "inside_armenia",
      primary_goal: "housing",
    });
  });

  it("prunes all has_* when re-completing step 4", () => {
    const prev = { ...core4, ...hasAll5 };
    expect(
      mergeOnboardingAfterStep(prev, 4, { primary_goal: "housing" }),
    ).toEqual({
      ...core4,
      primary_goal: "housing",
    });
  });
});

describe("mergeOnboardingAfterStep5", () => {
  it("persists four core fields and five booleans", () => {
    expect(
      mergeOnboardingAfterStep5(
        {
          language: "fa",
          nationality: "other",
          location_status: "outside_armenia",
          primary_goal: "documents",
        },
        {
          has_housing: false,
          has_sim: true,
          has_address_registration: false,
          has_social_card: true,
          has_bank_account: false,
        },
      ),
    ).toEqual({
      language: "fa",
      nationality: "other",
      location_status: "outside_armenia",
      primary_goal: "documents",
      has_housing: false,
      has_sim: true,
      has_address_registration: false,
      has_social_card: true,
      has_bank_account: false,
    });
  });
});

describe("patchForCompletedStep", () => {
  it("maps step to field", () => {
    expect(patchForCompletedStep(1, "fa")).toEqual({ language: "fa" });
    expect(patchForCompletedStep(2, "india")).toEqual({
      nationality: "india",
    });
    expect(patchForCompletedStep(3, "outside_armenia")).toEqual({
      location_status: "outside_armenia",
    });
    expect(patchForCompletedStep(4, "start-life")).toEqual({
      primary_goal: "start-life",
    });
  });
});

describe("readStep5StateFromOnboarding", () => {
  it("returns only defined boolean has_* keys", () => {
    expect(readStep5StateFromOnboarding(undefined)).toEqual({});
    expect(readStep5StateFromOnboarding({ ...core4 })).toEqual({});
    expect(
      readStep5StateFromOnboarding({
        ...core4,
        has_housing: true,
        has_sim: false,
      }),
    ).toEqual({ has_housing: true, has_sim: false });
  });
});

describe("isStep5HasComplete", () => {
  it("is false until all five keys are boolean", () => {
    expect(isStep5HasComplete({})).toBe(false);
    expect(
      isStep5HasComplete({
        has_housing: true,
        has_sim: false,
        has_address_registration: true,
        has_social_card: false,
      }),
    ).toBe(false);
  });

  it("is true when all STEP5_HAS_FIELD_ORDER keys are boolean", () => {
    const complete = STEP5_HAS_FIELD_ORDER.reduce(
      (acc, k, i) => ({ ...acc, [k]: i % 2 === 0 }),
      {} as Record<(typeof STEP5_HAS_FIELD_ORDER)[number], boolean>,
    );
    expect(isStep5HasComplete(complete)).toBe(true);
    expect(isStep5HasComplete(hasAll5)).toBe(true);
  });
});
