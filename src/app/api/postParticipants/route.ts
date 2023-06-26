import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { user, lang } = await request.json();
  try {
    const now = new Date();
    const currentHour = now.getHours();
    const participants = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            currentHour
          ),
          lt: new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            currentHour + 1
          ),
        },
      },
    });

    const userExists = participants.some(
      (participant) => participant.name === user.login
    );
    if (userExists) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User already participated in the current hour event",
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      const createdUser = await prisma.user.create({
        data: {
          name: user.login,
          lang: lang,
        },
      });
      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'utilisateur:", error);

    return new Response(JSON.stringify({ success: false }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
