import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

export async function GET() {
  try {
    const participants = await prisma.user.findMany();
    return NextResponse.json({ participants: participants });
  } catch (error) {
    console.log(error);
  }
}
