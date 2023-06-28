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
            currentHour - 1
          ),
          lt: new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            currentHour
          ),
        },
      },
    });

    const participantsLang = {};
    const bearer = await fetch("http://localhost:3000/api/getAppAccess", {
      method: "POST",
    }).then((res) => res.json());

    // Parcourt chaque participant
    for (const participant of participants) {
      const lang = participant.lang;
      const name = participant.name;
      if (process.env.CLIENT_ID) {
        const headers = {
          Authorization: `Bearer ${bearer}`,
          "Client-Id": process.env.CLIENT_ID,
        };

        const apiUrl = `https://api.twitch.tv/helix/streams?user_login=${name}`;
        const getStream = await fetch(apiUrl, { headers });
        const responseData = await getStream.json();
        console.log(responseData);
      }

      if (!participantsLang[lang]) {
        // Si la langue n'existe pas encore, crée un tableau vide pour cette langue
        participantsLang[lang] = [];
      }

      // Ajoute le participant au tableau correspondant à sa langue
      participantsLang[lang].push(participant);
    }

    const gagnantsParLang = {};

    for (let lang in participantsLang) {
      const participants = participantsLang[lang];

      // Vérifie s'il y a des participants dans cette langue
      if (participants.length > 0) {
        const gagnantIndex = Math.floor(Math.random() * participants.length);
        const winner = participants[gagnantIndex];
        gagnantsParLang[lang] = winner;
      }
    }

    return NextResponse.json({ winners: gagnantsParLang });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error, no participants currently" });
  }
}
