"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useState,
  type ReactNode,
} from "react";

export type SiteHeaderNavLink = {
  href: string;
  label: string;
};

type SiteHeaderChromeProps = {
  brandLink: ReactNode;
  links: SiteHeaderNavLink[];
  localeSwitcher: ReactNode;
  primaryNavAriaLabel: string;
  menuOpenLabel: string;
  menuCloseLabel: string;
};

export function SiteHeaderChrome({
  brandLink,
  links,
  localeSwitcher,
  primaryNavAriaLabel,
  menuOpenLabel,
  menuCloseLabel,
}: SiteHeaderChromeProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((o) => !o), []);

  return (
    <>
      <div className="site-header__row">
        <div className="site-header__brand-slot">{brandLink}</div>
        <div className="site-header__row-end">
          <div className="site-header__locale">{localeSwitcher}</div>
          <button
            type="button"
            className="site-header__menu-toggle"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={toggle}
            aria-label={open ? menuCloseLabel : menuOpenLabel}
          >
            <span className="site-header__menu-icon" aria-hidden={true}>
              {open ? "\u00d7" : "\u2630"}
            </span>
          </button>
        </div>
      </div>

      <nav
        className="site-header__nav site-header__nav--desktop"
        aria-label={primaryNavAriaLabel}
      >
        {links.map(({ href, label }) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
      </nav>

      {open ? (
        <>
          <button
            type="button"
            className="site-header__backdrop"
            aria-label={menuCloseLabel}
            onClick={close}
          />
          <div
            id={panelId}
            className="site-header__drawer"
            role="dialog"
            aria-modal="true"
            aria-label={primaryNavAriaLabel}
          >
            <nav
              className="site-header__nav site-header__nav--mobile"
              aria-label={primaryNavAriaLabel}
            >
              {links.map(({ href, label }) => (
                <Link key={href} href={href} onClick={close}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </>
      ) : null}
    </>
  );
}

