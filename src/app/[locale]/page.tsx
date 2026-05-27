import { HomePage } from "@/features/home/HomePage";
import { generateMetadataForPath } from "@/lib/seo/generate-metadata-for-path";

export function generateMetadata() {
  return generateMetadataForPath("/");
}

export default function Page() {
  return <HomePage />;
}
