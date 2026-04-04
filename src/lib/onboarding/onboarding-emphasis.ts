import type { GuestOnboardingPartial } from "@/lib/schemas/guest-blob";
import { STEP5_HAS_FIELD_ORDER } from "@/lib/onboarding/start-slice";

/**
 * v1 dashboard emphasis derived from DATA_CONTENT_MODEL_SPEC §15 fields only
 * (language, nationality, location_status, primary_goal). Boolean has_* fields
 * are ignored in v1 — see deriveGuestOnboardingEmphasisV1.
 */
export type GuestOnboardingEmphasisV1 =
  | "documents"
  | "housing"
  | "work"
  | "life-setup"
  | "neutral";

/**
 * Pure derivation for later Phase 2 consumers (dashboard / NBA / checklist).
 * Does not read or branch on has_* onboarding flags in v1.
 */
export function deriveGuestOnboardingEmphasisV1(
  onboarding: GuestOnboardingPartial | undefined,
): GuestOnboardingEmphasisV1 {
  if (onboarding === undefined) {
    return "neutral";
  }
  const { language, nationality, location_status, primary_goal } = onboarding;
  if (
    language === undefined ||
    nationality === undefined ||
    location_status === undefined ||
    primary_goal === undefined
  ) {
    return "neutral";
  }

  if (location_status === "inside_armenia") {
    switch (primary_goal) {
      case "documents":
        return "documents";
      case "housing":
        return "housing";
      case "work":
        return "work";
      case "start-life":
        return "life-setup";
      default: {
        const _exhaustive: never = primary_goal;
        return _exhaustive;
      }
    }
  }

  if (primary_goal === "start-life") {
    return "life-setup";
  }
  if (
    primary_goal === "documents" ||
    primary_goal === "housing" ||
    primary_goal === "work"
  ) {
    return "neutral";
  }
  const _exhaustive: never = primary_goal;
  return _exhaustive;
}

/** Structured onboarding-derived signals for Phase 2 consumers (dashboard, NBA, …). */
export type GuestOnboardingSignalsV2 = {
  emphasis: GuestOnboardingEmphasisV1;
};

function coreFieldsComplete(o: GuestOnboardingPartial): boolean {
  return (
    o.language !== undefined &&
    o.nationality !== undefined &&
    o.location_status !== undefined &&
    o.primary_goal !== undefined
  );
}

function step5FieldsAllBooleans(o: GuestOnboardingPartial): boolean {
  return STEP5_HAS_FIELD_ORDER.every((k) => typeof o[k] === "boolean");
}

/**
 * v2 signals: same `emphasis` union as v1, plus DATA_CONTENT_MODEL_SPEC §15
 * example override (R1) when core + Step 5 fields are complete.
 * Pure; no I/O. Keeps v1 available via {@link deriveGuestOnboardingEmphasisV1}.
 */
export function deriveGuestOnboardingSignalsV2(
  onboarding: GuestOnboardingPartial | undefined,
): GuestOnboardingSignalsV2 {
  if (onboarding === undefined) {
    return { emphasis: "neutral" };
  }

  const base = deriveGuestOnboardingEmphasisV1(onboarding);

  if (!coreFieldsComplete(onboarding)) {
    return { emphasis: base };
  }

  if (!step5FieldsAllBooleans(onboarding)) {
    return { emphasis: base };
  }

  const {
    nationality,
    location_status,
    has_housing,
    has_address_registration,
    has_social_card,
  } = onboarding;

  if (
    nationality === "iran" &&
    location_status === "inside_armenia" &&
    has_housing === true &&
    has_address_registration === false &&
    has_social_card === false
  ) {
    return { emphasis: "documents" };
  }

  return { emphasis: base };
}
