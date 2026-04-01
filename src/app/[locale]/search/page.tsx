import { SearchStub } from "@/features/search/SearchStub";
import { RoutePlaceholder } from "@/features/routes/RoutePlaceholder";

export default async function Page() {
  return (
    <>
      <RoutePlaceholder path="/search" />
      <SearchStub />
    </>
  );
}
