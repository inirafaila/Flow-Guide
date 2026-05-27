import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ROUTE_TITLES } from "@/lib/routes";

const RELATED_HREFS = [
  "/documents",
  "/documents/address-registration",
  "/documents/temporary-residency",
] as const;

/** Static related guides below the stay calculator (Phase 3 Group I). */
export async function StayCalculatorRelatedLinks() {
  const t = await getTranslations("stayCalculator");

  return (
    <nav
      className="stay-calc-related"
      aria-labelledby="stay-calc-related-heading"
    >
      <h2 id="stay-calc-related-heading" className="stay-calc-related__title">
        {t("relatedTitle")}
      </h2>
      <ul className="stay-calc-related__list">
        {RELATED_HREFS.map((href) => (
          <li key={href}>
            <Link href={href}>{ROUTE_TITLES[href] ?? href}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
