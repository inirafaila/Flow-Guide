"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import type { ScoredSearchResult } from "@/lib/search/match-search-records";

type SearchBestMatchProps = {
  result: ScoredSearchResult;
};

export function SearchBestMatch({ result }: SearchBestMatchProps) {
  const t = useTranslations("search");
  const { record } = result;

  return (
    <section className="search-best-match" aria-labelledby="search-best-match-title">
      <h2 id="search-best-match-title" className="search-best-match__label">
        {t("bestMatchLabel")}
      </h2>
      <Link href={record.href} className="search-best-match__card fg-card">
        <span className="search-best-match__title">{record.title}</span>
        <span className="search-best-match__type muted">
          {t(`typeLabel.${record.type}`)}
        </span>
        {record.excerpt ? (
          <p className="search-best-match__excerpt muted">{record.excerpt}</p>
        ) : null}
      </Link>
    </section>
  );
}
