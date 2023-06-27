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

    // Parcourt chaque participant
    participants.forEach((participant) => {
      const lang = participant.lang;

      // Vérifie si la langue est déjà présente dans l'objet participantsLang
      if (!participantsLang[lang]) {
        // Si la langue n'existe pas encore, crée un tableau vide pour cette langue
        participantsLang[lang] = [];
      }

      // Ajoute le participant au tableau correspondant à sa langue
      participantsLang[lang].push(participant);
    });

    const gagnantsParLang = {};

    for (let lang in participantsLang) {
      const participants = participantsLang[lang];

      // Vérifie s'il y a des participants dans cette langue
      if (participants.length > 0) {
        const gagnantIndex = Math.floor(Math.random() * participants.length);
        const gagnant = participants[gagnantIndex];
        gagnantsParLang[lang] = gagnant;
      }
    }

    // Affiche les participants gagnants triés par langue
    return NextResponse.json({ winners: gagnantsParLang });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error, no participants currently" });
  }
}
