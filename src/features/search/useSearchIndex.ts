"use client";

import { useEffect, useState } from "react";

import { searchIndexFileSchema } from "@/lib/schemas/search-index";
import type { SearchIndexRecord } from "@/types/search-index";

export type SearchIndexLoadState =
  | { status: "loading" }
  | { status: "ready"; records: SearchIndexRecord[] }
  | { status: "error" };

export function useSearchIndex(): SearchIndexLoadState {
  const [state, setState] = useState<SearchIndexLoadState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    fetch("/search-index.json")
      .then((r) => {
        if (!r.ok) throw new Error(`search-index fetch failed: ${r.status}`);
        return r.json() as Promise<unknown>;
      })
      .then((data) => {
        const parsed = searchIndexFileSchema.safeParse(data);
        if (!parsed.success) {
          throw new Error("search-index validation failed");
        }
        if (!cancelled) {
          setState({ status: "ready", records: parsed.data });
        }
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
