import { describe, expect, it } from "vitest";

import { assertMapsUrlAllowed } from "./assert-maps-url";

describe("assertMapsUrlAllowed", () => {
  it("accepts direct Google Maps search URLs", () => {
    expect(() =>
      assertMapsUrlAllowed(
        "https://www.google.com/maps/search/?api=1&query=Yerevan+payment+terminals",
      ),
    ).not.toThrow();
    expect(() =>
      assertMapsUrlAllowed("https://maps.google.com/?q=Yerevan"),
    ).not.toThrow();
  });

  it("accepts Apple Maps and OpenStreetMap URLs", () => {
    expect(() =>
      assertMapsUrlAllowed("https://maps.apple.com/?q=Yerevan"),
    ).not.toThrow();
    expect(() =>
      assertMapsUrlAllowed("https://www.openstreetmap.org/search?query=Yerevan"),
    ).not.toThrow();
  });

  it("accepts official public location hosts on gov.am", () => {
    expect(() =>
      assertMapsUrlAllowed("https://www.moj.am/en/page/example"),
    ).not.toThrow();
  });

  it("rejects http URLs", () => {
    expect(() =>
      assertMapsUrlAllowed("http://www.google.com/maps/search/?query=test"),
    ).toThrow(/must use https/);
  });

  it("rejects URL shorteners", () => {
    expect(() => assertMapsUrlAllowed("https://bit.ly/abc")).toThrow();
    expect(() => assertMapsUrlAllowed("https://t.co/xyz")).toThrow();
    expect(() => assertMapsUrlAllowed("https://goo.gl/maps/abc")).toThrow();
    expect(() =>
      assertMapsUrlAllowed("https://maps.app.goo.gl/abc"),
    ).toThrow();
  });

  it("rejects redirect/tracking hosts", () => {
    expect(() =>
      assertMapsUrlAllowed("https://l.facebook.com/l.php?u=https://example.com"),
    ).toThrow();
  });

  it("rejects tracking query parameters on otherwise valid hosts", () => {
    expect(() =>
      assertMapsUrlAllowed(
        "https://www.google.com/maps/search/?api=1&query=test&utm_source=newsletter",
      ),
    ).toThrow(/tracking/);
    expect(() =>
      assertMapsUrlAllowed(
        "https://maps.apple.com/?q=test&fbclid=abc",
      ),
    ).toThrow(/tracking/);
    expect(() =>
      assertMapsUrlAllowed(
        "https://www.openstreetmap.org/search?query=test&gclid=abc",
      ),
    ).toThrow(/tracking/);
  });

  it("rejects disallowed generic hosts", () => {
    expect(() => assertMapsUrlAllowed("https://example.com/maps")).toThrow(
      /host must be/,
    );
  });
});
