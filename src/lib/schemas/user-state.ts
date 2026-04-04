import { z } from "zod";

/**
 * Phase 1 contract stub — DATA_CONTENT_MODEL_SPEC §6 (User State).
 * Suggested enums only + optional thin object shape; no NBA or persistence.
 */

/** Spec §6 remaining_days_status */
export const remainingDaysStatusSchema = z.enum([
  "safe",
  "watch",
  "urgent",
  "overdue-risk",
]);

/** Spec §6 residency_stage */
export const residencyStageSchema = z.enum([
  "not-started",
  "researching",
  "address-pending",
  "social-card-pending",
  "residency-pending",
  "in-review",
  "completed",
]);

/** Spec §6 housing_stage */
export const housingStageSchema = z.enum([
  "no-place",
  "temporary-place",
  "searching-rental",
  "rental-secured",
]);

/** Spec §6 work_stage */
export const workStageSchema = z.enum([
  "not-started",
  "exploring",
  "quick-income-track",
  "stable-job-track",
  "working",
]);

/** Spec §6 payment_readiness */
export const paymentReadinessSchema = z.enum([
  "cash-only",
  "terminal-capable",
  "wallet-capable",
  "bank-ready",
  "bank-active",
]);

/**
 * Optional coherence stub matching §6 field names (all non-enum fields loose).
 */
export const userStateStubSchema = z.object({
  user_id: z.string().min(1),
  remaining_days_estimate: z.number().optional(),
  remaining_days_status: remainingDaysStatusSchema.optional(),
  residency_stage: residencyStageSchema.optional(),
  housing_stage: housingStageSchema.optional(),
  work_stage: workStageSchema.optional(),
  payment_readiness: paymentReadinessSchema.optional(),
  urgent_flags: z.array(z.string()).optional(),
  recommended_primary_action: z.string().optional(),
  recommended_secondary_actions: z.array(z.string()).optional(),
  updated_at: z.string().optional(),
});

export type RemainingDaysStatus = z.infer<typeof remainingDaysStatusSchema>;
export type ResidencyStage = z.infer<typeof residencyStageSchema>;
export type HousingStage = z.infer<typeof housingStageSchema>;
export type WorkStage = z.infer<typeof workStageSchema>;
export type PaymentReadiness = z.infer<typeof paymentReadinessSchema>;
export type UserStateStub = z.infer<typeof userStateStubSchema>;
