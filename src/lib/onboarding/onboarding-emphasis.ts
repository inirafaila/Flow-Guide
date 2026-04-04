import type { GuestOnboardingPartial } from "@/lib/schemas/guest-blob";

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
