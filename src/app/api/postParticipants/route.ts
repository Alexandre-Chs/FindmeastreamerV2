import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { user, lang } = await request.json();
  try {
    const createdUser = await prisma.user.create({
      data: {
        name: user.login,
        lang: lang,
      },
    });

    console.log("Utilisateur enregistré:", createdUser);

    // Répondez à la requête avec une réponse JSON indiquant que l'enregistrement a réussi
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'utilisateur:", error);

    // Répondez à la requête avec une réponse JSON indiquant que l'enregistrement a échoué
    return new Response(JSON.stringify({ success: false }), {
      headers: { "Content-Type": "application/json" },
      status: 500, // Ou tout autre code d'erreur approprié
    });
  }
}
