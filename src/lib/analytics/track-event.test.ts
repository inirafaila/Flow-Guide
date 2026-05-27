import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { AnalyticsEventName } from "./track-event";
import {
  homeEntryTargetFromHref,
  resetAnalyticsWarningsForTests,
  trackEvent,
} from "./track-event";

describe("trackEvent", () => {
  const plausible = vi.fn();

  beforeEach(() => {
    resetAnalyticsWarningsForTests();
    plausible.mockClear();
    vi.stubGlobal("window", { plausible });
    vi.stubEnv("NODE_ENV", "development");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("no-ops without window", () => {
    vi.stubGlobal("window", undefined);
    trackEvent("onboarding_started");
    expect(plausible).not.toHaveBeenCalled();
  });

  it("no-ops when plausible is missing", () => {
    vi.stubGlobal("window", {});
    trackEvent("onboarding_started");
    expect(plausible).not.toHaveBeenCalled();
  });

  it("sends allowed event without props", () => {
    trackEvent("onboarding_started");
    expect(plausible).toHaveBeenCalledWith("onboarding_started");
  });

  it("sends home_entry_point_clicked with allowlisted target", () => {
    trackEvent("home_entry_point_clicked", { target: "work" });
    expect(plausible).toHaveBeenCalledWith("home_entry_point_clicked", {
      props: { target: "work" },
    });
  });

  it("rejects unknown event in development without calling plausible", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    trackEvent("not_a_real_event" as unknown as AnalyticsEventName);
    expect(plausible).not.toHaveBeenCalled();
    expect(warn).toHaveBeenCalled();
    expect(String(warn.mock.calls[0]?.[0])).toContain("unknown event");
  });

  it("filters invalid props without logging prop values", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    trackEvent("home_entry_point_clicked", {
      target: "invalid" as "work",
    });
    expect(plausible).not.toHaveBeenCalled();
    const message = String(warn.mock.calls[0]?.[0] ?? "");
    expect(message).toContain("invalid target");
    expect(message).not.toContain("not_allowed_target_value");
  });

  it("rejects next_action_clicked target that looks like a path", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    trackEvent("next_action_clicked", {
      role: "primary",
      target: "/documents/foo",
    });
    expect(plausible).not.toHaveBeenCalled();
    expect(warn).toHaveBeenCalled();
  });

  it("is silent in production for unknown events", () => {
    vi.stubEnv("NODE_ENV", "production");
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    trackEvent("not_a_real_event" as unknown as AnalyticsEventName);
    expect(plausible).not.toHaveBeenCalled();
    expect(warn).not.toHaveBeenCalled();
  });

  it("warns at most once per distinct issue per session", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    trackEvent("not_a_real_event" as unknown as AnalyticsEventName);
    trackEvent("not_a_real_event" as unknown as AnalyticsEventName);
    expect(warn).toHaveBeenCalledTimes(1);
  });
});

describe("homeEntryTargetFromHref", () => {
  it("maps allowlisted hub hrefs", () => {
    expect(homeEntryTargetFromHref("/newcomer")).toBe("newcomer");
    expect(homeEntryTargetFromHref("/work")).toBe("work");
    expect(homeEntryTargetFromHref("/housing")).toBe("housing");
    expect(homeEntryTargetFromHref("/start")).toBeNull();
  });
});
