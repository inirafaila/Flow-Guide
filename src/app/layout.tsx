import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { PlausiblePageview } from "@/components/observability/PlausiblePageview";
import { PlausibleScript } from "@/components/observability/PlausibleScript";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { SiteHeader } from "@/components/shell/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Flow-Guide",
    template: "%s · Flow-Guide",
  },
  description: "Newcomer guide for life in Armenia — Phase 1 scaffold.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  const locale = await getLocale();

  return (
    <html lang={locale} dir={locale === "fa" ? "rtl" : "ltr"}>
      <body>
        <PlausibleScript />
        <PlausiblePageview />
        <NextIntlClientProvider messages={messages}>
          <div className="layout">
            <SiteHeader />
            <main className="layout__main">{children}</main>
            <SiteFooter />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
