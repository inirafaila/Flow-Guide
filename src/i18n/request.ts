import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import type { AbstractIntlMessages } from "use-intl";
import { defaultLocale, locales, type AppLocale } from "./routing";

export default getRequestConfig(async () => {
  const jar = await cookies();
  const raw = jar.get("NEXT_LOCALE")?.value;
  const locale: AppLocale = locales.includes(raw as AppLocale)
    ? (raw as AppLocale)
    : defaultLocale;

  let messages: AbstractIntlMessages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    messages = (await import(`../../messages/${defaultLocale}.json`)).default;
  }

  return { locale, messages };
});
