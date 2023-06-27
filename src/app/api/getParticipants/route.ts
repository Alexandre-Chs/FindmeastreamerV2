import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../prisma/prisma";

export async function GET(request: NextRequest) {
  const expectedPassword = "123";
  const cronPassword = request.headers.get("X-Cron-Password");
  if (cronPassword !== expectedPassword) {
    return NextResponse.json({ message: "acces interdit" }); // Mot de passe incorrect, retournez une réponse d'accès interdit
  } else {
    try {
      const participants = await prisma.user.findMany();
      return NextResponse.json({ participants: participants });
    } catch (error) {
      console.log(error);
    }
  }
}
