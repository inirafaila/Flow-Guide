import path from "node:path";
import { DashboardChecklistBlock } from "@/features/dashboard/DashboardChecklistBlock";
import { DashboardNextBestAction } from "@/features/dashboard/DashboardNextBestAction";
import { loadValidatedChecklistItems } from "@/lib/content/load-checklist-and-updates";

export default function Page() {
  const contentRoot = path.join(process.cwd(), "src", "content");
  const items = loadValidatedChecklistItems(contentRoot).map(
    (p) => p.frontmatter,
  );
  return (
    <>
      <DashboardNextBestAction />
      <DashboardChecklistBlock items={items} />
    </>
  );
}
