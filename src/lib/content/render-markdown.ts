import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeStringify);

/**
 * Render a Markdown string to an HTML string. Server-only, synchronous.
 * Content is repo-authored only (no user-generated input on this path).
 */
export function renderMarkdownToHtml(markdown: string): string {
  const result = processor.processSync(markdown);
  return String(result);
}
