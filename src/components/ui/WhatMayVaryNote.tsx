export type WhatMayVaryNoteProps = {
  note: string;
  variant?: "low" | "high";
  className?: string;
};

/**
 * Presentational variance / disclaimer framing for sensitive guide content.
 */
export function WhatMayVaryNote({
  note,
  variant = "low",
  className = "",
}: WhatMayVaryNoteProps) {
  if (note === "") {
    return null;
  }

  const rootClass = [
    "fg-what-may-vary",
    `fg-what-may-vary--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <aside className={rootClass} aria-label="What may vary">
      <h4 className="fg-what-may-vary__heading">What may vary</h4>
      <p className="fg-what-may-vary__body">{note}</p>
    </aside>
  );
}
