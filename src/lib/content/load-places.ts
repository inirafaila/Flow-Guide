import fs from "node:fs";
import path from "node:path";
import {
  parseMarkdownPlace,
  type ParsedMarkdownPlace,
} from "@/lib/content/parse-md";

const PLACES_DIR = "places";

function listMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => path.join(dir, name));
}

/**
 * Load and validate every Place Markdown file under src/content/places/.
 * Node-only (scripts/tests). Fails fast on first invalid file.
 */
export function loadValidatedPlaces(contentRoot: string): ParsedMarkdownPlace[] {
  const dir = path.join(contentRoot, PLACES_DIR);
  const out: ParsedMarkdownPlace[] = [];
  for (const filePath of listMarkdownFiles(dir)) {
    const raw = fs.readFileSync(filePath, "utf8");
    try {
      out.push(parseMarkdownPlace(raw));
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      throw new Error(`Invalid place record ${filePath}: ${msg}`);
    }
  }
  return out;
}
