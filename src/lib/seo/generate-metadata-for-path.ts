import type { Metadata } from "next";

import { buildPageMetadata } from "./build-page-metadata";

/** Use as `export const generateMetadata = () => generateMetadataForPath("/faq")` */
export function generateMetadataForPath(routePath: string): Metadata {
  return buildPageMetadata(routePath);
}
