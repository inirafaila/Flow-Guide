import path from "node:path";
import { HubPageTemplate } from "@/features/routes/page-type-templates";
import { loadPageContent } from "@/lib/content/load-page-content";

export default async function Page() {
  const contentRoot = path.join(process.cwd(), "src", "content");
  const pageContent = loadPageContent(contentRoot, "transport");
  return <HubPageTemplate path="/transport" bodyHtml={pageContent?.bodyHtml} />;
}
