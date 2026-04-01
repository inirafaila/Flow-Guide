"use client";

import { useEffect, useState } from "react";
import type { SearchIndexRecord } from "@/types/search-index";

/**
 * Phase 1 — proves `public/search-index.json` is fetchable; no query UX yet.
 */
export function SearchStub() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/search-index.json")
      .then((r) => r.json() as Promise<SearchIndexRecord[]>)
      .then((d) => setCount(Array.isArray(d) ? d.length : 0))
      .catch(() => setCount(0));
  }, []);

  return (
    <p className="muted">
      Search index records (build-time):{" "}
      {count === null ? "…" : count}. Grouped client search in Phase 4.
    </p>
  );
}
