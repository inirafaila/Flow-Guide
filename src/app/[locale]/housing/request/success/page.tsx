import { ServiceFormFollowUpPageTemplate } from "@/features/routes/page-type-templates";
import { generateMetadataForPath } from "@/lib/seo/generate-metadata-for-path";

export function generateMetadata() {
  return generateMetadataForPath("/housing/request/success");
}

export default async function Page() {
  return (
    <ServiceFormFollowUpPageTemplate path="/housing/request/success" />
  );
}
