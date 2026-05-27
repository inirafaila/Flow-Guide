import { HubPageTemplate } from "@/features/routes/page-type-templates";
import { generateMetadataForPath } from "@/lib/seo/generate-metadata-for-path";

export function generateMetadata() {
  return generateMetadataForPath("/city");
}

export default async function Page() {
  return <HubPageTemplate path="/city" />;
}
