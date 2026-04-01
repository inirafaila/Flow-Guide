import { z } from "zod";

export const searchIndexRecordTypeSchema = z.enum(["page", "faq", "place"]);

export const searchIndexRecordSchema = z.object({
  id: z.string().min(1),
  type: searchIndexRecordTypeSchema,
  title: z.string().min(1),
  excerpt: z.string(),
  slug: z.string().min(1),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const searchIndexFileSchema = z.array(searchIndexRecordSchema);
