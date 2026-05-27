import { z } from "zod";

/**
 * Phase 1 bounded allowlist — optional frontmatter aligned toward DATA_CONTENT_MODEL_SPEC §9.
 * Not exhaustive; no Source Record, block body, or trust UI in this slice.
 */

/** DATA_CONTENT_MODEL_SPEC §9 page_type + `faq` for Markdown under src/content/faq/. */
export const markdownPageTypeSchema = z.enum([
  "hub",
  "guide",
  "checklist",
  "calculator",
  "service-form",
  "utility",
  "update",
  "faq",
]);

/** DATA_CONTENT_MODEL_SPEC §9 intent_type */
export const intentTypeSchema = z.enum([
  "start",
  "legal",
  "housing",
  "income",
  "payment",
  "movement",
  "setup",
  "safety",
  "adaptation",
]);

/**
 * Urgency framing for indexable pages (§9 urgency_tag), Checklist Item §7
 * urgency_level, and Update Item §11 impact_level — single source of values.
 */
export const urgencyTagSchema = z.enum(["critical", "high", "medium", "low"]);

/** Kebab-case anchor id for FAQ entries under src/content/faq/. */
export const faqIdSchema = z
  .string()
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "faq_id must be kebab-case");

/**
 * Markdown frontmatter under src/content/pages and src/content/faq.
 * New fields are optional or omitted so legacy files keep validating.
 */
export const pageFrontmatterSchema = z.object({
  title: z.string().min(1),
  short_title: z.string().optional(),
  summary: z.string().optional(),
  /** Required for pages; optional for FAQ (use faq_id instead). */
  slug: z.string().min(1).optional(),
  faq_id: faqIdSchema.optional(),
  primary_category: z.string().optional(),
  page_type: markdownPageTypeSchema.optional(),
  audience_tags: z.array(z.string()).optional(),
  last_verified_at: z.string().optional(),
  what_may_vary: z.string().optional(),
  intent_type: intentTypeSchema.optional(),
  related_page_slugs: z.array(z.string().min(1)).optional(),
  searchable: z.boolean().optional(),
  dashboard_linkable: z.boolean().optional(),
  map_linked: z.boolean().optional(),
  urgency_tag: urgencyTagSchema.optional(),
  published_at: z.string().optional(),
  updated_at: z.string().optional(),
  is_active: z.boolean().optional(),
});

export type PageFrontmatter = z.infer<typeof pageFrontmatterSchema>;

export function parsePageFrontmatter(raw: unknown): PageFrontmatter {
  return pageFrontmatterSchema.parse(raw);
}

/** Phase 1 search-index: omit only when explicitly opted out (defaults = include). */
export function shouldIncludeInSearchIndex(
  frontmatter: Pick<PageFrontmatter, "searchable" | "is_active">,
): boolean {
  if (frontmatter.is_active === false) return false;
  if (frontmatter.searchable === false) return false;
  return true;
}
