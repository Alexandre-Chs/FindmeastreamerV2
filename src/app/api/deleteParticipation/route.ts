import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

export async function DELETE(request: NextRequest) {
  const user = request.nextUrl.searchParams.get("user");
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
  //   const deleteParticipationUser = await prisma.user.delete({
  //     where: { name: user },
  //   });
  return NextResponse.json({ message: "deleted" });
}
