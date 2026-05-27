"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
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

/** Category section order (UI_HANDOFF_SPEC §6.3 Block 4). */
export const CATEGORY_ORDER: string[] = [
  "newcomer",
  "documents",
  "housing",
  "work",
  "payments",
  "transport",
  "daily-life",
];

/** Maps checklist category slug to `dashboard.checklist.category.*` message key. */
const CATEGORY_MESSAGE_KEY: Record<string, string> = {
  newcomer: "newcomer",
  documents: "documents",
  housing: "housing",
  work: "work",
  payments: "payments",
  transport: "transport",
  "daily-life": "dailyLife",
};

function formatUnknownCategory(category: string): string {
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
  const t = useTranslations("dashboard.checklist");
  const tCategory = useTranslations("dashboard.checklist.category");
  const [phase, setPhase] = useState<"loading" | "ready">("loading");
  const [filtered, setFiltered] = useState<FilteredChecklistResult | null>(null);

  useEffect(() => {
    const blob = readGuestBlob();
    const guestState = blob?.onboarding;
    const result = filterChecklistItems(items, guestState);
    setFiltered(result);
    setPhase("ready");
  }, [items]);

  const categoryHeading = (category: string): string => {
    const key = CATEGORY_MESSAGE_KEY[category];
    if (key !== undefined) {
      return tCategory(key);
    }
    return formatUnknownCategory(category);
  };

  if (phase === "loading" || filtered === null) {
    return (
      <section className="dashboard-checklist" aria-busy="true">
        <SectionHeader as="h2">{t("sectionTitle")}</SectionHeader>
        <p className="muted dashboard-checklist__loading">{t("loading")}</p>
      </section>
    );
  }

  if (filtered.items.length === 0) {
    return (
      <section className="dashboard-checklist">
        <SectionHeader as="h2">{t("sectionTitle")}</SectionHeader>
        <Card as="article" className="dashboard-checklist__empty-card">
          <p className="muted">{t("empty")}</p>
        </Card>
      </section>
    );
  }

  const groups = groupChecklistByCategory(filtered.items, CATEGORY_ORDER);

  return (
    <section className="dashboard-checklist">
      <SectionHeader as="h2">{t("sectionTitle")}</SectionHeader>
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
