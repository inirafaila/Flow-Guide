"use client";

import Script from "next/script";

const DEFAULT_PLAUSIBLE_SRC = "https://plausible.io/js/script.js";

/**
 * Loads Plausible when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set.
 * In development, skips loading unless NEXT_PUBLIC_PLAUSIBLE_ENABLE_DEV=true.
 */
export function PlausibleScript() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;

  if (process.env.NODE_ENV === "development") {
    const enableDev = process.env.NEXT_PUBLIC_PLAUSIBLE_ENABLE_DEV === "true";
    if (!enableDev) return null;
  }

  const src =
    process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC ?? DEFAULT_PLAUSIBLE_SRC;

  return (
    <Script
      defer
      data-domain={domain}
      src={src}
      strategy="afterInteractive"
    />
  );
}
