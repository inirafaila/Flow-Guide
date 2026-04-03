import { afterEach, describe, expect, it, vi } from "vitest";
import { formatLogRecord, logInfo, logWarn } from "./logger";

describe("observability logger", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("formatLogRecord includes level, message, timestamp, service, env", () => {
    const r = formatLogRecord("info", "test_message");
    expect(r.level).toBe("info");
    expect(r.message).toBe("test_message");
    expect(r.service).toBe("flow-guide");
    expect(r.env).toBeTruthy();
    expect(r.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  });

  it("logInfo writes one JSON line with fixed shape", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    logInfo("hello");
    expect(spy).toHaveBeenCalledOnce();
    const line = spy.mock.calls[0][0];
    expect(typeof line).toBe("string");
    const parsed = JSON.parse(line as string) as Record<string, unknown>;
    expect(parsed).toMatchObject({
      level: "info",
      message: "hello",
      service: "flow-guide",
    });
    expect(typeof parsed.timestamp).toBe("string");
    expect(typeof parsed.env).toBe("string");
  });

  it("logWarn uses warn level", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    logWarn("caution");
    const parsed = JSON.parse(spy.mock.calls[0][0] as string);
    expect(parsed.level).toBe("warn");
    expect(parsed.message).toBe("caution");
  });
});
