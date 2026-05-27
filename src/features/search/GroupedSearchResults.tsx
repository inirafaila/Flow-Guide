"use client";

import { useTranslations } from "next-intl";

import { SEARCH_RESULT_GROUP_ORDER } from "@/lib/search/search-result-groups";
import type { ScoredSearchResult } from "@/lib/search/match-search-records";
import type { SearchResultGroup } from "@/types/search-index";

import { SearchResultRow } from "./SearchResultRow";

type GroupedSearchResultsProps = {
  results: ScoredSearchResult[];
};

function groupResults(
  results: ScoredSearchResult[],
): Map<SearchResultGroup, ScoredSearchResult[]> {
  const map = new Map<SearchResultGroup, ScoredSearchResult[]>();
  for (const item of results) {
    const g = item.record.group;
    const list = map.get(g) ?? [];
    list.push(item);
    map.set(g, list);
  }
  return map;
}

export function GroupedSearchResults({ results }: GroupedSearchResultsProps) {
  const t = useTranslations("search");
  const byGroup = groupResults(results);

  return (
    <div className="search-results">
      {SEARCH_RESULT_GROUP_ORDER.map((group) => {
        const items = byGroup.get(group);
        if (!items || items.length === 0) return null;
        return (
          <section
            key={group}
            className="search-results__group"
            aria-labelledby={`search-group-${group}`}
          >
            <h2 id={`search-group-${group}`} className="search-results__group-title">
              {t(`groups.${group}`)}
            </h2>
            <ul className="search-results__list">
              {items.map((item) => (
                <SearchResultRow key={item.record.id} record={item.record} />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
