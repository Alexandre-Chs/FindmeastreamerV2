import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

const allowedOrigins = process.env.NEXT_PUBLIC_ALLOWORIGIN;

export async function DELETE(request: NextRequest) {
  const user = request.nextUrl.searchParams.get("user");
  const authorizationHeader = request.headers.get("Authorization");
  const origin = request.headers.get("Origin") as string;
  if (allowedOrigins && !allowedOrigins.includes(origin)) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (authorizationHeader !== process.env.NEXT_PUBLIC_PW) {
    return NextResponse.json({ message: "not allowed" });
  } else {
    if (user === null) {
      return NextResponse.json({ message: "user is null" });
    }
    const now = new Date();
    const currentHour = now.getHours();
    const deleteResult = await prisma.user.deleteMany({
      where: {
        name: user,
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

    return NextResponse.json({ message: "deleted" });
  }
}
