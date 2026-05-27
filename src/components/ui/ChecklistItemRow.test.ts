import { createElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";
import type { FilteredChecklistItemV1 } from "@/lib/checklist/checklist-filter";
import en from "../../../messages/en.json";
import { ChecklistItemRow } from "./ChecklistItemRow";

function renderRow(ui: ReactNode): string {
  return renderToStaticMarkup(
    createElement(
      NextIntlClientProvider,
      { locale: "en", messages: en },
      ui,
    ),
  );
}

function baseItem(
  overrides: Partial<FilteredChecklistItemV1["item"]> = {},
): FilteredChecklistItemV1["item"] {
  return {
    id: "checklist-test-1",
    slug: "test-slug",
    title: "Test checklist title",
    ...overrides,
  };
}

function fixture(overrides: {
  item?: Partial<FilteredChecklistItemV1["item"]>;
  prerequisites_met?: boolean;
} = {}): FilteredChecklistItemV1 {
  return {
    item: baseItem(overrides.item ?? {}),
    prerequisites_met: overrides.prerequisites_met ?? true,
  };
}

describe("ChecklistItemRow", () => {
  it("renders title from data.item.title", () => {
    const html = renderRow(
      createElement(ChecklistItemRow, {
        data: fixture({ item: { title: "Unique row title" } }),
      }),
    );
    expect(html).toContain("Unique row title");
  });

  it("renders category badge when category is defined", () => {
    const html = renderRow(
      createElement(ChecklistItemRow, {
        data: fixture({ item: { category: "documents" } }),
      }),
    );
    expect(html).toContain("fg-checklist-row__category");
    expect(html).toContain("Documents");
  });

  it("renders urgency marker with high modifier when urgency_level is high", () => {
    const html = renderRow(
      createElement(ChecklistItemRow, {
        data: fixture({ item: { urgency_level: "high" } }),
      }),
    );
    expect(html).toContain("fg-checklist-row__urgency--high");
  });

  it("defaults status to not-started chip when status prop is omitted", () => {
    const html = renderRow(createElement(ChecklistItemRow, { data: fixture() }));
    expect(html).toContain("fg-checklist-row__status--not-started");
    expect(html).toContain("Not started");
  });

  it("renders done chip with done modifier when status is done", () => {
    const html = renderRow(
      createElement(ChecklistItemRow, {
        data: fixture(),
        status: "done",
      }),
    );
    expect(html).toContain("fg-checklist-row__status--done");
    expect(html).toContain("Done");
  });

  it("applies fg-checklist-row--locked when prerequisites_met is false", () => {
    const html = renderRow(
      createElement(ChecklistItemRow, {
        data: fixture({ prerequisites_met: false }),
      }),
    );
    expect(html).toContain("fg-checklist-row--locked");
    expect(html).toContain("Locked");
  });

  it("does not apply locked class when prerequisites_met is true", () => {
    const html = renderRow(
      createElement(ChecklistItemRow, {
        data: fixture({ prerequisites_met: true }),
      }),
    );
    expect(html).not.toContain("fg-checklist-row--locked");
  });

  it("renders link with href when primary_destination_slug is defined", () => {
    const html = renderRow(
      createElement(ChecklistItemRow, {
        data: fixture({
          item: { primary_destination_slug: "/documents/address-registration" },
        }),
      }),
    );
    expect(html).toContain('href="/documents/address-registration"');
    expect(html).toContain("fg-checklist-row__link");
  });

  it("does not render a link when primary_destination_slug is undefined", () => {
    const html = renderRow(
      createElement(ChecklistItemRow, {
        data: fixture({ item: { primary_destination_slug: undefined } }),
      }),
    );
    expect(html).not.toContain("fg-checklist-row__link");
    expect(html).toContain("fg-checklist-row__static");
  });

  it("renders estimated_effort when defined", () => {
    const html = renderRow(
      createElement(ChecklistItemRow, {
        data: fixture({ item: { estimated_effort: "half-day" } }),
      }),
    );
    expect(html).toContain("fg-checklist-row__effort");
    expect(html).toContain("half-day");
  });
});
