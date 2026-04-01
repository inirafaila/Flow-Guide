/**
 * Next.js instrumentation hook (runs on server startup).
 * TODO: run `npx @sentry/wizard@latest -i nextjs` and init Sentry when DSN is configured (preview + prod).
 */
export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Intentionally empty for Phase 1 — no Sentry SDK init without reviewed DSN / PII policy.
  }
}
