import { z } from "zod";
import {
  GUEST_SCHEMA_VERSION,
} from "@/lib/guest/constants";
import {
  userLanguageSchema,
  userLocationStatusSchema,
  userNationalitySchema,
  userPrimaryGoalSchema,
} from "@/lib/schemas/user";

/**
 * Optional onboarding answers — DATA_CONTENT_MODEL_SPEC §15.
 * Enum fields align with src/lib/schemas/user.ts (§5).
 */
export const guestOnboardingPartialSchema = z
  .object({
    language: userLanguageSchema.optional(),
    nationality: userNationalitySchema.optional(),
    location_status: userLocationStatusSchema.optional(),
    primary_goal: userPrimaryGoalSchema.optional(),
    has_housing: z.boolean().optional(),
    has_sim: z.boolean().optional(),
    has_address_registration: z.boolean().optional(),
    has_social_card: z.boolean().optional(),
    has_bank_account: z.boolean().optional(),
  })
  .strict();

export const guestBlobV1Schema = z
  .object({
    schemaVersion: z.literal(GUEST_SCHEMA_VERSION),
    guestSessionId: z.string().uuid(),
    createdAt: z.string().datetime(),
    lastActiveAt: z.string().datetime(),
    onboarding: guestOnboardingPartialSchema.optional(),
  })
  .strict();

export type GuestBlobV1 = z.infer<typeof guestBlobV1Schema>;
export type GuestOnboardingPartial = z.infer<typeof guestOnboardingPartialSchema>;
