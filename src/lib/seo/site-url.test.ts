import { afterEach, describe, expect, it } from "vitest";

import {
  canonicalUrlForPath,
  getMetadataBase,
  getSiteUrl,
} from "./site-url";

describe("site-url", () => {
  const original = process.env.NEXT_PUBLIC_SITE_URL;

  afterEach(() => {
    if (original === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = original;
    }
  });

  it("trims trailing slash from NEXT_PUBLIC_SITE_URL", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com/";
    expect(getSiteUrl()).toBe("https://example.com");
  });

  it("canonicalUrlForPath preserves root without extra slash", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
    expect(canonicalUrlForPath("/")).toBe("https://example.com");
  });

  it("canonicalUrlForPath joins path without double slashes", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
    expect(canonicalUrlForPath("/documents/address-registration")).toBe(
      "https://example.com/documents/address-registration",
    );
  });

  it("getMetadataBase uses normalized origin", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com/";
    expect(getMetadataBase().href).toBe("https://example.com/");
  });
});
