/**
 * Phase 1 page-type classification for dynamic slug routes.
 * Maps slugs to template kind without product behavior.
 */

export type DocumentsSlugTemplate = "calculator" | "guide";

export type HousingSlugTemplate = "serviceForm" | "guide";

export function templateForDocumentsSlug(slug: string): DocumentsSlugTemplate {
  return slug === "stay-calculator" ? "calculator" : "guide";
}

export function templateForHousingSlug(slug: string): HousingSlugTemplate {
  return slug === "request" ? "serviceForm" : "guide";
}
