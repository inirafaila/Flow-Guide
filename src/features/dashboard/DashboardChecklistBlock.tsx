"use client";

import { useEffect, useState } from "react";
import { ChecklistItemRow } from "@/components/ui/ChecklistItemRow";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  filterChecklistItems,
  type FilteredChecklistItemV1,
  type FilteredChecklistResult,
} from "@/lib/checklist/checklist-filter";
import { readGuestBlob } from "@/lib/guest/storage";
import type { ChecklistItemFrontmatter } from "@/lib/schemas/checklist-item";

export type DashboardChecklistBlockProps = {
  items: ChecklistItemFrontmatter[];
};

/** Category section order (UI_HANDOFF_SPEC §6.3 Block 4). i18n deferred. */
export const CATEGORY_ORDER: string[] = [
  "newcomer",
  "documents",
  "housing",
  "work",
  "payments",
  "transport",
  "daily-life",
];

const CATEGORY_LABELS: Record<string, string> = {
  newcomer: "Arrival & first week",
  documents: "Documents",
  housing: "Housing",
  work: "Work",
  payments: "Payments",
  transport: "Transport",
  "daily-life": "Daily life",
};

function categoryHeading(category: string): string {
  if (CATEGORY_LABELS[category] !== undefined) {
    return CATEGORY_LABELS[category]!;
  }
  return category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * Groups filtered rows by checklist category, orders sections by `categoryOrder`,
 * then unknown categories alphabetically. Items without `category` use `"newcomer"`.
 */
export function groupChecklistByCategory(
  items: FilteredChecklistItemV1[],
  categoryOrder: readonly string[],
): { category: string; items: FilteredChecklistItemV1[] }[] {
  const map = new Map<string, FilteredChecklistItemV1[]>();
  for (const row of items) {
    const cat = row.item.category ?? "newcomer";
    const existing = map.get(cat);
    if (existing) {
      existing.push(row);
    } else {
      map.set(cat, [row]);
    }
  }

  const known = new Set(categoryOrder);
  const out: { category: string; items: FilteredChecklistItemV1[] }[] = [];

  for (const c of categoryOrder) {
    const group = map.get(c);
    if (group !== undefined && group.length > 0) {
      out.push({ category: c, items: group });
    }
  }

  const unknownKeys = [...map.keys()]
    .filter((k) => !known.has(k))
    .sort((a, b) => a.localeCompare(b));

  for (const c of unknownKeys) {
    const group = map.get(c);
    if (group !== undefined && group.length > 0) {
      out.push({ category: c, items: group });
    }
  }

  return out;
}

export function DashboardChecklistBlock({ items }: DashboardChecklistBlockProps) {
  const [phase, setPhase] = useState<"loading" | "ready">("loading");
  const [filtered, setFiltered] = useState<FilteredChecklistResult | null>(null);

  useEffect(() => {
    const blob = readGuestBlob();
    const guestState = blob?.onboarding;
    const result = filterChecklistItems(items, guestState);
    setFiltered(result);
    setPhase("ready");
  }, [items]);

  if (phase === "loading" || filtered === null) {
    return (
      <section className="dashboard-checklist" aria-busy="true">
        <SectionHeader as="h2">Your checklist</SectionHeader>
        <p className="muted dashboard-checklist__loading">Loading…</p>
      </section>
    );
  }

  if (filtered.items.length === 0) {
    return (
      <section className="dashboard-checklist">
        <SectionHeader as="h2">Your checklist</SectionHeader>
        <Card as="article" className="dashboard-checklist__empty-card">
          <p className="muted">No checklist items</p>
        </Card>
      </section>
    );
  }

  const groups = groupChecklistByCategory(filtered.items, CATEGORY_ORDER);

  return (
    <section className="dashboard-checklist">
      <SectionHeader as="h2">Your checklist</SectionHeader>
      {groups.map((group) => (
        <div key={group.category} className="dashboard-checklist__group">
          <h3 className="dashboard-checklist__group-title">
            {categoryHeading(group.category)}
          </h3>
          <ul className="dashboard-checklist__list">
            {group.items.map((row) => (
              <li key={row.item.id}>
                <ChecklistItemRow data={row} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
