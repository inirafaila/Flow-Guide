"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Fires Plausible pageviews on App Router client navigations.
 * Skips the first mount so the initial script pageview is not duplicated.
 */
export function PlausiblePageview() {
  const pathname = usePathname();
  const isFirstPathRef = useRef(true);

  useEffect(() => {
    if (isFirstPathRef.current) {
      isFirstPathRef.current = false;
      return;
    }
    window.plausible?.("pageview");
  }, [pathname]);

  return null;
}
