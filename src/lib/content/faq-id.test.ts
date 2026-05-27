import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  assertUniqueFaqIds,
  collectFaqIdEntries,
  faqPublicUrl,
  normalizeFaqId,
  resolveFaqId,
  validateFaqContentDir,
} from "./faq-id";

describe("normalizeFaqId", () => {
  it("lowercases and hyphenates", () => {
    expect(normalizeFaqId("Pay_Without Bank")).toBe("pay-without-bank");
  });

  it("strips invalid characters", () => {
    expect(normalizeFaqId("sim--card!!")).toBe("sim-card");
  });
});

describe("faqPublicUrl", () => {
  it("returns anchor URL on /faq", () => {
    expect(faqPublicUrl("sim-card-arrival")).toBe("/faq#sim-card-arrival");
  });
});

describe("resolveFaqId", () => {
  it("prefers frontmatter faq_id", () => {
    expect(
      resolveFaqId({ faq_id: "pay-without-bank" }, "other.md"),
    ).toBe("pay-without-bank");
  });

  it("falls back to filename basename", () => {
    expect(resolveFaqId({}, "airport-help.md")).toBe("airport-help");
  });

  it("throws when faq_id normalizes to empty", () => {
    expect(() => resolveFaqId({ faq_id: "!!!" }, "x.md")).toThrow(
      /Invalid faq_id/,
    );
  });
});

describe("assertUniqueFaqIds", () => {
  it("throws with both file paths on duplicate", () => {
    expect(() =>
      assertUniqueFaqIds([
        { faqId: "dup", filePath: "/a/first.md" },
        { faqId: "dup", filePath: "/a/second.md" },
      ]),
    ).toThrow(/Duplicate faq_id "dup".*first\.md.*second\.md/s);
  });
});

describe("validateFaqContentDir", () => {
  it("passes on repo FAQ content", () => {
    const contentRoot = path.join(process.cwd(), "src", "content");
    expect(() => validateFaqContentDir(contentRoot)).not.toThrow();
  });

  it("throws when temp dir has duplicate faq_id", () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "fg-faq-dup-"));
    const faqDir = path.join(tmp, "faq");
    fs.mkdirSync(faqDir, { recursive: true });
    const body = `---
title: Q
faq_id: same-id
primary_category: faq
page_type: faq
---
A`;
    fs.writeFileSync(path.join(faqDir, "a.md"), body);
    fs.writeFileSync(path.join(faqDir, "b.md"), body);
    expect(() => validateFaqContentDir(tmp)).toThrow(/Duplicate faq_id/);
    fs.rmSync(tmp, { recursive: true, force: true });
  });
});

describe("collectFaqIdEntries", () => {
  it("collects ids from markdown files", () => {
    const contentRoot = path.join(process.cwd(), "src", "content");
    const entries = collectFaqIdEntries(contentRoot);
    expect(entries.length).toBeGreaterThanOrEqual(1);
    const ids = entries.map((e) => e.faqId);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
