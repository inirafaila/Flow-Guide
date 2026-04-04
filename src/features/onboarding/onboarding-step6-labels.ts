/**
 * Limited slug → i18n key mapping for Step 6 secondary links only.
 * Must match slugs {@link deriveGuestOnboardingOutcomePreviewV1} may return.
 */
export const STEP6_KNOWN_CHECKLIST_SLUGS = new Set([
  "address-registration",
  "social-card",
  "stay-calculator",
  "documents-hub",
  "housing-hub",
  "work-hub",
  "newcomer-hub",
  "neutral-hub",
]);

export function step6SecondaryVisibleLabel(
  checklistItemSlug: string,
  pageSlug: string,
  t: (key: string, values?: Record<string, string>) => string,
): string {
  if (STEP6_KNOWN_CHECKLIST_SLUGS.has(checklistItemSlug)) {
    return t(`step6.checklistSlug.${checklistItemSlug}`);
  }
  return t("step6.checklistSlug.fallback", { path: pageSlug });
}
