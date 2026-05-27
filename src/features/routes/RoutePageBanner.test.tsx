import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-intl/server", () => ({
  getTranslations: vi.fn(async (namespace: string) => {
    if (namespace === "routeBanner.summaries") {
      return (key: string) => `summary:${key}`;
    }
    return (key: string) => key;
  }),
}));

const { RoutePageBanner } = await import("./RoutePageBanner");

describe("RoutePageBanner", () => {
  it("renders title and content summary without phase1 or path code", async () => {
    const html = renderToStaticMarkup(
      await RoutePageBanner({ path: "/newcomer/day-one" }),
    );
    expect(html).toContain("Day one");
    expect(html).toContain("route-page-banner__summary");
    expect(html).not.toContain("Phase 1");
    expect(html).not.toContain("route shell");
    expect(html).not.toContain("<code>");
    expect(html).not.toContain("/newcomer/day-one");
  });

  it("uses i18n summary when no Markdown page exists", async () => {
    const html = renderToStaticMarkup(
      await RoutePageBanner({ path: "/search" }),
    );
    expect(html).toContain("Search");
    expect(html).toContain("summary:search");
    expect(html).not.toContain("<code>");
  });

  it("honors optional summary prop", async () => {
    const html = renderToStaticMarkup(
      await RoutePageBanner({
        path: "/faq",
        summary: "Custom FAQ intro",
      }),
    );
    expect(html).toContain("Custom FAQ intro");
    expect(html).not.toContain("summary:faq");
  });
});
