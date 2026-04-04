import type { GuestOnboardingPartial } from "@/lib/schemas/guest-blob";
import type {
  UserLanguage,
  UserNationality,
  UserLocationStatus,
  UserPrimaryGoal,
} from "@/lib/schemas/user";

/** First four DATA_CONTENT_MODEL_SPEC §15 fields — question steps 1–4. */
export const START_SLICE_FIELD_ORDER = [
  "language",
  "nationality",
  "location_status",
  "primary_goal",
] as const;

/** Step 5 current-status flags — DATA_CONTENT_MODEL_SPEC §15 order. */
export const STEP5_HAS_FIELD_ORDER = [
  "has_housing",
  "has_sim",
  "has_address_registration",
  "has_social_card",
  "has_bank_account",
] as const;

export type StartSliceField = (typeof START_SLICE_FIELD_ORDER)[number];

export type Step5HasField = (typeof STEP5_HAS_FIELD_ORDER)[number];

export type StartSliceStep = 1 | 2 | 3 | 4 | 5;

export type StartSlicePhase =
  | { kind: "step"; step: StartSliceStep }
  | { kind: "end" };

export type Step5HasComplete = Record<Step5HasField, boolean>;

function allStep5HasFieldsPresent(o: GuestOnboardingPartial): boolean {
  return STEP5_HAS_FIELD_ORDER.every(
    (k) => typeof o[k] === "boolean",
  );
}

/**
 * Resume: first missing field in canonical order; step 5 if core complete but
 * any has_* missing; end only when all four core + five booleans are set.
 */
export function resolveStartSlicePhase(
  onboarding: GuestOnboardingPartial | undefined,
): StartSlicePhase {
  const o = onboarding ?? {};
  if (o.language === undefined) return { kind: "step", step: 1 };
  if (o.nationality === undefined) return { kind: "step", step: 2 };
  if (o.location_status === undefined) return { kind: "step", step: 3 };
  if (o.primary_goal === undefined) return { kind: "step", step: 4 };
  if (!allStep5HasFieldsPresent(o)) return { kind: "step", step: 5 };
  return { kind: "end" };
}

type StartSlicePatch = Partial<
  Pick<
    GuestOnboardingPartial,
    "language" | "nationality" | "location_status" | "primary_goal"
  >
>;

/**
 * After successful Next from core step `completedStep` (1–4), persisted
 * onboarding contains only fields for steps 1..completedStep (prune trailing
 * core fields and all has_*).
 */
export function mergeOnboardingAfterStep(
  prev: GuestOnboardingPartial | undefined,
  completedStep: 1 | 2 | 3 | 4,
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

/**
 * After successful Next from step 5: keep all four core fields + all five
 * has_* booleans from patch (prune nothing within this slice’s contract).
 */
export function mergeOnboardingAfterStep5(
  prev: GuestOnboardingPartial | undefined,
  hasComplete: Step5HasComplete,
): GuestOnboardingPartial {
  const merged: GuestOnboardingPartial = { ...(prev ?? {}), ...hasComplete };
  const out: GuestOnboardingPartial = {};
  for (const key of START_SLICE_FIELD_ORDER) {
    const v = merged[key];
    if (v !== undefined) {
      (out as Record<string, unknown>)[key] = v;
    }
  }
  for (const key of STEP5_HAS_FIELD_ORDER) {
    (out as Record<string, unknown>)[key] = merged[key];
  }
  return out;
}

export type StepValue =
  | UserLanguage
  | UserNationality
  | UserLocationStatus
  | UserPrimaryGoal;

export function patchForCompletedStep(
  step: 1 | 2 | 3 | 4,
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

export function readStep5StateFromOnboarding(
  onboarding: GuestOnboardingPartial | undefined,
): Partial<Step5HasComplete> {
  const o = onboarding ?? {};
  const out: Partial<Step5HasComplete> = {};
  for (const key of STEP5_HAS_FIELD_ORDER) {
    const v = o[key];
    if (typeof v === "boolean") {
      out[key] = v;
    }
  }
  return out;
}

export function isStep5HasComplete(
  partial: Partial<Step5HasComplete>,
): partial is Step5HasComplete {
  return STEP5_HAS_FIELD_ORDER.every(
    (k) => typeof partial[k] === "boolean",
  );
}
