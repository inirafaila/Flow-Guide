import type { SourceRecordFrontmatter } from "@/lib/schemas/source-record";

export type SourceBlockProps = {
  sources: SourceRecordFrontmatter[];
  className?: string;
};

const SOURCE_TYPE_LABELS: Record<string, string> = {
  official: "Official",
  "near-official": "Near-official",
  "org-document": "Org document",
  "field-experience": "Field experience",
  "community-report": "Community report",
};

const CONFIDENCE_LABELS: Record<
  SourceRecordFrontmatter["confidence_level"],
  string
> = {
  high: "High confidence",
  medium: "Medium confidence",
  low: "Low confidence",
};

function sourceTypeLabel(sourceType: SourceRecordFrontmatter["source_type"]): string {
  return SOURCE_TYPE_LABELS[sourceType] ?? sourceType;
}

/**
 * Presentational source attribution block (guide trust layer).
 * No client state; empty sources yields null.
 */
export function SourceBlock({ sources, className = "" }: SourceBlockProps) {
  if (sources.length === 0) {
    return null;
  }

  const rootClass = ["fg-source-block", className].filter(Boolean).join(" ");

  return (
    <aside className={rootClass} aria-label="Sources">
      <h4 className="fg-source-block__heading">Sources</h4>
      <ul className="fg-source-block__list">
        {sources.map((source) => {
          const url = source.source_url?.trim();
          const hasUrl = Boolean(url);
          const typeText = sourceTypeLabel(source.source_type);
          const conf = source.confidence_level;
          const confClass = `fg-source-block__confidence fg-source-block__confidence--${conf}`;
          const labelEl = hasUrl ? (
            <a
              className="fg-source-block__label"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {source.source_label}
            </a>
          ) : (
            <span className="fg-source-block__label">{source.source_label}</span>
          );

          return (
            <li className="fg-source-block__item" key={source.id}>
              <div className="fg-source-block__row">
                {labelEl}
                <div className="fg-source-block__meta">
                  <span className="fg-source-block__type">{typeText}</span>
                  <span className={confClass}>
                    <span className="fg-source-block__confidence-dot" aria-hidden />
                    <span>{CONFIDENCE_LABELS[conf]}</span>
                  </span>
                  {source.is_primary === true ? (
                    <span className="fg-source-block__primary">Primary</span>
                  ) : null}
                </div>
                {source.notes !== undefined && source.notes.trim().length > 0 ? (
                  <p className="fg-source-block__notes muted">{source.notes}</p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
