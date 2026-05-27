import type { UpdateItem } from "@/lib/content/load-update-items";

/**
 * Returns the first `maxCount` items from a list already sorted newest-first
 * (as produced by `loadUpdateItems`).
 */
export function selectLatestUpdates(
  items: readonly UpdateItem[],
  maxCount: number,
): UpdateItem[] {
  if (maxCount <= 0 || items.length === 0) {
    return [];
  }
  return items.slice(0, maxCount);
}
