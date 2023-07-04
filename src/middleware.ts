import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

// const passwordProtectedRoute = "/api/getCurrentParticipants";
// const validPassword = "YOUR_PASSWORD";

// export default createMiddleware({
//   // A list of all locales that are supported
//   locales: ["en", "fr", "es", "ko"],
//   defaultLocale: "en",
// });

const passwordProtectedRoute = "/api/getCurrentParticipants";

const i18nMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "fr", "es", "ko"],
  defaultLocale: "en",
});

export function middleware(req: NextRequest, _res: NextResponse) {
  const validPassword = "lol";
  console.log(req.nextUrl.pathname);
  if (req.nextUrl.pathname === passwordProtectedRoute) {
    const providedPassword = req.nextUrl.searchParams.get("password");
    console.log(validPassword);

    if (providedPassword?.toString() === validPassword) {
      // Le mot de passe est valide, continuez le traitement de la requête
      console.log("Le mot de passe est bon");
      return i18nMiddleware(req);
    } else {
      // Le mot de passe est invalide, renvoyez une réponse avec un statut 403 (accès refusé)
      return new Response(null, { status: 403 });
    }
  }

  // Route non protégée, continuez le traitement de la requête
  return i18nMiddleware(req);
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|.*\\..*).*)", "/api/:path*"],
};
