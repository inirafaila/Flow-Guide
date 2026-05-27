import { describe, expect, it } from "vitest";

import { resolvePageHref } from "./page-slug-to-href";

describe("resolvePageHref", () => {
  it("maps guide slugs to full IA paths", () => {
    expect(resolvePageHref("address-registration")).toBe(
      "/documents/address-registration",
    );
    expect(resolvePageHref("newcomer")).toBe("/newcomer");
  });

  it("throws for unknown slugs", () => {
    expect(() => resolvePageHref("not-a-route")).toThrow(/No IA route/);
  });
});
