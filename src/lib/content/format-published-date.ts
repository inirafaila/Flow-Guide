const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * Display-only formatter for update `published_at` (YYYY-MM-DD).
 * Does not validate loader requirements.
 */
export function formatPublishedDate(iso: string, locale: string): string {
  const trimmed = iso.trim();
  const match = ISO_DATE.exec(trimmed);
  if (!match) return trimmed;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return trimmed;
  const date = new Date(Date.UTC(year, month - 1, day));
  if (Number.isNaN(date.getTime())) return trimmed;
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return trimmed;
  }

  try {
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    }).format(date);
  } catch {
    return trimmed;
  }
}
