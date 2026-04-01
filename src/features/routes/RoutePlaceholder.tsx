import { getTranslations } from "next-intl/server";
import { ROUTE_TITLES } from "@/lib/routes";

type RoutePlaceholderProps = {
  path: string;
};

export async function RoutePlaceholder({ path }: RoutePlaceholderProps) {
  const t = await getTranslations("placeholder");
  const title = ROUTE_TITLES[path] ?? path;

  return (
    <section className="route-placeholder">
      <h1>{title}</h1>
      <p className="muted">{t("phase1")}</p>
      <p>
        <code>{path}</code>
      </p>
    </section>
  );
}
