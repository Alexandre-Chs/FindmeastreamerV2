import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

export async function GET(request: Request) {
  try {
    const response = await fetch(
      "http://localhost:3000/api/getCurrentParticipants"
    );
    const currentWinner = await response.json();

    const winners = Object.values(currentWinner.currentParticipants.winners);

    for (const winner of winners) {
      const { name, lang } = winner;
      await prisma.winner.create({
        data: {
          username: name,
          language: lang,
        },
      });
    }

    return NextResponse.json({ currentParticipants: currentWinner });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error when getting current participants",
    });
  }
}
