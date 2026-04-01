/**
 * Phase 1 stub — real init via @sentry/nextjs after wizard + DSN review.
 * Do not log PII; use Sentry scrubbing rules in production.
 */
export function describeSentryStatus(): string {
  return process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN
    ? "Sentry DSN present — run official Next.js SDK init before relying on errors."
    : "Sentry not configured (expected for local Phase 1).";
}
