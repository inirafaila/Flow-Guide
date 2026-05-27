import path from "node:path";
import { HubPageTemplate } from "@/features/routes/page-type-templates";
import { loadPageContent } from "@/lib/content/load-page-content";
import { generateMetadataForPath } from "@/lib/seo/generate-metadata-for-path";

export function generateMetadata() {
  return generateMetadataForPath("/daily-life");
}

export default async function Page() {
  const contentRoot = path.join(process.cwd(), "src", "content");
  const pageContent = loadPageContent(contentRoot, "daily-life");
  return <HubPageTemplate path="/daily-life" bodyHtml={pageContent?.bodyHtml} />;
}
