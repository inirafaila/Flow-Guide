"use client";

import { Button } from "@/components/ui/Button";
import { usePathname } from "next/navigation";
import { setLocaleAction } from "@/i18n/set-locale";

type LocaleSwitcherProps = {
  languageLabel: string;
  localeLabels: Record<"en" | "fa" | "ru", string>;
};

export function LocaleSwitcher({
  languageLabel,
  localeLabels,
}: LocaleSwitcherProps) {
  const pathname = usePathname() ?? "/";

  return (
    <div className="locale-switcher">
      <span className="locale-switcher__label">{languageLabel}</span>
      <form className="locale-switcher__form" action={setLocaleAction}>
        <input type="hidden" name="pathname" value={pathname} />
        {(["en", "fa", "ru"] as const).map((code) => (
          <Button
            key={code}
            type="submit"
            variant="secondary"
            name="locale"
            value={code}
            className="locale-switcher__btn"
          >
            {localeLabels[code]}
          </Button>
        ))}
      </form>
    </div>
  );
}
