import { describe, expect, it } from "vitest";
import { step6SecondaryVisibleLabel } from "./onboarding-step6-labels";

describe("step6SecondaryVisibleLabel", () => {
  it("uses dedicated translation key for known checklist slugs", () => {
    const t = (key: string) =>
      key === "step6.checklistSlug.social-card" ? "Social card" : key;
    expect(step6SecondaryVisibleLabel("social-card", "/x", t)).toBe(
      "Social card",
    );
  });

  it("uses fallback key with page path for unknown slugs", () => {
    const t = (key: string, values?: Record<string, string>) => {
      if (key === "step6.checklistSlug.fallback" && values?.path === "/foo") {
        return `Open ${values.path}`;
      }
      return key;
    };
    expect(step6SecondaryVisibleLabel("future-slug", "/foo", t)).toBe(
      "Open /foo",
    );
  });
});
