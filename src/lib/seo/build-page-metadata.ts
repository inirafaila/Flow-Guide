import path from "node:path";
import type { Metadata } from "next";

import enMessages from "../../../messages/en.json";
import { loadPageContent } from "@/lib/content/load-page-content";
import { contentSlugFromRoutePath } from "@/lib/content/route-path-to-slug";
import { ROUTE_TITLES } from "@/lib/routes";

import { isNoindexPath } from "./noindex-paths";
import { canonicalUrlForPath } from "./site-url";

/** English-only default; matches `messages/en.json` home.hero.subheadline. */
export const DEFAULT_SITE_DESCRIPTION =
  enMessages.home.hero.subheadline;

/** Same keys as RoutePageBanner — English shell summaries only. */
const SHELL_SUMMARY_KEY_BY_PATH: Record<string, string> = {
  "/faq": "faq",
  "/search": "search",
  "/updates": "updates",
  "/documents/stay-calculator": "stayCalculator",
  "/city": "city",
};

type RouteBannerSummaries = typeof enMessages.routeBanner.summaries;

function shellSummary(routePath: string): string | undefined {
  const key = SHELL_SUMMARY_KEY_BY_PATH[routePath];
  if (!key) {
    return undefined;
  }
  const summaries = enMessages.routeBanner.summaries as RouteBannerSummaries;
  const value = summaries[key as keyof RouteBannerSummaries];
  return typeof value === "string" ? value.trim() : undefined;
}

function loadActivePageContent(routePath: string, contentRoot: string) {
  const slug = contentSlugFromRoutePath(routePath);
  if (!slug) {
    return null;
  }
  const page = loadPageContent(contentRoot, slug);
  if (!page || page.frontmatter.is_active === false) {
    return null;
  }
  return page;
}

function resolveTitle(routePath: string, contentRoot: string): string {
  const page = loadActivePageContent(routePath, contentRoot);
  if (page?.frontmatter.title?.trim()) {
    return page.frontmatter.title.trim();
  }
  return ROUTE_TITLES[routePath] ?? routePath;
}

function resolveDescription(routePath: string, contentRoot: string): string {
  if (routePath === "/") {
    return DEFAULT_SITE_DESCRIPTION;
  }

  const page = loadActivePageContent(routePath, contentRoot);
  const summary = page?.frontmatter.summary?.trim();
  if (summary) {
    return summary;
  }

  const shell = shellSummary(routePath);
  if (shell) {
    return shell;
  }

  return DEFAULT_SITE_DESCRIPTION;
}

function mirrorSocialFields(
  title: string,
  description: string,
  url: string,
): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      title,
      description,
      url,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

/**
 * English-only metadata for a public IA path.
 * Title is raw (root layout applies "%s · Flow-Guide" template).
 */
export function buildPageMetadata(routePath: string): Metadata {
  const contentRoot = path.join(process.cwd(), "src", "content");
  const title = resolveTitle(routePath, contentRoot);
  const description = resolveDescription(routePath, contentRoot);
  const canonical = canonicalUrlForPath(routePath);

  const metadata: Metadata = {
    title,
    description,
    alternates: {
      canonical,
    },
    ...mirrorSocialFields(title, description, canonical),
  };

  if (isNoindexPath(routePath)) {
    metadata.robots = { index: false, follow: true };
  }

  return metadata;
}
