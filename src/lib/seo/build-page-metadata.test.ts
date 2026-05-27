import { afterEach, describe, expect, it } from "vitest";

import { buildPageMetadata } from "./build-page-metadata";

describe("buildPageMetadata", () => {
  const original = process.env.NEXT_PUBLIC_SITE_URL;

  afterEach(() => {
    if (original === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = original;
    }
  });

  it("returns raw title without Flow-Guide suffix", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
    const meta = buildPageMetadata("/documents/address-registration");
    expect(meta.title).toBe("Address registration");
    expect(String(meta.title)).not.toContain("Flow-Guide");
  });

  it("sets canonical without double slashes and no alternates.languages", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com/";
    const meta = buildPageMetadata("/faq");
    expect(meta.alternates?.canonical).toBe("https://example.com/faq");
    expect(meta.alternates?.languages).toBeUndefined();
  });

  it("applies minimal noindex robots for /search", () => {
    const meta = buildPageMetadata("/search");
    expect(meta.robots).toEqual({ index: false, follow: true });
    expect(meta.robots).not.toHaveProperty("noarchive");
  });

  it("mirrors openGraph and twitter from title, description, and canonical url", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
    const meta = buildPageMetadata("/updates");
    const canonical = meta.alternates?.canonical;
    expect(meta.openGraph?.title).toBe(meta.title);
    expect(meta.openGraph?.description).toBe(meta.description);
    expect(meta.openGraph?.url).toBe(canonical);
    expect(meta.twitter?.title).toBe(meta.title);
    expect(meta.twitter?.description).toBe(meta.description);
    expect(meta.openGraph?.images).toBeUndefined();
  });

  it("uses shell summary for stay-calculator when no Markdown page file", () => {
    const meta = buildPageMetadata("/documents/stay-calculator");
    expect(meta.description).toContain("90-in-180");
  });

  it("noindexes /city with minimal shell metadata", () => {
    const meta = buildPageMetadata("/city");
    expect(meta.robots).toEqual({ index: false, follow: true });
    expect(meta.title).toBe("City & tourism");
  });
});
