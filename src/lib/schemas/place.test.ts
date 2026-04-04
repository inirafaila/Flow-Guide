import { describe, expect, it } from "vitest";
import {
  placeFrontmatterSchema,
  parsePlaceFrontmatter,
} from "@/lib/schemas/place";
import { parseMarkdownPlace } from "@/lib/content/parse-md";

describe("placeFrontmatterSchema", () => {
  it("accepts minimal valid frontmatter", () => {
    const data = {
      id: "pl-1",
      slug: "example-office",
      name: "Example",
      place_type: "office" as const,
    };
    expect(parsePlaceFrontmatter(data)).toMatchObject(data);
  });

  it("accepts optional §12 fields", () => {
    const data = {
      id: "pl-2",
      slug: "x",
      name: "Y",
      place_type: "terminal" as const,
      address: "1 St",
      latitude: 40.18,
      longitude: 44.51,
      opening_hours: "09:00–18:00",
      payment_methods: ["cash", "card"] as const,
      appointment_required: true,
      confidence_level: "medium" as const,
      related_service_tags: ["sim"],
      notes: "Fixture",
      is_active: false,
    };
    expect(parsePlaceFrontmatter(data)).toMatchObject(data);
  });

  it("rejects invalid place_type", () => {
    expect(() =>
      placeFrontmatterSchema.parse({
        id: "1",
        slug: "s",
        name: "N",
        place_type: "not-a-place-type",
      }),
    ).toThrow();
  });

  it("rejects invalid payment_methods entry", () => {
    expect(() =>
      placeFrontmatterSchema.parse({
        id: "1",
        slug: "s",
        name: "N",
        place_type: "pharmacy",
        payment_methods: ["crypto"],
      }),
    ).toThrow();
  });

  it("parses Markdown wrapper via parseMarkdownPlace", () => {
    const src = `---
id: md-place
slug: md-slug
name: From MD
place_type: translator
---
Body here.
`;
    const parsed = parseMarkdownPlace(src);
    expect(parsed.frontmatter.id).toBe("md-place");
    expect(parsed.body).toContain("Body here.");
  });
});
