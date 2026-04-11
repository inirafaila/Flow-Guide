import Link from "next/link";
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

const STATUS_LABEL: Record<ChecklistItemStatus, string> = {
  "not-started": "Not started",
  "in-progress": "In progress",
  done: "Done",
  revisit: "Revisit",
};

function formatCategoryLabel(category: string): string {
  return category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * Presentational row for one filtered checklist item (Phase 2).
 * No client state; optional destination link; visual lock when prerequisites are unmet.
 */
export function ChecklistItemRow({
  data,
  status = "not-started",
  className = "",
}: ChecklistItemRowProps) {
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

  const body = (
    <>
      <div className="fg-checklist-row__meta">
        {item.category !== undefined ? (
          <span className="fg-checklist-row__category">
            {formatCategoryLabel(item.category)}
          </span>
        ) : null}
        {urgency !== undefined ? (
          <span className={urgencyClass} aria-label={`Urgency: ${urgency}`} />
        ) : null}
        <span className={statusClass}>{STATUS_LABEL[status]}</span>
        {locked ? (
          <span className="fg-checklist-row__lock" title="Prerequisites not met yet">
            Locked
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
