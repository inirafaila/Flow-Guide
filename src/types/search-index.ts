/**
 * Build-time search index records (client query in Phase 4).
 * Align fields with ENGINEERING_ARCHITECTURE §4 over time.
 */
export type SearchIndexRecordType = "page" | "faq" | "place";

export type SearchIndexRecord = {
  id: string;
  type: SearchIndexRecordType;
  title: string;
  excerpt: string;
  slug: string;
  category?: string;
  tags?: string[];
};
