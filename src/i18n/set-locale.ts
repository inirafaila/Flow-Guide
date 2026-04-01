"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { locales, type AppLocale } from "@/i18n/routing";

const COOKIE_NAME = "NEXT_LOCALE";

function isSafeInternalPath(pathname: string): boolean {
  if (!pathname.startsWith("/") || pathname.startsWith("//")) {
    return false;
  }
  if (pathname.includes("\0")) {
    return false;
  }
  return true;
}

export async function setLocaleAction(formData: FormData): Promise<void> {
  const raw = formData.get("locale");
  const pathnameRaw = formData.get("pathname");

  if (typeof raw !== "string" || !locales.includes(raw as AppLocale)) {
    redirect("/");
  }

  const pathname =
    typeof pathnameRaw === "string" && pathnameRaw.length > 0
      ? pathnameRaw
      : "/";

  if (!isSafeInternalPath(pathname)) {
    redirect("/");
  }

  const jar = await cookies();
  jar.set(COOKIE_NAME, raw, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  redirect(pathname);
}
