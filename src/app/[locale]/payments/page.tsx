import path from "node:path";
import { HubPageTemplate } from "@/features/routes/page-type-templates";
import { loadPageContent } from "@/lib/content/load-page-content";
import { generateMetadataForPath } from "@/lib/seo/generate-metadata-for-path";

export function generateMetadata() {
  return generateMetadataForPath("/payments");
}

export default async function Page() {
  const contentRoot = path.join(process.cwd(), "src", "content");
  const pageContent = loadPageContent(contentRoot, "payments");
  return <HubPageTemplate path="/payments" bodyHtml={pageContent?.bodyHtml} />;
}
