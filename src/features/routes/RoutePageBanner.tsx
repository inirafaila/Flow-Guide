import { getTranslations } from "next-intl/server";
import { ROUTE_TITLES } from "@/lib/routes";

type RoutePageBannerProps = {
  path: string;
};

/** Shared Phase 1 route header: title, phase note, canonical path. Used by generic shells and page-type templates. */
export async function RoutePageBanner({ path }: RoutePageBannerProps) {
  const t = await getTranslations("placeholder");
  const title = ROUTE_TITLES[path] ?? path;

  return (
    <header className="route-page-banner">
      <h1>{title}</h1>
      <p className="muted">{t("phase1")}</p>
      <p>
        <code>{path}</code>
      </p>
    </header>
  );
}
