import type { SearchResultGroup } from "@/types/search-index";

/** Fixed UI section order for grouped search results. */
export const SEARCH_RESULT_GROUP_ORDER: readonly SearchResultGroup[] = [
  "guides",
  "tools",
  "faq",
  "places",
] as const;
