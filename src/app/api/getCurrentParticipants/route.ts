import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";
import { useApiContext } from "@/context/ApiProvider";

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
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });

    // Parcourt chaque participant
    const processParticipants = async () => {
      for (const participant of participants) {
        const lang = participant.lang;
        const name = participant.name;
        try {
          const response = await fetch(
            `http://localhost:3000/api/getStreamsLive?login=${name}&bearer=${bearer.data.access_token}`
          );
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error(error);
        }

        // Vérifie si la langue est déjà présente dans l'objet participantsLang
        if (!participantsLang[lang]) {
          // Si la langue n'existe pas encore, crée un tableau vide pour cette langue
          participantsLang[lang] = [];
        }

        // Ajoute le participant au tableau correspondant à sa langue
        participantsLang[lang].push(participant);
      }
    };

    processParticipants();

    const gagnantsParLang = {};

    // for (let lang in participantsLang) {
    //   const participants = participantsLang[lang];

    //   // Vérifie s'il y a des participants dans cette langue
    //   if (participants.length > 0) {
    //     const gagnantIndex = Math.floor(Math.random() * participants.length);
    //     const winner = participants[gagnantIndex];
    //     const winnerPerLang = await prisma.winner.create({
    //       data: {
    //         name: winner.name,
    //         lang: winner.lang,
    //       },
    //     });
    //     gagnantsParLang[lang] = winner;
    //   }
    // }

    return NextResponse.json({ winners: gagnantsParLang });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error, no participants currently" });
  }
}
