export const ALLOWED_ANALYTICS_EVENTS = [
  "home_entry_point_clicked",
  "onboarding_started",
  "onboarding_completed",
  "next_action_clicked",
  "search_used",
  "stay_calculator_used",
] as const;

export type AnalyticsEventName = (typeof ALLOWED_ANALYTICS_EVENTS)[number];

export type HomeEntryTarget = "newcomer" | "work" | "housing";

import type { SearchResultCountBucket } from "./search-result-count-bucket";

export type { SearchResultCountBucket };

export type AnalyticsEventProps = {
  home_entry_point_clicked: { target: HomeEntryTarget };
  onboarding_started: Record<string, never>;
  onboarding_completed: Record<string, never>;
  next_action_clicked: { role: "primary" | "secondary"; target: string };
  search_used: {
    has_results: boolean;
    result_count_bucket: SearchResultCountBucket;
  };
  stay_calculator_used: { has_valid_entries: boolean };
};

type PlausiblePropValue = string | number | boolean;

const HOME_ENTRY_TARGETS = new Set<HomeEntryTarget>([
  "newcomer",
  "work",
  "housing",
]);

const SEARCH_BUCKETS = new Set<SearchResultCountBucket>(["0", "1-3", "4+"]);

const warnedIssues = new Set<string>();

function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development";
}

function warnOnce(issueKey: string, message: string): void {
  if (!isDevelopment()) return;
  if (warnedIssues.has(issueKey)) return;
  warnedIssues.add(issueKey);
  console.warn(message);
}

function isAllowedEventName(name: string): name is AnalyticsEventName {
  return (ALLOWED_ANALYTICS_EVENTS as readonly string[]).includes(name);
}

function isNonEmptySlug(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length > 0 &&
    !value.includes("/") &&
    !value.includes(" ")
  );
}

function sanitizeProps(
  name: AnalyticsEventName,
  props: Record<string, unknown> | undefined,
): Record<string, PlausiblePropValue> | null {
  if (props === undefined) {
    if (
      name === "onboarding_started" ||
      name === "onboarding_completed"
    ) {
      return {};
    }
    warnOnce(`missing-props:${name}`, `[analytics] ${name} requires props`);
    return null;
  }

  switch (name) {
    case "home_entry_point_clicked": {
      const target = props.target;
      if (!HOME_ENTRY_TARGETS.has(target as HomeEntryTarget)) {
        warnOnce(
          `bad-props:${name}`,
          `[analytics] ${name}: invalid target`,
        );
        return null;
      }
      return { target: target as HomeEntryTarget };
    }
    case "onboarding_started":
    case "onboarding_completed":
      if (Object.keys(props).length > 0) {
        warnOnce(`bad-props:${name}`, `[analytics] ${name}: props not allowed`);
        return null;
      }
      return {};
    case "next_action_clicked": {
      const role = props.role;
      const target = props.target;
      if (role !== "primary" && role !== "secondary") {
        warnOnce(`bad-props:${name}`, `[analytics] ${name}: invalid role`);
        return null;
      }
      if (!isNonEmptySlug(target)) {
        warnOnce(`bad-props:${name}`, `[analytics] ${name}: invalid target`);
        return null;
      }
      return { role, target };
    }
    case "search_used": {
      const hasResults = props.has_results;
      const bucket = props.result_count_bucket;
      if (typeof hasResults !== "boolean") {
        warnOnce(`bad-props:${name}`, `[analytics] ${name}: invalid has_results`);
        return null;
      }
      if (!SEARCH_BUCKETS.has(bucket as SearchResultCountBucket)) {
        warnOnce(
          `bad-props:${name}`,
          `[analytics] ${name}: invalid result_count_bucket`,
        );
        return null;
      }
      return {
        has_results: hasResults,
        result_count_bucket: bucket as SearchResultCountBucket,
      };
    }
    case "stay_calculator_used": {
      const hasValidEntries = props.has_valid_entries;
      if (typeof hasValidEntries !== "boolean") {
        warnOnce(
          `bad-props:${name}`,
          `[analytics] ${name}: invalid has_valid_entries`,
        );
        return null;
      }
      return { has_valid_entries: hasValidEntries };
    }
    default: {
      const _exhaustive: never = name;
      return _exhaustive;
    }
  }
}

/** Dev-only: reset warn-once guard (tests). */
export function resetAnalyticsWarningsForTests(): void {
  warnedIssues.clear();
}

export function trackEvent<Name extends AnalyticsEventName>(
  name: Name,
  ...args: AnalyticsEventProps[Name] extends Record<string, never>
    ? [] | [undefined]
    : [AnalyticsEventProps[Name]]
): void {
  if (typeof window === "undefined") return;

  if (!isAllowedEventName(name)) {
    warnOnce(`unknown-event:${name}`, `[analytics] unknown event`);
    return;
  }

  const plausible = window.plausible;
  if (typeof plausible !== "function") return;

  const rawProps = args[0] as Record<string, unknown> | undefined;
  const sanitized = sanitizeProps(name, rawProps);
  if (sanitized === null) return;

  if (Object.keys(sanitized).length === 0) {
    plausible(name);
  } else {
    plausible(name, { props: sanitized });
  }
}

/** Maps Home entry card href to allowlisted analytics target. */
export function homeEntryTargetFromHref(href: string): HomeEntryTarget | null {
  switch (href) {
    case "/newcomer":
      return "newcomer";
    case "/work":
      return "work";
    case "/housing":
      return "housing";
    default:
      return null;
  }
}
