import { describe, expect, it } from "vitest";
import { ROUTE_TITLES } from "@/lib/routes";
import {
  DASHBOARD_QUICK_ACTION_HREFS,
  DASHBOARD_QUICK_ACTION_MESSAGE_KEYS,
  DASHBOARD_QUICK_ACTIONS_CONFIG,
} from "./dashboard-quick-actions-config";

const DASHBOARD_QUICK_ACTION_ALLOWLIST = new Set<string>([
  ...Object.keys(ROUTE_TITLES),
  "/faq",
  "/updates",
]);

describe("dashboard-quick-actions-config", () => {
  it("defines exactly five quick actions", () => {
    expect(DASHBOARD_QUICK_ACTION_HREFS).toHaveLength(5);
    expect(DASHBOARD_QUICK_ACTION_MESSAGE_KEYS).toHaveLength(5);
    expect(DASHBOARD_QUICK_ACTIONS_CONFIG).toHaveLength(5);
  });

  it("points only to known public routes", () => {
    for (const href of DASHBOARD_QUICK_ACTION_HREFS) {
      expect(DASHBOARD_QUICK_ACTION_ALLOWLIST.has(href)).toBe(true);
    }
  });
});
