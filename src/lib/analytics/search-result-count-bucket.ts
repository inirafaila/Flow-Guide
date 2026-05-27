export type SearchResultCountBucket = "0" | "1-3" | "4+";

/** Maps search hit count to coarse Plausible bucket (no query text). */
export function searchResultCountBucket(count: number): SearchResultCountBucket {
  if (count <= 0) return "0";
  if (count <= 3) return "1-3";
  return "4+";
}
