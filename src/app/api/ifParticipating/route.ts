import { NextRequest } from "next/server";
import prisma from "../../../../prisma/prisma";

export async function GET(request: NextRequest) {
  const user = request.nextUrl.searchParams.get("user");
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
  const userExists = participants.some(
    (participant) => participant.name === user
  );
  if (userExists) {
    return new Response(
      JSON.stringify({
        success: true,
        message: "User already participated in the current hour event",
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } else {
    return new Response(
      JSON.stringify({
        success: false,
        message: "User not participating",
      })
    );
  }
}
