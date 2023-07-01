import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

export async function GET(request: Request) {
  const now = new Date();
  const currentHour = now.getHours();

  // Déterminer la date et l'heure de début de l'heure précédente
  const startOfPreviousHour = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    currentHour - 1
  );
  const endOfPreviousHour = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    currentHour
  );

  const winner = await prisma.winner.findMany({
    where: {
      createdAt: {
        gte: startOfPreviousHour,
        lt: endOfPreviousHour,
      },
    },
  });
  return NextResponse.json({ winner: winner });
}
