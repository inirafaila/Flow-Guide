import path from "node:path";
import { FaqPage } from "@/features/faq/FaqPage";
import { loadFaqItems } from "@/lib/content/load-faq-items";

export default async function Page() {
  const contentRoot = path.join(process.cwd(), "src", "content");
  const items = loadFaqItems(contentRoot);
  return <FaqPage items={items} />;
}
