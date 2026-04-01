import { z } from "zod";

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

/**
 * Minimal frontmatter for Markdown under src/content/pages and src/content/faq.
 * Optional governance fields reserved for later sensitive-page copy (Phase 3+).
 */
export const pageFrontmatterSchema = z.object({
  title: z.string().min(1),
  short_title: z.string().optional(),
  summary: z.string().optional(),
  slug: z.string().min(1),
  primary_category: z.string().optional(),
  page_type: markdownPageTypeSchema.optional(),
  audience_tags: z.array(z.string()).optional(),
  last_verified_at: z.string().optional(),
  what_may_vary: z.string().optional(),
});

export type PageFrontmatter = z.infer<typeof pageFrontmatterSchema>;

export function parsePageFrontmatter(raw: unknown): PageFrontmatter {
  return pageFrontmatterSchema.parse(raw);
}
