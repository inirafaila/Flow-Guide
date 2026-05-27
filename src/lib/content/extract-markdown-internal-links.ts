/** Markdown absolute internal links: `](/path)` */
const INTERNAL_LINK_RE = /\]\((\/[^)]+)\)/g;

/**
 * Extract root paths from Markdown internal links (no query string).
 * Ignores hash-only targets; strips `#fragment` from otherwise valid paths.
 */
export function extractMarkdownInternalLinkPaths(markdown: string): string[] {
  const paths: string[] = [];
  let match: RegExpExecArray | null;
  INTERNAL_LINK_RE.lastIndex = 0;
  while ((match = INTERNAL_LINK_RE.exec(markdown)) !== null) {
    let href = match[1];
    const hashIndex = href.indexOf("#");
    if (hashIndex >= 0) {
      href = href.slice(0, hashIndex);
    }
    if (!href || !href.startsWith("/")) continue;
    paths.push(href);
  }
  return paths;
}
