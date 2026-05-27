"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import type { FilteredChecklistItemV1 } from "@/lib/checklist/checklist-filter";

export type ChecklistItemStatus =
  | "not-started"
  | "in-progress"
  | "done"
  | "revisit";

export type ChecklistItemRowProps = {
  data: FilteredChecklistItemV1;
  status?: ChecklistItemStatus;
  className?: string;
};

const STATUS_MESSAGE_KEY: Record<ChecklistItemStatus, string> = {
  "not-started": "notStarted",
  "in-progress": "inProgress",
  done: "done",
  revisit: "revisit",
};

function formatCategoryLabel(category: string): string {
  return category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * Presentational row for one filtered checklist item (Phase 2).
 * Optional destination link; visual lock when prerequisites are unmet.
 */
export function ChecklistItemRow({
  data,
  status = "not-started",
  className = "",
}: ChecklistItemRowProps) {
  const t = useTranslations("checklistRow");
  const { item, prerequisites_met } = data;
  const locked = !prerequisites_met;
  const href = item.primary_destination_slug?.trim();

  const rootClass = [
    "fg-checklist-row",
    locked ? "fg-checklist-row--locked" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const urgency = item.urgency_level;
  const urgencyClass =
    urgency !== undefined
      ? `fg-checklist-row__urgency fg-checklist-row__urgency--${urgency}`
      : "";

  const statusClass = `fg-checklist-row__status fg-checklist-row__status--${status}`;
  const statusLabel = t(`status.${STATUS_MESSAGE_KEY[status]}`);

  const body = (
    <>
      <div className="fg-checklist-row__meta">
        {item.category !== undefined ? (
          <span className="fg-checklist-row__category">
            {formatCategoryLabel(item.category)}
          </span>
        ) : null}
        {urgency !== undefined ? (
          <span
            className={urgencyClass}
            aria-label={t("urgencyA11y", { level: urgency })}
          />
        ) : null}
        <span className={statusClass}>{statusLabel}</span>
        {locked ? (
          <span className="fg-checklist-row__lock" title={t("locked")}>
            {t("locked")}
          </span>
        ) : null}
      </div>
      <h3 className="fg-checklist-row__title">{item.title}</h3>
      {item.estimated_effort !== undefined ? (
        <p className="fg-checklist-row__effort muted">{item.estimated_effort}</p>
      ) : null}
    </>
  );

  return (
    <article className={rootClass}>
      {href !== undefined && href.length > 0 ? (
        <Link href={href} className="fg-checklist-row__link">
          <span className="fg-checklist-row__link-body">{body}</span>
          <span className="fg-checklist-row__link-arrow" aria-hidden>
            →
          </span>
        </Link>
      ) : (
        <div className="fg-checklist-row__static">{body}</div>
      )}
    </article>
  );
}
