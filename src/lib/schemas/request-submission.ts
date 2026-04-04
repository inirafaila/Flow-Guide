import { z } from "zod";

/**
 * Phase 1 contract stub — DATA_CONTENT_MODEL_SPEC §13 (Request Submission).
 * Pure contract; no Route Handlers, POST, or storage.
 */

/** Spec §13 request_type */
export const requestSubmissionTypeSchema = z.enum([
  "housing-request",
  "casino-referral",
]);

/** Spec §13 status */
export const requestSubmissionStatusSchema = z.enum([
  "submitted",
  "reviewing",
  "closed",
]);

/**
 * Spec §13 fields. `user_id` maps spec concept `user_id_nullable` (nullable id).
 * `payload_json` is opaque JSON-compatible data at this layer.
 */
export const requestSubmissionRecordSchema = z.object({
  id: z.string().min(1),
  request_type: requestSubmissionTypeSchema,
  user_id: z.string().nullable(),
  contact_name: z.string(),
  contact_method: z.string(),
  payload_json: z.unknown(),
  status: requestSubmissionStatusSchema,
  submitted_at: z.string(),
});

export type RequestSubmissionType = z.infer<typeof requestSubmissionTypeSchema>;
export type RequestSubmissionStatus = z.infer<
  typeof requestSubmissionStatusSchema
>;
export type RequestSubmissionRecord = z.infer<
  typeof requestSubmissionRecordSchema
>;
