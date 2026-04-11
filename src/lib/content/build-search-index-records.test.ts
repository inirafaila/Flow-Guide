import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { searchIndexFileSchema } from "@/lib/schemas/search-index";

import { buildSearchIndexRecords } from "./build-search-index-records";
import { parseMarkdownPage } from "./parse-md";

const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(here, "..", "..", "..");

describe("buildSearchIndexRecords", () => {
  it("builds records from repo sample content and passes output schema", () => {
    const records = buildSearchIndexRecords(projectRoot);
    expect(records.length).toBeGreaterThanOrEqual(2);
    const parsed = searchIndexFileSchema.safeParse(records);
    expect(parsed.success).toBe(true);
    const page = records.find(
      (r) => r.type === "page" && r.slug === "/start",
    );
    expect(page?.slug).toBe("/start");
    const faq = records.find((r) => r.type === "faq");
    expect(faq?.slug).toBe("/faq/sample-question");
  });

  it("rejects invalid frontmatter with file context", () => {
    expect(() =>
      parseMarkdownPage(`---
title: "x"
slug: "/bad"
page_type: not-a-real-type
---
body`),
    ).toThrow();
  });

  it("omits pages and faq when searchable or is_active opts out", () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "fg-sidx-"));
    const content = path.join(tmp, "src", "content");
    fs.mkdirSync(path.join(content, "pages"), { recursive: true });
    fs.mkdirSync(path.join(content, "faq"), { recursive: true });
    fs.writeFileSync(
      path.join(content, "pages", "visible.md"),
      `---
title: V
slug: /visible
---
x`,
    );
    fs.writeFileSync(
      path.join(content, "pages", "no-search.md"),
      `---
title: H
slug: /hidden
searchable: false
---
x`,
    );
    fs.writeFileSync(
      path.join(content, "pages", "inactive.md"),
      `---
title: I
slug: /inactive
is_active: false
---
x`,
    );
    fs.writeFileSync(
      path.join(content, "faq", "f.md"),
      `---
title: F
slug: /faq/f
primary_category: faq
page_type: faq
---
a`,
    );
    fs.writeFileSync(
      path.join(content, "faq", "hidden-faq.md"),
      `---
title: HF
slug: /faq/hidden
primary_category: faq
page_type: faq
searchable: false
---
a`,
    );
    try {
      const records = buildSearchIndexRecords(tmp);
      expect(records.map((r) => r.slug).sort()).toEqual(["/faq/f", "/visible"]);
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  });
});
