/**
 * Invoked via `node scripts/build-search-index.mjs` (tsx runner).
 * Shared validation lives in src/lib/content/* and src/lib/schemas/*.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildSearchIndexRecords } from "../src/lib/content/build-search-index-records";
import { searchIndexFileSchema } from "../src/lib/schemas/search-index";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outFile = path.join(root, "public", "search-index.json");

function main(): void {
  const records = buildSearchIndexRecords(root);
  const parsed = searchIndexFileSchema.safeParse(records);
  if (!parsed.success) {
    console.error("[search-index] output validation failed:", parsed.error.flatten());
    process.exit(1);
  }

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(parsed.data, null, 0), "utf8");
  console.log(
    `[search-index] wrote ${parsed.data.length} records → public/search-index.json`,
  );
}

main();
