import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
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

    return NextResponse.json({ winner });
  } catch (error) {
    console.error("Error retrieving winner:", error);
    return NextResponse.error();
  }
}
