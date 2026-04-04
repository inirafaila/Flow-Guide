import type { GuestOnboardingPartial } from "@/lib/schemas/guest-blob";
import type {
  UserLanguage,
  UserNationality,
  UserLocationStatus,
  UserPrimaryGoal,
} from "@/lib/schemas/user";

/** First four DATA_CONTENT_MODEL_SPEC §15 fields only — this slice’s question order. */
export const START_SLICE_FIELD_ORDER = [
  "language",
  "nationality",
  "location_status",
  "primary_goal",
] as const;

export type StartSliceField = (typeof START_SLICE_FIELD_ORDER)[number];

export type StartSliceStep = 1 | 2 | 3 | 4;

export type StartSlicePhase =
  | { kind: "step"; step: StartSliceStep }
  | { kind: "end" };

/**
 * Resume: first missing field in canonical order, or end if all four are set.
 */
export function resolveStartSlicePhase(
  onboarding: GuestOnboardingPartial | undefined,
): StartSlicePhase {
  const o = onboarding ?? {};
  if (o.language === undefined) return { kind: "step", step: 1 };
  if (o.nationality === undefined) return { kind: "step", step: 2 };
  if (o.location_status === undefined) return { kind: "step", step: 3 };
  if (o.primary_goal === undefined) return { kind: "step", step: 4 };
  return { kind: "end" };
}

type StartSlicePatch = Partial<
  Pick<
    GuestOnboardingPartial,
    "language" | "nationality" | "location_status" | "primary_goal"
  >
>;

/**
 * After successful Next from step `completedStep`, persisted onboarding must
 * contain only fields for steps 1..completedStep (prune trailing fields).
 */
export function mergeOnboardingAfterStep(
  prev: GuestOnboardingPartial | undefined,
  completedStep: StartSliceStep,
  patch: StartSlicePatch,
): GuestOnboardingPartial {
  const merged: GuestOnboardingPartial = { ...(prev ?? {}), ...patch };
  const out: GuestOnboardingPartial = {};
  for (let i = 0; i < completedStep; i++) {
    const key = START_SLICE_FIELD_ORDER[i];
    const v = merged[key];
    if (v !== undefined) {
      (out as Record<string, unknown>)[key] = v;
    }
  }
  return out;
}

export type StepValue =
  | UserLanguage
  | UserNationality
  | UserLocationStatus
  | UserPrimaryGoal;

export function patchForCompletedStep(
  step: StartSliceStep,
  value: StepValue,
): StartSlicePatch {
  switch (step) {
    case 1:
      return { language: value as UserLanguage };
    case 2:
      return { nationality: value as UserNationality };
    case 3:
      return { location_status: value as UserLocationStatus };
    case 4:
      return { primary_goal: value as UserPrimaryGoal };
    default: {
      const _exhaustive: never = step;
      return _exhaustive;
    }
  }
}
