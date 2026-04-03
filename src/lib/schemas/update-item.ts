import { z } from "zod";
import { urgencyTagSchema } from "@/lib/schemas/content-page";

/**
 * Phase 1 contract stub — DATA_CONTENT_MODEL_SPEC §11 (Update Item).
 * No UI, surfacing, or /updates route behavior.
 */

/**
 * YAML frontmatter for Markdown under src/content/updates/.
 * Core identifiers required; detail prose lives in the Markdown body.
 */
export const updateItemFrontmatterSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  affected_categories: z.array(z.string()).optional(),
  /** Same four-level scale as checklist urgency — spec §11 impact_level */
  impact_level: urgencyTagSchema.optional(),
  summary: z.string().optional(),
  related_page_slugs: z.array(z.string()).optional(),
  source_ids: z.array(z.string()).optional(),
  published_at: z.string().optional(),
  effective_date: z.string().optional(),
  is_active: z.boolean().optional(),
});

export type UpdateItemFrontmatter = z.infer<typeof updateItemFrontmatterSchema>;

export function parseUpdateItemFrontmatter(raw: unknown): UpdateItemFrontmatter {
  return updateItemFrontmatterSchema.parse(raw);
}
