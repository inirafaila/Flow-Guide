import { z } from "zod";

export const searchResultGroupSchema = z.enum([
  "guides",
  "faq",
  "tools",
  "places",
]);

export const searchIndexRecordTypeSchema = z.enum([
  "page",
  "faq",
  "tool",
  "place",
]);

export const searchIndexRecordSchema = z.object({
  id: z.string().min(1),
  type: searchIndexRecordTypeSchema,
  title: z.string().min(1),
  excerpt: z.string(),
  href: z.string().min(1),
  group: searchResultGroupSchema,
  tags: z.array(z.string()).optional(),
});

export const searchIndexFileSchema = z.array(searchIndexRecordSchema);
