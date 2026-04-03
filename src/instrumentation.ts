import * as Sentry from "@sentry/nextjs";
import { logInfo } from "./lib/observability/logger";

export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("../sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry.edge.config");
  }

  logInfo("instrumentation_register_complete");
}

export const onRequestError = Sentry.captureRequestError;
