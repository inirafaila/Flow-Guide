import path from "node:path";
import { UpdatesPage } from "@/features/updates/UpdatesPage";
import { loadUpdateItems } from "@/lib/content/load-update-items";

export default async function Page() {
  const contentRoot = path.join(process.cwd(), "src", "content");
  const items = loadUpdateItems(contentRoot);
  return <UpdatesPage items={items} />;
}
