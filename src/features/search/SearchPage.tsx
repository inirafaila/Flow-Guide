"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import { searchResultCountBucket } from "@/lib/analytics/search-result-count-bucket";
import { trackEvent } from "@/lib/analytics/track-event";

import {
  matchSearchRecords,
  normalizeSearchQuery,
  pickBestMatch,
} from "@/lib/search/match-search-records";

import { GroupedSearchResults } from "./GroupedSearchResults";
import { SearchBestMatch } from "./SearchBestMatch";
import { useSearchIndex } from "./useSearchIndex";

const DEBOUNCE_MS = 200;

export function SearchPage() {
  const t = useTranslations("search");
  const indexState = useSearchIndex();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const id = window.setTimeout(() => setDebouncedQuery(query), DEBOUNCE_MS);
    return () => window.clearTimeout(id);
  }, [query]);

  const { normalizedQuery } = normalizeSearchQuery(debouncedQuery);

  const results = useMemo(() => {
    if (indexState.status !== "ready") return [];
    return matchSearchRecords(indexState.records, debouncedQuery);
  }, [indexState, debouncedQuery]);

  const bestMatch = useMemo(
    () => pickBestMatch(results, normalizedQuery),
    [results, normalizedQuery],
  );

  const showResults = normalizedQuery.length > 0;
  const isLoadingIndex = indexState.status === "loading";
  const lastSearchUsedKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (indexState.status !== "ready") return;
    if (normalizedQuery.length === 0) return;

    if (lastSearchUsedKeyRef.current === normalizedQuery) return;
    lastSearchUsedKeyRef.current = normalizedQuery;

    const count = results.length;
    trackEvent("search_used", {
      has_results: count > 0,
      result_count_bucket: searchResultCountBucket(count),
    });
  }, [indexState.status, debouncedQuery, normalizedQuery, results.length]);

  return (
    <div className="search-page__body" role="search">
      <label className="search-page__field">
        <span className="search-page__label">{t("inputLabel")}</span>
        <input
          type="search"
          className="search-page__input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("inputPlaceholder")}
          autoComplete="off"
          disabled={indexState.status === "error"}
        />
      </label>

      {indexState.status === "error" ? (
        <p className="search-page__message muted">{t("loadError")}</p>
      ) : null}

      {isLoadingIndex ? (
        <p className="search-page__message muted" aria-busy="true">
          {t("loading")}
        </p>
      ) : null}

      {!isLoadingIndex && indexState.status === "ready" && !showResults ? (
        <div className="search-page__empty fg-card">
          <p className="search-page__empty-intro muted">{t("emptyIntro")}</p>
          <ul className="search-page__empty-links">
            <li>
              <Link href="/faq">{t("emptyLinkFaq")}</Link>
            </li>
            <li>
              <Link href="/newcomer">{t("emptyLinkNewcomer")}</Link>
            </li>
            <li>
              <Link href="/documents">{t("emptyLinkDocuments")}</Link>
            </li>
          </ul>
        </div>
      ) : null}

      {showResults && indexState.status === "ready" ? (
        <>
          <p className="search-page__status muted" aria-live="polite">
            {results.length === 0
              ? t("noResults")
              : t("resultCount", { count: results.length })}
          </p>
          {results.length === 0 ? (
            <p className="search-page__no-results-hint muted">
              {t("noResultsHint")}{" "}
              <Link href="/faq">{t("emptyLinkFaq")}</Link>
            </p>
          ) : (
            <>
              {bestMatch ? <SearchBestMatch result={bestMatch} /> : null}
              <GroupedSearchResults results={results} />
            </>
          )}
        </>
      ) : null}
    </div>
  );
}
