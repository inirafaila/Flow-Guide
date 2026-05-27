import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { loadFaqItems } from "./load-faq-items";

const contentRoot = path.join(process.cwd(), "src", "content");

describe("loadFaqItems", () => {
  it("loads active FAQ items with bodyHtml and anchor href", () => {
    const items = loadFaqItems(contentRoot);
    expect(items.length).toBeGreaterThanOrEqual(6);
    const first = items[0];
    expect(first.faqId).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    expect(first.href).toBe(`/faq#${first.faqId}`);
    expect(first.bodyHtml.length).toBeGreaterThan(0);
  });

  it("returns items sorted by title", () => {
    const items = loadFaqItems(contentRoot);
    const titles = items.map((i) => i.frontmatter.title);
    const sorted = [...titles].sort((a, b) => a.localeCompare(b, "en"));
    expect(titles).toEqual(sorted);
  });

  it("omits is_active: false", () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "fg-faq-inactive-"));
    const faqDir = path.join(tmp, "faq");
    fs.mkdirSync(faqDir, { recursive: true });
    fs.writeFileSync(
      path.join(faqDir, "active.md"),
      `---
title: Active Q
faq_id: active-q
primary_category: faq
page_type: faq
is_active: true
---
Yes`,
    );
    fs.writeFileSync(
      path.join(faqDir, "hidden.md"),
      `---
title: Hidden Q
faq_id: hidden-q
primary_category: faq
page_type: faq
is_active: false
---
No`,
    );
    const items = loadFaqItems(tmp);
    expect(items.map((i) => i.faqId)).toEqual(["active-q"]);
    fs.rmSync(tmp, { recursive: true, force: true });
  });

  it("throws on duplicate faq_id", () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "fg-faq-dup-load-"));
    const faqDir = path.join(tmp, "faq");
    fs.mkdirSync(faqDir, { recursive: true });
    const fm = `---
title: Q
faq_id: dup-id
primary_category: faq
page_type: faq
---
A`;
    fs.writeFileSync(path.join(faqDir, "one.md"), fm);
    fs.writeFileSync(path.join(faqDir, "two.md"), fm);
    expect(() => loadFaqItems(tmp)).toThrow(/Duplicate faq_id/);
    fs.rmSync(tmp, { recursive: true, force: true });
  });
});
