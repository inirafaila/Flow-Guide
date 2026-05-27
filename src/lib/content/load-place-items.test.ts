import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import {
  MAX_ACTIVE_PLACES,
  loadPlaceItems,
  loadPlacesForGuide,
} from "./load-place-items";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoContentRoot = path.join(here, "..", "..", "content");

const VALID_PLACE = `---
id: pl-test
slug: test-place
name: Test Place
place_type: terminal
parent_guide_href: /payments/terminals
notes: Short practical note for testing.
is_active: true
---
`;

describe("loadPlaceItems", () => {
  it("loads active curated places from repo content", () => {
    const items = loadPlaceItems(repoContentRoot);
    expect(items.length).toBeGreaterThanOrEqual(3);
    expect(items.length).toBeLessThanOrEqual(MAX_ACTIVE_PLACES);
    for (const item of items) {
      expect(item.frontmatter.parent_guide_href).toMatch(/^\//);
      expect(item.frontmatter.notes?.trim().length).toBeGreaterThan(0);
    }
  });

  it("excludes inactive places", () => {
    const items = loadPlaceItems(repoContentRoot);
    expect(
      items.some((p) => p.frontmatter.slug === "sample-placeholder-place"),
    ).toBe(false);
  });

  it("sorts by parent_guide_href, place_type, name", () => {
    const items = loadPlaceItems(repoContentRoot);
    const sorted = [...items].sort((a, b) => {
      const hrefA = a.frontmatter.parent_guide_href!.trim();
      const hrefB = b.frontmatter.parent_guide_href!.trim();
      const byHref = hrefA.localeCompare(hrefB, "en");
      if (byHref !== 0) return byHref;
      const byType = a.frontmatter.place_type.localeCompare(
        b.frontmatter.place_type,
        "en",
      );
      if (byType !== 0) return byType;
      return a.frontmatter.name.localeCompare(b.frontmatter.name, "en");
    });
    expect(items.map((i) => i.slug)).toEqual(sorted.map((i) => i.slug));
  });

  it("throws when active place lacks parent_guide_href", () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "fg-place-"));
    const placesDir = path.join(tmp, "places");
    fs.mkdirSync(placesDir, { recursive: true });
    fs.writeFileSync(
      path.join(placesDir, "bad.md"),
      VALID_PLACE.replace("parent_guide_href: /payments/terminals\n", ""),
    );
    try {
      expect(() => loadPlaceItems(tmp)).toThrow(/parent_guide_href/);
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  });

  it("throws when active count exceeds MAX_ACTIVE_PLACES", () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "fg-place-max-"));
    const placesDir = path.join(tmp, "places");
    fs.mkdirSync(placesDir, { recursive: true });
    for (let i = 0; i < MAX_ACTIVE_PLACES + 1; i++) {
      fs.writeFileSync(
        path.join(placesDir, `p${i}.md`),
        VALID_PLACE.replace("slug: test-place", `slug: place-${i}`).replace(
          "id: pl-test",
          `id: pl-${i}`,
        ),
      );
    }
    try {
      expect(() => loadPlaceItems(tmp)).toThrow(/Too many active places/);
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  });

  it("rejects invalid maps_url on active place", () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "fg-place-maps-"));
    const placesDir = path.join(tmp, "places");
    fs.mkdirSync(placesDir, { recursive: true });
    fs.writeFileSync(
      path.join(placesDir, "bad-maps.md"),
      `${VALID_PLACE.replace("---\n", "---\nmaps_url: https://bit.ly/abc\n")}`,
    );
    try {
      expect(() => loadPlaceItems(tmp)).toThrow(/maps_url/);
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  });
});

describe("loadPlacesForGuide", () => {
  it("returns at most 3 places for a guide href", () => {
    const items = loadPlacesForGuide(
      repoContentRoot,
      "/payments/terminals",
    );
    expect(items.length).toBeLessThanOrEqual(3);
    for (const item of items) {
      expect(item.frontmatter.parent_guide_href).toBe("/payments/terminals");
    }
  });

  it("returns empty array for guide with no places", () => {
    expect(loadPlacesForGuide(repoContentRoot, "/work/quick-income")).toEqual(
      [],
    );
  });
});
