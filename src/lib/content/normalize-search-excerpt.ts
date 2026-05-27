const DEFAULT_MAX_LEN = 240;

/**
 * Plain-text excerpt for search index (build-time only).
 */
export function normalizeSearchExcerpt(
  text: string,
  maxLen: number = DEFAULT_MAX_LEN,
): string {
  let s = text.replace(/\s+/g, " ").trim();
  s = s.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
  s = s.replace(/\*\*([^*]+)\*\*/g, "$1");
  s = s.replace(/\*([^*]+)\*/g, "$1");
  s = s.replace(/`([^`]+)`/g, "$1");
  if (s.length > maxLen) {
    return s.slice(0, maxLen);
  }
  return s;
}
