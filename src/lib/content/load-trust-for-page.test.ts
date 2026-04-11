import path from "node:path";
import { describe, expect, it } from "vitest";
import { loadTrustDataForPage } from "@/lib/content/load-trust-for-page";

const contentRoot = path.join(process.cwd(), "src", "content");

describe("loadTrustDataForPage", () => {
  it("returns sources matching page_id for address-registration", () => {
    const trust = loadTrustDataForPage(contentRoot, "address-registration");
    expect(trust.sources.length).toBe(2);
    expect(trust.sources.map((s) => s.id).sort()).toEqual([
      "src-address-reg-field",
      "src-address-reg-gov",
    ]);
  });

  it("returns empty sources for unknown page slug", () => {
    const trust = loadTrustDataForPage(
      contentRoot,
      "definitely-unknown-trust-slug-999",
    );
    expect(trust.sources).toEqual([]);
  });

  it("loads lastVerifiedAt from page content file", () => {
    const trust = loadTrustDataForPage(contentRoot, "address-registration");
    expect(trust.lastVerifiedAt).toBe("2026-03-15");
  });

  it("loads whatMayVary from page content file", () => {
    const trust = loadTrustDataForPage(contentRoot, "address-registration");
    expect(trust.whatMayVary).toBe(
      "Process and required documents may differ by nationality, type of residency, and specific office branch.",
    );
  });

  it("returns undefined metadata when page file does not exist", () => {
    const trust = loadTrustDataForPage(
      contentRoot,
      "definitely-unknown-trust-slug-999",
    );
    expect(trust.lastVerifiedAt).toBeUndefined();
    expect(trust.whatMayVary).toBeUndefined();
  });
});
