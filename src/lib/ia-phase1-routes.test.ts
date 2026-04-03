import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  PHASE1_IA_AIRPORT_REDIRECT,
  PHASE1_IA_PAGE_PATHS,
} from "./ia-phase1-routes";
import {
  DAILY_LIFE_SLUGS,
  DOCUMENT_SLUGS,
  HOUSING_SLUGS,
  NEWCOMER_SLUGS,
  PAYMENTS_SLUGS,
  ROUTE_TITLES,
  TRANSPORT_SLUGS,
  WORK_SLUGS,
} from "./routes";

const LOCALE_APP = join(process.cwd(), "src/app/[locale]");

const SLUG_HUBS: Record<string, readonly string[]> = {
  newcomer: NEWCOMER_SLUGS,
  documents: DOCUMENT_SLUGS,
  work: WORK_SLUGS,
  housing: HOUSING_SLUGS,
  payments: PAYMENTS_SLUGS,
  transport: TRANSPORT_SLUGS,
  "daily-life": DAILY_LIFE_SLUGS,
};

function assertPhase1PagePath(pathname: string): void {
  if (pathname === "/") {
    expect(existsSync(join(LOCALE_APP, "page.tsx"))).toBe(true);
    return;
  }
  if (pathname === "/housing/request/success") {
    expect(
      existsSync(join(LOCALE_APP, "housing/request/success/page.tsx")),
    ).toBe(true);
    return;
  }

  const segments = pathname.slice(1).split("/");
  if (segments.length === 1) {
    expect(existsSync(join(LOCALE_APP, segments[0], "page.tsx"))).toBe(true);
    return;
  }

  if (segments.length === 2) {
    const [hub, slug] = segments;
    const allowed = SLUG_HUBS[hub];
    expect(allowed, `unknown or unmapped hub segment: ${hub}`).toBeDefined();
    expect(
      (allowed as readonly string[]).includes(slug),
      `slug "${slug}" not allowed for /${hub}/[slug]`,
    ).toBe(true);
    expect(existsSync(join(LOCALE_APP, hub, "[slug]", "page.tsx"))).toBe(
      true,
    );
    return;
  }

  throw new Error(`Unmapped Phase 1 IA path (update guard): ${pathname}`);
}

describe("Phase 1 IA route contract (IA_SPEC §6.1–6.9)", () => {
  it("lists only the intended MVP sitemap page paths (no /places, no Phase 4-only routes)", () => {
    expect(PHASE1_IA_PAGE_PATHS).not.toContain("/places");
    expect(PHASE1_IA_PAGE_PATHS.join(" ")).not.toMatch(/\/places\//);
    expect(PHASE1_IA_PAGE_PATHS).toHaveLength(32);
  });

  it("covers every page path with a static or dynamic App Router shell under [locale]", () => {
    for (const p of PHASE1_IA_PAGE_PATHS) {
      assertPhase1PagePath(p);
    }
  });

  it("has ROUTE_TITLES entries for each Phase 1 page path (placeholder shells)", () => {
    for (const p of PHASE1_IA_PAGE_PATHS) {
      expect(
        ROUTE_TITLES[p],
        `missing ROUTE_TITLES for ${p}`,
      ).toBeDefined();
    }
  });

  it("documents /transport/airport as redirect-only, not a page file requirement", () => {
    expect(PHASE1_IA_PAGE_PATHS).not.toContain(
      PHASE1_IA_AIRPORT_REDIRECT.fromPath,
    );
    expect(
      existsSync(
        join(LOCALE_APP, "transport", "airport", "page.tsx"),
      ),
    ).toBe(false);
  });

  it("middleware implements the locked airport redirect contract", () => {
    const middlewarePath = join(process.cwd(), "src/middleware.ts");
    const src = readFileSync(middlewarePath, "utf8");
    expect(src).toContain("PHASE1_IA_AIRPORT_REDIRECT");
    expect(src).toContain("./lib/ia-phase1-routes");
  });
});
