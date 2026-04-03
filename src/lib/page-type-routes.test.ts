import { describe, expect, it } from "vitest";
import {
  templateForDocumentsSlug,
  templateForHousingSlug,
} from "./page-type-routes";

describe("page-type-routes", () => {
  it("maps stay-calculator to calculator template", () => {
    expect(templateForDocumentsSlug("stay-calculator")).toBe("calculator");
  });

  it("maps other document slugs to guide template", () => {
    expect(templateForDocumentsSlug("address-registration")).toBe("guide");
    expect(templateForDocumentsSlug("social-card")).toBe("guide");
  });

  it("maps housing request slug to service-form template", () => {
    expect(templateForHousingSlug("request")).toBe("serviceForm");
  });

  it("maps other housing slugs to guide template", () => {
    expect(templateForHousingSlug("owner-vs-agency")).toBe("guide");
    expect(templateForHousingSlug("rental-checklist")).toBe("guide");
  });
});
