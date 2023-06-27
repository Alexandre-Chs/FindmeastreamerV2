import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

export async function GET() {
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
    return NextResponse.json({ participants: participants });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error, no participants currently" });
  }
}
