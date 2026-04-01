import { getRequestConfig } from "next-intl/server";
import type { AbstractIntlMessages } from "use-intl";
import { defaultLocale, locales, type AppLocale } from "./routing";

function resolveLocale(candidate: string | undefined): AppLocale {
  if (candidate && locales.includes(candidate as AppLocale)) {
    return candidate as AppLocale;
  }
  return defaultLocale;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = resolveLocale(requested);

  let messages: AbstractIntlMessages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    messages = (await import(`../../messages/${defaultLocale}.json`)).default;
  }

  return { locale, messages };
});
