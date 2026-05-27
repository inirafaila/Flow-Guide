import { SearchPage } from "@/features/search/SearchPage";
import { RoutePageBanner } from "@/features/routes/RoutePageBanner";
import { generateMetadataForPath } from "@/lib/seo/generate-metadata-for-path";

export function generateMetadata() {
  return generateMetadataForPath("/search");
}

export default async function Page() {
  return (
    <article className="page-template page-template--search search-page">
      <RoutePageBanner path="/search" />
      <SearchPage />
    </article>
  );
}
