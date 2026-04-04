import { describe, expect, it } from "vitest";
import { PHASE1_IA_PAGE_PATHS } from "@/lib/ia-phase1-routes";
import { deriveGuestOnboardingSignalsV2 } from "@/lib/onboarding/onboarding-emphasis";
import { deriveGuestOnboardingOutcomePreviewV1 } from "@/lib/onboarding/onboarding-outcome-preview";
import type { GuestOnboardingPartial } from "@/lib/schemas/guest-blob";

/** All four core §15 fields + five has_* booleans — minimal shape for `kind === "end"`. */
function completeOnboarding(
  core: Pick<
    GuestOnboardingPartial,
    "language" | "nationality" | "location_status" | "primary_goal"
  >,
  has: Pick<
    GuestOnboardingPartial,
    | "has_housing"
    | "has_sim"
    | "has_address_registration"
    | "has_social_card"
    | "has_bank_account"
  >,
): GuestOnboardingPartial {
  return { ...core, ...has };
}

describe("deriveGuestOnboardingOutcomePreviewV1", () => {
  it("returns null when onboarding is undefined", () => {
    expect(deriveGuestOnboardingOutcomePreviewV1(undefined)).toBeNull();
  });

  it("returns null when core or Step 5 fields are incomplete", () => {
    expect(deriveGuestOnboardingOutcomePreviewV1({})).toBeNull();
    expect(
      deriveGuestOnboardingOutcomePreviewV1({
        language: "en",
        nationality: "iran",
        location_status: "inside_armenia",
      }),
    ).toBeNull();
    expect(
      deriveGuestOnboardingOutcomePreviewV1({
        language: "en",
        nationality: "iran",
        location_status: "inside_armenia",
        primary_goal: "documents",
        has_housing: true,
      }),
    ).toBeNull();
  });

  describe("R1 branch (DATA_CONTENT_MODEL_SPEC §15 example)", () => {
    const r1 = completeOnboarding(
      {
        language: "en",
        nationality: "iran",
        location_status: "inside_armenia",
        primary_goal: "housing",
      },
      {
        has_housing: true,
        has_sim: true,
        has_address_registration: false,
        has_social_card: false,
        has_bank_account: true,
      },
    );

    it("returns spec DTO with ordered secondaries; primary_goal not required for R1", () => {
      const out = deriveGuestOnboardingOutcomePreviewV1(r1);
      expect(out).not.toBeNull();
      expect(out!.rule_id).toBe("spec_s15_example_r1");
      expect(out!.primary).toEqual({
        checklist_item_slug: "address-registration",
        page_slug: "/documents/address-registration",
        reason_key: "spec_s15_example_primary",
      });
      expect(out!.secondaries).toEqual([
        {
          checklist_item_slug: "social-card",
          page_slug: "/documents/social-card",
        },
        {
          checklist_item_slug: "stay-calculator",
          page_slug: "/documents/stay-calculator",
        },
      ]);
      expect(out!.secondaries).toHaveLength(2);
    });
  });

  describe("fallback_by_emphasis_v1", () => {
    it("documents emphasis: not R1 when address registration is true", () => {
      const o = completeOnboarding(
        {
          language: "en",
          nationality: "iran",
          location_status: "inside_armenia",
          primary_goal: "documents",
        },
        {
          has_housing: true,
          has_sim: false,
          has_address_registration: true,
          has_social_card: false,
          has_bank_account: false,
        },
      );
      const out = deriveGuestOnboardingOutcomePreviewV1(o);
      expect(out).not.toBeNull();
      expect(out!.rule_id).toBe("fallback_by_emphasis_v1");
      expect(out!.emphasis).toBe("documents");
      expect(out!.secondaries).toEqual([]);
      expect(out!.primary).toEqual({
        checklist_item_slug: "documents-hub",
        page_slug: "/documents",
        reason_key: "fallback_primary_documents",
      });
    });

    it("housing emphasis", () => {
      const o = completeOnboarding(
        {
          language: "fa",
          nationality: "india",
          location_status: "inside_armenia",
          primary_goal: "housing",
        },
        {
          has_housing: false,
          has_sim: true,
          has_address_registration: false,
          has_social_card: true,
          has_bank_account: false,
        },
      );
      const out = deriveGuestOnboardingOutcomePreviewV1(o);
      expect(out!.rule_id).toBe("fallback_by_emphasis_v1");
      expect(out!.emphasis).toBe("housing");
      expect(out!.secondaries).toHaveLength(0);
      expect(out!.primary.page_slug).toBe("/housing");
      expect(out!.primary.reason_key).toBe("fallback_primary_housing");
    });

    it("work emphasis", () => {
      const o = completeOnboarding(
        {
          language: "ru",
          nationality: "russia",
          location_status: "inside_armenia",
          primary_goal: "work",
        },
        {
          has_housing: true,
          has_sim: false,
          has_address_registration: true,
          has_social_card: true,
          has_bank_account: true,
        },
      );
      const out = deriveGuestOnboardingOutcomePreviewV1(o);
      expect(out!.emphasis).toBe("work");
      expect(out!.primary).toMatchObject({
        page_slug: "/work",
        reason_key: "fallback_primary_work",
        checklist_item_slug: "work-hub",
      });
      expect(out!.secondaries).toEqual([]);
    });

    it("life-setup emphasis", () => {
      const o = completeOnboarding(
        {
          language: "en",
          nationality: "other",
          location_status: "inside_armenia",
          primary_goal: "start-life",
        },
        {
          has_housing: false,
          has_sim: false,
          has_address_registration: false,
          has_social_card: false,
          has_bank_account: false,
        },
      );
      const out = deriveGuestOnboardingOutcomePreviewV1(o);
      expect(out!.emphasis).toBe("life-setup");
      expect(out!.primary).toMatchObject({
        page_slug: "/newcomer",
        reason_key: "fallback_primary_life_setup",
        checklist_item_slug: "newcomer-hub",
      });
      expect(out!.secondaries).toEqual([]);
    });

    it("neutral emphasis", () => {
      const o = completeOnboarding(
        {
          language: "en",
          nationality: "india",
          location_status: "outside_armenia",
          primary_goal: "documents",
        },
        {
          has_housing: false,
          has_sim: true,
          has_address_registration: false,
          has_social_card: false,
          has_bank_account: false,
        },
      );
      const out = deriveGuestOnboardingOutcomePreviewV1(o);
      expect(out!.emphasis).toBe("neutral");
      expect(out!.primary).toMatchObject({
        page_slug: "/",
        reason_key: "fallback_primary_neutral",
        checklist_item_slug: "neutral-hub",
      });
      expect(out!.secondaries).toEqual([]);
    });
  });

  it("DTO emphasis always matches deriveGuestOnboardingSignalsV2", () => {
    const cases: GuestOnboardingPartial[] = [
      completeOnboarding(
        {
          language: "en",
          nationality: "iran",
          location_status: "inside_armenia",
          primary_goal: "housing",
        },
        {
          has_housing: true,
          has_sim: true,
          has_address_registration: false,
          has_social_card: false,
          has_bank_account: true,
        },
      ),
      completeOnboarding(
        {
          language: "en",
          nationality: "iran",
          location_status: "inside_armenia",
          primary_goal: "documents",
        },
        {
          has_housing: true,
          has_sim: false,
          has_address_registration: true,
          has_social_card: false,
          has_bank_account: false,
        },
      ),
      completeOnboarding(
        {
          language: "en",
          nationality: "other",
          location_status: "outside_armenia",
          primary_goal: "housing",
        },
        {
          has_housing: false,
          has_sim: false,
          has_address_registration: false,
          has_social_card: false,
          has_bank_account: false,
        },
      ),
    ];
    for (const o of cases) {
      const preview = deriveGuestOnboardingOutcomePreviewV1(o);
      expect(preview).not.toBeNull();
      expect(preview!.emphasis).toBe(
        deriveGuestOnboardingSignalsV2(o).emphasis,
      );
    }
  });

  it("fallback and R1 primary/secondary page_slug values exist in Phase 1 IA paths", () => {
    const paths = new Set<string>(PHASE1_IA_PAGE_PATHS);
    const docFallback = completeOnboarding(
      {
        language: "en",
        nationality: "iran",
        location_status: "inside_armenia",
        primary_goal: "documents",
      },
      {
        has_housing: true,
        has_sim: false,
        has_address_registration: true,
        has_social_card: false,
        has_bank_account: false,
      },
    );
    const r1 = completeOnboarding(
      {
        language: "en",
        nationality: "iran",
        location_status: "inside_armenia",
        primary_goal: "documents",
      },
      {
        has_housing: true,
        has_sim: false,
        has_address_registration: false,
        has_social_card: false,
        has_bank_account: false,
      },
    );
    const fb = deriveGuestOnboardingOutcomePreviewV1(docFallback)!;
    const spec = deriveGuestOnboardingOutcomePreviewV1(r1)!;
    for (const p of [
      fb.primary.page_slug,
      ...fb.secondaries.map((s) => s.page_slug),
      spec.primary.page_slug,
      ...spec.secondaries.map((s) => s.page_slug),
    ]) {
      expect(paths.has(p)).toBe(true);
    }
  });
});
