import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { LocaleSwitcher } from "@/components/shell/LocaleSwitcher";
import { SiteHeaderChrome } from "@/components/shell/SiteHeaderChrome";

export async function SiteHeader() {
  const t = await getTranslations();

  const links: { href: string; label: string }[] = [
    { href: "/", label: t("shell.home") },
    { href: "/start", label: t("shell.start") },
    { href: "/dashboard", label: t("shell.dashboard") },
    { href: "/search", label: t("shell.search") },
    { href: "/faq", label: t("shell.faq") },
    { href: "/updates", label: t("shell.updates") },
    { href: "/newcomer", label: t("shell.newcomer") },
    { href: "/documents", label: t("shell.documents") },
    { href: "/work", label: t("shell.work") },
    { href: "/housing", label: t("shell.housing") },
    { href: "/payments", label: t("shell.payments") },
    { href: "/transport", label: t("shell.transport") },
    { href: "/daily-life", label: t("shell.dailyLife") },
    { href: "/city", label: t("shell.city") },
  ];

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <SiteHeaderChrome
          brandLink={
            <Link href="/" className="site-header__brand">
              {t("brand")}
            </Link>
          }
          links={links}
          localeSwitcher={
            <LocaleSwitcher
              languageLabel={t("shell.language")}
              localeLabels={{
                en: t("shell.locale_en"),
                fa: t("shell.locale_fa"),
                ru: t("shell.locale_ru"),
              }}
            />
          }
          primaryNavAriaLabel={t("shell.primaryNav")}
          menuOpenLabel={t("shell.menuOpen")}
          menuCloseLabel={t("shell.menuClose")}
        />
      </div>
    </header>
  );
}
