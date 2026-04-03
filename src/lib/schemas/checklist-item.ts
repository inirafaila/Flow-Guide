import { z } from "zod";
import { urgencyTagSchema } from "@/lib/schemas/content-page";

/**
 * Phase 1 contract stub — DATA_CONTENT_MODEL_SPEC §7 (Checklist Item).
 * No filtering, persistence, or dashboard behavior.
 */

/** Spec §7 category */
export const checklistItemCategorySchema = z.enum([
  "newcomer",
  "documents",
  "housing",
  "work",
  "payments",
  "transport",
  "daily-life",
]);

/** Spec §7 estimated_effort */
export const estimatedEffortSchema = z.enum([
  "5-min",
  "15-min",
  "30-min",
  "half-day",
  "multi-step",
]);

/**
 * YAML frontmatter for Markdown under src/content/checklist-items/.
 * Core identifiers required; remaining fields optional for incremental authoring.
 */
export const checklistItemFrontmatterSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  short_label: z.string().optional(),
  category: checklistItemCategorySchema.optional(),
  description: z.string().optional(),
  applies_to_rules: z.array(z.string()).optional(),
  prerequisite_ids: z.array(z.string()).optional(),
  primary_destination_slug: z.string().optional(),
  secondary_destination_slugs: z.array(z.string()).optional(),
  /** Same value set as page urgency_tag — spec §7 urgency_level */
  urgency_level: urgencyTagSchema.optional(),
  estimated_effort: estimatedEffortSchema.optional(),
  default_order: z.number().int().optional(),
  is_active: z.boolean().optional(),
});

export type ChecklistItemFrontmatter = z.infer<
  typeof checklistItemFrontmatterSchema
>;

export function parseChecklistItemFrontmatter(
  raw: unknown,
): ChecklistItemFrontmatter {
  return checklistItemFrontmatterSchema.parse(raw);
}
