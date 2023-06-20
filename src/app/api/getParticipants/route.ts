import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();
  try {
    const participants = await prisma.user.findMany();
    return NextResponse.json({ participants: participants });
  } catch (error) {
    console.log(error);
  }
}
