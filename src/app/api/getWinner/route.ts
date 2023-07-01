import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

export async function GET(request: Request) {
  const now = new Date();
  const currentHour = now.getHours();
  const startOfCurrentDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const endOfCurrentHour = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    currentHour
  );

  const winner = await prisma.winner.findMany({
    where: {
      createdAt: {
        gte: startOfCurrentDay,
        lt: endOfCurrentHour,
      },
    },
  });
  return NextResponse.json({ winner: winner });
}
