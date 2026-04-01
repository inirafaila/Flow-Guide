#!/usr/bin/env node
/**
 * Build entry: emits public/search-index.json from validated Markdown under src/content.
 * Delegates to TypeScript so Zod + gray-matter stay single-sourced with the app.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const tsxCli = path.join(root, "node_modules", "tsx", "dist", "cli.mjs");
const impl = path.join(__dirname, "build-search-index.impl.ts");

if (!fs.existsSync(tsxCli)) {
  console.error(
    "[search-index] missing tsx. Run npm install (tsx is required for build-time validation).",
  );
  process.exit(1);
}

const result = spawnSync(process.execPath, [tsxCli, impl], {
  cwd: root,
  stdio: "inherit",
});

process.exit(result.status ?? 1);
