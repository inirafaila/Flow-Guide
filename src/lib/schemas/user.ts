import { z } from "zod";

/**
 * Phase 1 contract stub — DATA_CONTENT_MODEL_SPEC §5 (User).
 * Enum-like fields only; no persistence or guest blob wiring.
 */

/** Spec §5 language: fa / en / ru */
export const userLanguageSchema = z.enum(["fa", "en", "ru"]);

/** Spec §5 nationality: iran / russia / india / other */
export const userNationalitySchema = z.enum([
  "iran",
  "russia",
  "india",
  "other",
]);

/** Spec §5 location_status */
export const userLocationStatusSchema = z.enum([
  "inside_armenia",
  "outside_armenia",
]);

/** Spec §5 primary_goal */
export const userPrimaryGoalSchema = z.enum([
  "start-life",
  "work",
  "housing",
  "documents",
]);

/** Spec §5 account_state */
export const userAccountStateSchema = z.enum(["guest", "registered"]);

export type UserLanguage = z.infer<typeof userLanguageSchema>;
export type UserNationality = z.infer<typeof userNationalitySchema>;
export type UserLocationStatus = z.infer<typeof userLocationStatusSchema>;
export type UserPrimaryGoal = z.infer<typeof userPrimaryGoalSchema>;
export type UserAccountState = z.infer<typeof userAccountStateSchema>;
