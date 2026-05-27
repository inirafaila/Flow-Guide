"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import type { SearchIndexRecord } from "@/types/search-index";

type SearchResultRowProps = {
  record: SearchIndexRecord;
};

export function SearchResultRow({ record }: SearchResultRowProps) {
  const t = useTranslations("search");

  return (
    <li className="search-result-row">
      <Link href={record.href} className="search-result-row__link">
        <span className="search-result-row__title">{record.title}</span>
        <span className="search-result-row__type muted">
          {t(`typeLabel.${record.type}`)}
        </span>
        {record.excerpt ? (
          <span className="search-result-row__excerpt muted">
            {record.excerpt}
          </span>
        ) : null}
      </Link>
    </li>
  );
}
