import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

export async function GET(request: Request) {
  const now = new Date();
  const currentHour = now.getHours();
  const winner = await prisma.winner.findMany({
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
  const response = NextResponse.json({ winner: winner });

  // Ajouter l'en-tête de cache-control pour désactiver la mise en cache
  response.headers.set("Cache-Control", "no-store");

  return response;
}
