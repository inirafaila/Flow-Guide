import type { MetadataRoute } from "next";

import { getSitemapPaths } from "@/lib/seo/sitemap-paths";
import { canonicalUrlForPath } from "@/lib/seo/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapPaths().map((routePath) => ({
    url: canonicalUrlForPath(routePath),
  }));
}
