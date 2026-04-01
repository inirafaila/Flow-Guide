/** English-first URLs; locale from cookie — see ENGINEERING_ARCHITECTURE §7. */
export const locales = ["en", "fa", "ru"] as const;

export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "en";
