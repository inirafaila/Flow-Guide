import { describe, expect, it } from "vitest";

import { contentSlugFromRoutePath } from "./route-path-to-slug";

describe("contentSlugFromRoutePath", () => {
  it("maps hub paths to hub slugs", () => {
    expect(contentSlugFromRoutePath("/newcomer")).toBe("newcomer");
    expect(contentSlugFromRoutePath("/documents")).toBe("documents");
    expect(contentSlugFromRoutePath("/work")).toBe("work");
  });

  it("maps nested guide paths to leaf slug", () => {
    expect(contentSlugFromRoutePath("/documents/address-registration")).toBe(
      "address-registration",
    );
    expect(contentSlugFromRoutePath("/newcomer/day-one")).toBe("day-one");
  });

  it("returns null for /start (onboarding UI, not welcome.md)", () => {
    expect(contentSlugFromRoutePath("/start")).toBeNull();
  });

  it("returns null for empty path", () => {
    expect(contentSlugFromRoutePath("/")).toBeNull();
  });
});
