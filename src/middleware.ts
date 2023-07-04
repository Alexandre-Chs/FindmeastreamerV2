import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

const passwordProtectedRoute = "/api/getCurrentParticipants";

const i18nMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "fr", "es", "ko"],
  defaultLocale: "en",
});

export function middleware(req: NextRequest, _res: NextResponse) {
  const validPassword = process.env.PASSWORD_QUERY_GET;
  console.log(req.nextUrl.pathname);
  if (req.nextUrl.pathname === passwordProtectedRoute) {
    const providedPassword = req.nextUrl.searchParams.get("password");
    console.log(validPassword);

    if (providedPassword?.toString() === validPassword) {
      return;
    } else {
      return new Response(null, { status: 403 });
    }
  }
  return i18nMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)", "/api/getCurrentParticipants"],
};
