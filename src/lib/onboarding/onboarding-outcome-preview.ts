import type { GuestOnboardingPartial } from "@/lib/schemas/guest-blob";
import {
  deriveGuestOnboardingSignalsV2,
  type GuestOnboardingEmphasisV1,
} from "@/lib/onboarding/onboarding-emphasis";
import { resolveStartSlicePhase } from "@/lib/onboarding/start-slice";

export type GuestOnboardingOutcomeRuleIdV1 =
  | "spec_s15_example_r1"
  | "fallback_by_emphasis_v1";

export type GuestOnboardingOutcomePreviewStepV1 = {
  checklist_item_slug: string;
  page_slug: string;
};

export type GuestOnboardingOutcomePreviewPrimaryReasonKeyV1 =
  | "spec_s15_example_primary"
  | "fallback_primary_documents"
  | "fallback_primary_housing"
  | "fallback_primary_work"
  | "fallback_primary_life_setup"
  | "fallback_primary_neutral";

export type GuestOnboardingOutcomePreviewV1 = {
  emphasis: GuestOnboardingEmphasisV1;
  rule_id: GuestOnboardingOutcomeRuleIdV1;
  primary: GuestOnboardingOutcomePreviewStepV1 & {
    reason_key: GuestOnboardingOutcomePreviewPrimaryReasonKeyV1;
  };
  secondaries: GuestOnboardingOutcomePreviewStepV1[];
};

function matchesSpecS15ExampleR1(onboarding: GuestOnboardingPartial): boolean {
  return (
    onboarding.nationality === "iran" &&
    onboarding.location_status === "inside_armenia" &&
    onboarding.has_housing === true &&
    onboarding.has_address_registration === false &&
    onboarding.has_social_card === false
  );
}

function primaryForFallbackEmphasis(
  emphasis: GuestOnboardingEmphasisV1,
): GuestOnboardingOutcomePreviewV1["primary"] {
  switch (emphasis) {
    case "documents":
      return {
        checklist_item_slug: "documents-hub",
        page_slug: "/documents",
        reason_key: "fallback_primary_documents",
      };
    case "housing":
      return {
        checklist_item_slug: "housing-hub",
        page_slug: "/housing",
        reason_key: "fallback_primary_housing",
      };
    case "work":
      return {
        checklist_item_slug: "work-hub",
        page_slug: "/work",
        reason_key: "fallback_primary_work",
      };
    case "life-setup":
      return {
        checklist_item_slug: "newcomer-hub",
        page_slug: "/newcomer",
        reason_key: "fallback_primary_life_setup",
      };
    case "neutral":
      return {
        checklist_item_slug: "neutral-hub",
        page_slug: "/",
        reason_key: "fallback_primary_neutral",
      };
    default: {
      const _exhaustive: never = emphasis;
      return _exhaustive;
    }
  }
}

/**
 * Pure onboarding outcome preview for Step 6 / dashboard / NBA consumers.
 * Returns null unless shipped /start flow is at end (all §15 core + has_* set).
 * Emphasis is always sourced from {@link deriveGuestOnboardingSignalsV2}.
 */
export function deriveGuestOnboardingOutcomePreviewV1(
  onboarding: GuestOnboardingPartial | undefined,
): GuestOnboardingOutcomePreviewV1 | null {
  if (resolveStartSlicePhase(onboarding).kind !== "end") {
    return null;
  }
  // `kind === "end"` never occurs for undefined (first missing field is step 1).
  const o = onboarding!;
  const signals = deriveGuestOnboardingSignalsV2(o);
  const emphasis = signals.emphasis;

  if (matchesSpecS15ExampleR1(o)) {
    return {
      emphasis,
      rule_id: "spec_s15_example_r1",
      primary: {
        checklist_item_slug: "address-registration",
        page_slug: "/documents/address-registration",
        reason_key: "spec_s15_example_primary",
      },
      secondaries: [
        {
          checklist_item_slug: "social-card",
          page_slug: "/documents/social-card",
        },
        {
          checklist_item_slug: "stay-calculator",
          page_slug: "/documents/stay-calculator",
        },
      ],
    };
  }

  return {
    emphasis,
    rule_id: "fallback_by_emphasis_v1",
    primary: primaryForFallbackEmphasis(emphasis),
    secondaries: [],
  };
}
