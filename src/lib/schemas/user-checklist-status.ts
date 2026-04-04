import { z } from "zod";

/**
 * Phase 1 contract stub — DATA_CONTENT_MODEL_SPEC §8 (User Checklist Status).
 * Status enum + thin record shape; no checklist filtering or mutations.
 */

/** Spec §8 status */
export const userChecklistStatusSchema = z.enum([
  "not-started",
  "in-progress",
  "done",
  "revisit",
]);

export const userChecklistStatusRecordSchema = z.object({
  user_id: z.string().min(1),
  checklist_item_id: z.string().min(1),
  status: userChecklistStatusSchema,
  updated_at: z.string().optional(),
  note: z.string().optional(),
});

export type UserChecklistStatus = z.infer<typeof userChecklistStatusSchema>;
export type UserChecklistStatusRecord = z.infer<
  typeof userChecklistStatusRecordSchema
>;
