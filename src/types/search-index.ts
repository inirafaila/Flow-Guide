/**
 * Build-time search index records (client query in Phase 4).
 * Align fields with ENGINEERING_ARCHITECTURE §4.
 */
export type SearchResultGroup = "guides" | "faq" | "tools" | "places";

export type SearchIndexRecordType = "page" | "faq" | "tool" | "place";

export type SearchIndexRecord = {
  id: string;
  type: SearchIndexRecordType;
  title: string;
  excerpt: string;
  href: string;
  group: SearchResultGroup;
  tags?: string[];
};
