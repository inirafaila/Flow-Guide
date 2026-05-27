import { SearchPage } from "@/features/search/SearchPage";
import { RoutePageBanner } from "@/features/routes/RoutePageBanner";

export default async function Page() {
  return (
    <article className="page-template page-template--search search-page">
      <RoutePageBanner path="/search" />
      <SearchPage />
    </article>
  );
}
