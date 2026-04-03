import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { PHASE1_IA_AIRPORT_REDIRECT } from "./lib/ia-phase1-routes";
import { defaultLocale, locales } from "./i18n/routing";

const intlMiddleware = createMiddleware({
  locales: [...locales],
  defaultLocale,
  localePrefix: "never",
});

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/\/$/, "") || "/";
  if (pathname === PHASE1_IA_AIRPORT_REDIRECT.fromPath) {
    return NextResponse.redirect(
      new URL(PHASE1_IA_AIRPORT_REDIRECT.toPath, request.url),
    );
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
