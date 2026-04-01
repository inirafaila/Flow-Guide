import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { locales, type AppLocale } from "@/i18n/routing";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams(): { locale: AppLocale }[] {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: raw } = await params;
  if (!locales.includes(raw as AppLocale)) {
    notFound();
  }
  const locale = raw as AppLocale;
  setRequestLocale(locale);
  return <>{children}</>;
}
