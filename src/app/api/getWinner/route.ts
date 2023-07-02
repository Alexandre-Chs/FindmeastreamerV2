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

    const response = NextResponse.json({ winner: winner });
    response.headers.set("Cache-Control", "no-cache");
    return response;
  } catch (error) {
    console.log("Error on getWinner" + error);
  }
}
