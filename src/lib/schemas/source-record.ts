import { z } from "zod";

/**
 * Phase 1 contract stub — DATA_CONTENT_MODEL_SPEC §10 (Source Record).
 * No trust UI, page wiring, or search-index ingestion.
 */

/** Spec §10 source_type */
export const sourceTypeSchema = z.enum([
  "official",
  "near-official",
  "org-document",
  "field-experience",
  "community-report",
]);

/** Spec §10 confidence_level (high / medium / low only — not urgency_tag). */
export const sourceConfidenceLevelSchema = z.enum(["high", "medium", "low"]);

/**
 * YAML frontmatter for Markdown under src/content/sources/.
 * Core linkage + attribution required; timing and notes optional for incremental authoring.
 */
export const sourceRecordFrontmatterSchema = z.object({
  id: z.string().min(1),
  /** Logical page key (e.g. page slug under src/content/pages/) */
  page_id: z.string().min(1),
  source_type: sourceTypeSchema,
  source_label: z.string().min(1),
  source_url: z.string().min(1),
  confidence_level: sourceConfidenceLevelSchema,
  verified_at: z.string().optional(),
  notes: z.string().optional(),
  is_primary: z.boolean().optional(),
});

export type SourceRecordFrontmatter = z.infer<
  typeof sourceRecordFrontmatterSchema
>;

export function parseSourceRecordFrontmatter(
  raw: unknown,
): SourceRecordFrontmatter {
  return sourceRecordFrontmatterSchema.parse(raw);
}
