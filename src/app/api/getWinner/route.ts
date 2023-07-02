import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

export async function GET() {
  const now = new Date();
  const currentHour = now.getHours();
  try {
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

    const response = NextResponse.json({ winner });

    // Ajouter des en-têtes pour désactiver la mise en cache
    response.headers.set("Cache-Control", "no-store, must-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  } catch (error) {
    console.log("Error on getWinner" + error);
  }
}
