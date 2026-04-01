import { getTranslations } from "next-intl/server";
import Link from "next/link";

export async function SiteHeader() {
  const t = await getTranslations("shell");

  const links: { href: string; label: string }[] = [
    { href: "/", label: t("home") },
    { href: "/start", label: t("start") },
    { href: "/dashboard", label: t("dashboard") },
    { href: "/search", label: t("search") },
    { href: "/faq", label: t("faq") },
    { href: "/updates", label: t("updates") },
    { href: "/newcomer", label: t("newcomer") },
    { href: "/documents", label: t("documents") },
    { href: "/work", label: t("work") },
    { href: "/housing", label: t("housing") },
    { href: "/payments", label: t("payments") },
    { href: "/transport", label: t("transport") },
    { href: "/daily-life", label: t("dailyLife") },
    { href: "/city", label: t("city") },
  ];

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-header__brand">
          Flow-Guide
        </Link>
        <nav className="site-header__nav" aria-label="Primary">
          {links.map(({ href, label }) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
