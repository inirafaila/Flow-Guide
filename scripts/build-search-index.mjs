#!/usr/bin/env node
/**
 * Build-time: emit public/search-index.json from Markdown under src/content.
 * Uses Node built-ins only so prebuild can run even if node_modules is mid-install.
 * Phase 1 stub — extend for places-lite and stricter YAML later (Zod optional).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outFile = path.join(root, "public", "search-index.json");

/** @param {string} source */
function parseSimpleFrontmatter(source) {
  const m = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return null;
  const raw = m[1];
  const body = m[2].trim();
  /** @type {Record<string, string>} */
  const data = {};
  for (const line of raw.split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    data[key] = val;
  }
  return { data, body };
}

function walkMd(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...walkMd(p));
    else if (e.isFile() && e.name.endsWith(".md")) files.push(p);
  }
  return files;
}

function main() {
  const contentRoot = path.join(root, "src", "content");
  const pagesDir = path.join(contentRoot, "pages");
  const faqDir = path.join(contentRoot, "faq");

  const records = [];

  for (const file of walkMd(pagesDir)) {
    const raw = fs.readFileSync(file, "utf8");
    const parsed = parseSimpleFrontmatter(raw);
    if (!parsed) {
      console.warn(`[search-index] skip (no frontmatter): ${file}`);
      continue;
    }
    const { data, body } = parsed;
    const title = data.title;
    const slug = data.slug;
    if (!title || !slug) {
      console.warn(`[search-index] skip (missing title/slug): ${file}`);
      continue;
    }
    const summary = data.summary ?? "";
    const excerpt =
      summary.slice(0, 240) || body.replace(/\s+/g, " ").trim().slice(0, 240);
    records.push({
      id: `page:${slug}`,
      type: "page",
      title,
      excerpt,
      slug,
      category: data.primary_category,
      tags: [],
    });
  }

  for (const file of walkMd(faqDir)) {
    const raw = fs.readFileSync(file, "utf8");
    const parsed = parseSimpleFrontmatter(raw);
    if (!parsed) {
      console.warn(`[search-index] skip FAQ (no frontmatter): ${file}`);
      continue;
    }
    const { data, body } = parsed;
    const title = data.title;
    const slug = data.slug;
    if (!title || !slug) {
      console.warn(`[search-index] skip FAQ (missing title/slug): ${file}`);
      continue;
    }
    const excerpt = body.replace(/\s+/g, " ").trim().slice(0, 240);
    records.push({
      id: `faq:${slug}`,
      type: "faq",
      title,
      excerpt,
      slug,
      category: data.primary_category ?? "faq",
      tags: [],
    });
  }

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(records, null, 0), "utf8");
  console.log(
    `[search-index] wrote ${records.length} records → public/search-index.json`,
  );
}

main();
