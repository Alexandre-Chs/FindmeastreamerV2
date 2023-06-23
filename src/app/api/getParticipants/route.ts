import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET() {
  const prisma = new PrismaClient();
  try {
    const participants = await prisma.user.findMany();
    return NextResponse.json({ participants: participants });
  } catch (error) {
    console.log(error);
  }
}
