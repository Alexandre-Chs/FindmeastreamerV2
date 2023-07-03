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

  return NextResponse.json({ test: winner });
}
