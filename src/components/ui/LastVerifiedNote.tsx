export type LastVerifiedNoteProps = {
  verifiedAt: string;
  className?: string;
};

/**
 * Presentational last-verified line for guide trust metadata.
 * Date string is shown as-is (i18n formatting deferred).
 */
export function LastVerifiedNote({
  verifiedAt,
  className = "",
}: LastVerifiedNoteProps) {
  if (verifiedAt === "") {
    return null;
  }

  const merged = ["fg-last-verified", className].filter(Boolean).join(" ");

  return (
    <p className={merged}>
      <span className="fg-last-verified__prefix" aria-hidden>
        ✓
      </span>
      Last verified: {verifiedAt}
    </p>
  );
}
