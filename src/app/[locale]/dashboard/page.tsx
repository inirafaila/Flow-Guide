import path from "node:path";
import { DashboardChecklistBlock } from "@/features/dashboard/DashboardChecklistBlock";
import { DashboardNextBestAction } from "@/features/dashboard/DashboardNextBestAction";
import { DashboardQuickActions } from "@/features/dashboard/DashboardQuickActions";
import { DashboardReentryNote } from "@/features/dashboard/DashboardReentryNote";
import { DashboardUpdatesBlock } from "@/features/dashboard/DashboardUpdatesBlock";
import { loadValidatedChecklistItems } from "@/lib/content/load-checklist-and-updates";
import { loadUpdateItems } from "@/lib/content/load-update-items";
import { selectLatestUpdates } from "@/lib/content/select-latest-updates";
import { generateMetadataForPath } from "@/lib/seo/generate-metadata-for-path";

const DASHBOARD_UPDATES_MAX = 3;

export function generateMetadata() {
  return generateMetadataForPath("/dashboard");
}

export default function Page() {
  const contentRoot = path.join(process.cwd(), "src", "content");
  const items = loadValidatedChecklistItems(contentRoot).map(
    (p) => p.frontmatter,
  );
  const recentUpdates = selectLatestUpdates(
    loadUpdateItems(contentRoot),
    DASHBOARD_UPDATES_MAX,
  );

  return (
    <div className="dashboard-page">
      <DashboardReentryNote />
      <DashboardNextBestAction />
      <DashboardChecklistBlock items={items} />
      <DashboardQuickActions />
      <DashboardUpdatesBlock items={recentUpdates} />
    </div>
  );
}
