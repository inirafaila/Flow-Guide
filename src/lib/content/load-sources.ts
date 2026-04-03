import fs from "node:fs";
import path from "node:path";
import {
  parseMarkdownSourceRecord,
  type ParsedMarkdownSourceRecord,
} from "@/lib/content/parse-md";

const SOURCES_DIR = "sources";

function listMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => path.join(dir, name));
}

/**
 * Load and validate every Source Record Markdown file under src/content/sources/.
 * Node-only (scripts/tests). Fails fast on first invalid file.
 */
export function loadValidatedSourceRecords(
  contentRoot: string,
): ParsedMarkdownSourceRecord[] {
  const dir = path.join(contentRoot, SOURCES_DIR);
  const out: ParsedMarkdownSourceRecord[] = [];
  for (const filePath of listMarkdownFiles(dir)) {
    const raw = fs.readFileSync(filePath, "utf8");
    try {
      out.push(parseMarkdownSourceRecord(raw));
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      throw new Error(`Invalid source record ${filePath}: ${msg}`);
    }
  }
  return out;
}
