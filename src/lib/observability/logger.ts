/** One JSON object per line; never log PII or request secrets. */

export type LogLevel = "debug" | "info" | "warn" | "error";

const SERVICE = "flow-guide";

export type LogRecord = {
  level: LogLevel;
  message: string;
  timestamp: string;
  service: string;
  env: string;
};

function buildRecord(level: LogLevel, message: string): LogRecord {
  return {
    level,
    message,
    timestamp: new Date().toISOString(),
    service: SERVICE,
    env: process.env.NODE_ENV ?? "development",
  };
}

function emit(record: LogRecord): void {
  console.log(JSON.stringify(record));
}

/** Test-only: build record without emitting. */
export function formatLogRecord(level: LogLevel, message: string): LogRecord {
  return buildRecord(level, message);
}

export function logDebug(message: string): void {
  if (process.env.NODE_ENV === "production") {
    return;
  }
  emit(buildRecord("debug", message));
}

export function logInfo(message: string): void {
  emit(buildRecord("info", message));
}

export function logWarn(message: string): void {
  emit(buildRecord("warn", message));
}

export function logError(message: string): void {
  emit(buildRecord("error", message));
}
