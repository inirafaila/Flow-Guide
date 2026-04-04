import { z } from "zod";
import { sourceConfidenceLevelSchema } from "@/lib/schemas/source-record";

/**
 * Phase 1 contract stub — DATA_CONTENT_MODEL_SPEC §12 (Place).
 * §21 "places-lite" uses a lighter field set; this schema is §12-shaped with
 * sensible optional fields for incremental authoring.
 *
 * Canonical frontmatter key: **place_type** (not §21's shorthand `type`) to
 * match §12 enum naming and avoid duplicate concepts in one contract.
 */
export const placeTypeSchema = z.enum([
  "terminal",
  "translator",
  "pharmacy",
  "address-service",
  "transport-point",
  "office",
]);

export const placePaymentMethodSchema = z.enum([
  "cash",
  "card",
  "wallet",
  "terminal",
  "mixed",
]);

/**
 * YAML frontmatter for Markdown under src/content/places/.
 * Core identity + classification required; location, hours, and trust fields optional.
 */
export const placeFrontmatterSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  place_type: placeTypeSchema,
  address: z.string().optional(),
  latitude: z.coerce.number().finite().optional(),
  longitude: z.coerce.number().finite().optional(),
  opening_hours: z.string().optional(),
  payment_methods: z.array(placePaymentMethodSchema).optional(),
  appointment_required: z.boolean().optional(),
  /** Same value set as Source Record §10 — spec §12 confidence_level */
  confidence_level: sourceConfidenceLevelSchema.optional(),
  related_service_tags: z.array(z.string()).optional(),
  notes: z.string().optional(),
  is_active: z.boolean().optional(),
});

export type PlaceFrontmatter = z.infer<typeof placeFrontmatterSchema>;

export function parsePlaceFrontmatter(raw: unknown): PlaceFrontmatter {
  return placeFrontmatterSchema.parse(raw);
}
