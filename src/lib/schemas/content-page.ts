import { z } from "zod";

/**
 * Minimal frontmatter for Markdown pages under src/content/pages.
 * Extend toward DATA_CONTENT_MODEL_SPEC.md (owner, last_verified, etc.).
 */
export const pageFrontmatterSchema = z.object({
  title: z.string().min(1),
  summary: z.string().optional(),
  slug: z.string().min(1),
  primary_category: z.string().optional(),
  page_type: z.string().optional(),
});

export type PageFrontmatter = z.infer<typeof pageFrontmatterSchema>;

export function parsePageFrontmatter(raw: unknown): PageFrontmatter {
  return pageFrontmatterSchema.parse(raw);
}
