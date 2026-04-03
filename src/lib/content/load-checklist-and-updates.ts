import fs from "node:fs";
import path from "node:path";
import {
  parseMarkdownChecklistItem,
  parseMarkdownUpdateItem,
  type ParsedMarkdownChecklistItem,
  type ParsedMarkdownUpdateItem,
} from "@/lib/content/parse-md";

const CHECKLIST_DIR = "checklist-items";
const UPDATES_DIR = "updates";

function listMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => path.join(dir, name));
}

/**
 * Load and validate every checklist Markdown file under src/content/checklist-items/.
 * Node-only (scripts/tests). Fails fast on first invalid file.
 */
export function loadValidatedChecklistItems(
  contentRoot: string,
): ParsedMarkdownChecklistItem[] {
  const dir = path.join(contentRoot, CHECKLIST_DIR);
  const out: ParsedMarkdownChecklistItem[] = [];
  for (const filePath of listMarkdownFiles(dir)) {
    const raw = fs.readFileSync(filePath, "utf8");
    try {
      out.push(parseMarkdownChecklistItem(raw));
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      throw new Error(`Invalid checklist item ${filePath}: ${msg}`);
    }
  }
  return out;
}

/**
 * Load and validate every update Markdown file under src/content/updates/.
 * Node-only (scripts/tests). Fails fast on first invalid file.
 */
export function loadValidatedUpdateItems(
  contentRoot: string,
): ParsedMarkdownUpdateItem[] {
  const dir = path.join(contentRoot, UPDATES_DIR);
  const out: ParsedMarkdownUpdateItem[] = [];
  for (const filePath of listMarkdownFiles(dir)) {
    const raw = fs.readFileSync(filePath, "utf8");
    try {
      out.push(parseMarkdownUpdateItem(raw));
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      throw new Error(`Invalid update item ${filePath}: ${msg}`);
    }
  }
  return out;
}
