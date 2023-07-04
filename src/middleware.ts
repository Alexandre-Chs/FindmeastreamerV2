import createMiddleware from "next-intl/middleware";

export const middlewarei18n = createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "fr", "es", "ko"],
  defaultLocale: "en",
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

import { NextRequest, NextResponse } from "next/server";

const passwordProtectedRoutes = {
  "/api/getCurrentParticipants": "password1",
  "/api/deleteParticipation": "password2",
};

export function middleware(req: NextRequest, _res: NextResponse) {
  const requestedRoute = req.nextUrl.pathname;
  const providedPassword = req.nextUrl.searchParams.get("password");

  if (requestedRoute in passwordProtectedRoutes) {
    const validPassword = passwordProtectedRoutes[requestedRoute];

    if (providedPassword === validPassword) {
      // Le mot de passe est valide, continuez le traitement de la requête
      return null;
    } else {
      // Le mot de passe est invalide, renvoyez une réponse avec un statut 403 (accès refusé)
      return new Response(null, { status: 403 });
    }
  }

  // Route non protégée, continuez le traitement de la requête
  return null;
}
