/**
 * Map a public route path to a `src/content/pages/{slug}.md` basename.
 * Returns null when there is no Markdown page (e.g. `/start` onboarding UI).
 */
export function contentSlugFromRoutePath(routePath: string): string | null {
  if (routePath === "/start") return null;
  const segments = routePath.split("/").filter(Boolean);
  if (segments.length === 0) return null;
  return segments[segments.length - 1] ?? null;
}
