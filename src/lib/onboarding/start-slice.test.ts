import { describe, expect, it } from "vitest";
import {
  mergeOnboardingAfterStep,
  patchForCompletedStep,
  resolveStartSlicePhase,
} from "./start-slice";

describe("resolveStartSlicePhase", () => {
  it("returns step 1 when onboarding missing or empty", () => {
    expect(resolveStartSlicePhase(undefined)).toEqual({
      kind: "step",
      step: 1,
    });
    expect(resolveStartSlicePhase({})).toEqual({ kind: "step", step: 1 });
  });

  it("returns first missing step in order", () => {
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

  it("returns end when all four fields present", () => {
    expect(
      resolveStartSlicePhase({
        language: "fa",
        nationality: "other",
        location_status: "outside_armenia",
        primary_goal: "work",
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
