import type { ChecklistItemFrontmatter } from "@/lib/schemas/checklist-item";
import type { GuestOnboardingPartial } from "@/lib/schemas/guest-blob";

/** Parsed single checklist relevance rule (`field_name = value`). */
export type ChecklistRuleMatch = {
  field: string;
  operator: "=";
  value: string;
};

/** One checklist row after filtering and sorting, with prerequisite satisfaction flag. */
export type FilteredChecklistItemV1 = {
  item: ChecklistItemFrontmatter;
  prerequisites_met: boolean;
};

/** Result of {@link filterChecklistItems}: filtered rows plus input/output counts. */
export type FilteredChecklistResult = {
  items: FilteredChecklistItemV1[];
  total_before_filter: number;
  total_after_filter: number;
};

/** Guest blob keys allowed in `applies_to_rules` (GuestOnboardingPartial). */
const KNOWN_RULE_FIELDS = new Set<string>([
  "language",
  "nationality",
  "location_status",
  "primary_goal",
  "has_housing",
  "has_sim",
  "has_address_registration",
  "has_social_card",
  "has_bank_account",
]);

const BOOLEAN_GUEST_FIELDS = new Set<string>([
  "has_housing",
  "has_sim",
  "has_address_registration",
  "has_social_card",
  "has_bank_account",
]);

const STRING_GUEST_FIELDS = new Set<string>([
  "language",
  "nationality",
  "location_status",
  "primary_goal",
]);

function urgencyRank(
  level: ChecklistItemFrontmatter["urgency_level"],
): number {
  switch (level) {
    case "critical":
      return 0;
    case "high":
      return 1;
    case "medium":
      return 2;
    case "low":
      return 3;
    default:
      return 4;
  }
}

/**
 * Parses a declarative checklist rule string: `field_name = value`.
 * Unknown field names or malformed input return `null` (fail-soft for callers).
 */
export function parseChecklistRule(raw: string): ChecklistRuleMatch | null {
  const eq = raw.indexOf("=");
  if (eq < 0) {
    return null;
  }
  const field = raw.slice(0, eq).trim();
  const value = raw.slice(eq + 1).trim();
  if (field.length === 0 || value.length === 0) {
    return null;
  }
  if (!KNOWN_RULE_FIELDS.has(field)) {
    return null;
  }
  return { field, operator: "=", value };
}

/**
 * Evaluates one parsed rule against partial guest onboarding state.
 * If `state[field]` is undefined, returns `true` (inclusive — do not hide items).
 */
export function evaluateChecklistRule(
  rule: ChecklistRuleMatch,
  state: GuestOnboardingPartial,
): boolean {
  const key = rule.field as keyof GuestOnboardingPartial;
  const current = state[key];
  if (current === undefined) {
    return true;
  }
  if (BOOLEAN_GUEST_FIELDS.has(rule.field)) {
    return String(current) === rule.value;
  }
  if (STRING_GUEST_FIELDS.has(rule.field)) {
    return current === rule.value;
  }
  return false;
}

function itemPassesRelevance(
  item: ChecklistItemFrontmatter,
  guestState: GuestOnboardingPartial | undefined,
): boolean {
  if (guestState === undefined) {
    return true;
  }
  const rules = item.applies_to_rules;
  if (rules === undefined || rules.length === 0) {
    return true;
  }
  for (const raw of rules) {
    const parsed = parseChecklistRule(raw);
    if (parsed === null) {
      continue;
    }
    if (!evaluateChecklistRule(parsed, guestState)) {
      return false;
    }
  }
  return true;
}

function compareChecklistItems(
  a: ChecklistItemFrontmatter,
  b: ChecklistItemFrontmatter,
): number {
  const ur = urgencyRank(a.urgency_level) - urgencyRank(b.urgency_level);
  if (ur !== 0) {
    return ur;
  }
  const oa = a.default_order ?? Number.POSITIVE_INFINITY;
  const ob = b.default_order ?? Number.POSITIVE_INFINITY;
  if (oa !== ob) {
    return oa - ob;
  }
  return 0;
}

function prerequisitesMetForItem(
  item: ChecklistItemFrontmatter,
  filteredIds: ReadonlySet<string>,
): boolean {
  const prereq = item.prerequisite_ids;
  if (prereq === undefined || prereq.length === 0) {
    return true;
  }
  return prereq.every(
    (pid) => pid !== item.id && filteredIds.has(pid),
  );
}

/**
 * Filters and sorts checklist template rows by active flag, relevance rules,
 * then urgency and default order; annotates each row with `prerequisites_met`.
 * Pure: no I/O, deterministic.
 */
export function filterChecklistItems(
  items: readonly ChecklistItemFrontmatter[],
  guestState: GuestOnboardingPartial | undefined,
): FilteredChecklistResult {
  const total_before_filter = items.length;

  const afterActive = items.filter((i) => i.is_active !== false);

  const afterRelevance = afterActive.filter((item) =>
    itemPassesRelevance(item, guestState),
  );

  const total_after_filter = afterRelevance.length;

  const sorted = [...afterRelevance].sort(compareChecklistItems);

  const filteredIds = new Set(sorted.map((i) => i.id));

  const rows: FilteredChecklistItemV1[] = sorted.map((item) => ({
    item,
    prerequisites_met: prerequisitesMetForItem(item, filteredIds),
  }));

  return {
    items: rows,
    total_before_filter,
    total_after_filter,
  };
}
