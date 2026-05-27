import type { SearchIndexRecord } from "@/types/search-index";

export type ScoredSearchResult = {
  record: SearchIndexRecord;
  score: number;
};

const BEST_MATCH_MIN_SCORE = 8;
const BEST_MATCH_SCORE_MARGIN = 3;

export function normalizeSearchQuery(raw: string): {
  normalizedQuery: string;
  tokens: string[];
} {
  const normalizedQuery = raw.trim().toLowerCase().replace(/\s+/g, " ");
  const tokens = normalizedQuery.length > 0 ? normalizedQuery.split(" ") : [];
  return { normalizedQuery, tokens };
}

function searchableText(record: SearchIndexRecord): string {
  const tags = record.tags?.join(" ") ?? "";
  return `${record.title} ${record.excerpt} ${tags}`.toLowerCase();
}

function tokenHitsField(
  field: string,
  tokens: string[],
): number {
  const lower = field.toLowerCase();
  let hits = 0;
  for (const token of tokens) {
    if (lower.includes(token)) hits += 1;
  }
  return hits;
}

function countMatchedTokens(text: string, tokens: string[]): number {
  let count = 0;
  for (const token of tokens) {
    if (text.includes(token)) count += 1;
  }
  return count;
}

function isEligible(
  record: SearchIndexRecord,
  normalizedQuery: string,
  tokens: string[],
): boolean {
  if (tokens.length === 0) return false;
  const text = searchableText(record);
  if (tokens.length === 1) {
    return text.includes(tokens[0]!);
  }
  if (text.includes(normalizedQuery)) return true;
  return countMatchedTokens(text, tokens) >= 2;
}

function scoreRecord(
  record: SearchIndexRecord,
  normalizedQuery: string,
  tokens: string[],
): number {
  const title = record.title.toLowerCase();
  const excerpt = record.excerpt.toLowerCase();
  const tagsJoined = (record.tags ?? []).join(" ").toLowerCase();

  let score = 0;
  score += tokenHitsField(title, tokens) * 10;
  score += tokenHitsField(excerpt, tokens) * 3;
  score += tokenHitsField(tagsJoined, tokens) * 1;
  if (normalizedQuery.length > 0 && title.includes(normalizedQuery)) {
    score += 5;
  }
  return score;
}

export function matchSearchRecords(
  records: SearchIndexRecord[],
  rawQuery: string,
): ScoredSearchResult[] {
  const { normalizedQuery, tokens } = normalizeSearchQuery(rawQuery);
  if (tokens.length === 0) return [];

  const scored: ScoredSearchResult[] = [];
  for (const record of records) {
    if (!isEligible(record, normalizedQuery, tokens)) continue;
    scored.push({
      record,
      score: scoreRecord(record, normalizedQuery, tokens),
    });
  }

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.record.title.localeCompare(b.record.title);
  });
  return scored;
}

export function pickBestMatch(
  results: ScoredSearchResult[],
  normalizedQuery: string,
): ScoredSearchResult | null {
  if (normalizedQuery.length < 2 || results.length === 0) return null;
  const top = results[0]!;
  if (top.score < BEST_MATCH_MIN_SCORE) return null;
  const second = results[1];
  if (second !== undefined && top.score < second.score + BEST_MATCH_SCORE_MARGIN) {
    return null;
  }
  return top;
}
