import { SearchStub } from "@/features/search/SearchStub";
import { UtilityPageTemplate } from "@/features/routes/page-type-templates";

export default async function Page() {
  return (
    <>
      <UtilityPageTemplate path="/search" />
      <SearchStub />
    </>
  );
}
