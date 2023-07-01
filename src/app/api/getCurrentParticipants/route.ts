import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

export async function GET() {
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

  const participantsLang: Record<string, any> = {};
  const participantsLive = [];

  for (const participant of participants) {
    const lang = participant.lang;
    const name = participant.name;

    const response = await fetch(
      "http://findmeastreamer.com/api/getAppAccess",
      {
        method: "POST",
        next: { revalidate: 10 },
      }
    );
    const data = await response.json();
    if (process.env.CLIENT_ID) {
      const twitchResponse = await fetch(
        `https://api.twitch.tv/helix/streams?user_login=${name}`,
        {
          headers: {
            Authorization: `Bearer ${data.data.access_token}`,
            "Client-Id": process.env.CLIENT_ID,
          },
          cache: "no-store",
        }
      );
      const twitchData = await twitchResponse.json();
      if (twitchData && twitchData.data.length > 0) {
        participantsLive.push(participant);
      } else {
        console.log("participants is not live : " + participant.name);
      }
    }
  }

  participantsLive.forEach((participant) => {
    const lang = participant.lang;
    if (!participantsLang[lang]) {
      participantsLang[lang] = []; // Crée un tableau vide pour la langue si elle n'existe pas encore
    }
    participantsLang[lang].push(participant); // Ajoute le participant au tableau correspondant à sa langue
  });

  const winnersByLang: Record<string, any> = {};

  for (let lang in participantsLang) {
    const participants = participantsLang[lang];

    // Check if there are participants in this language
    if (participants.length > 0) {
      const winnerIndex = Math.floor(Math.random() * participants.length);
      const winner = participants[winnerIndex];
      winnersByLang[lang] = winner;
    }
  }

  for (let lang in winnersByLang) {
    const winner = winnersByLang[lang];
    try {
      await prisma.winner.create({
        data: {
          name: winner.name,
          lang: winner.lang,
        },
      });

      console.log(
        `Winner '${winner.name}' (${winner.lang}) has been saved to the database.`
      );
    } catch (error) {
      console.error(
        `Error saving winner '${winner.name}' (${winner.slang}):`,
        error
      );
    }
  }

  return NextResponse.json({ winners: winnersByLang });
}
