"use client";

import { getLang } from "@/utils/getLang";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getParentTwitchChat } from "@/utils/getParentTwitchChat";
import { useApiContext } from "@/context/ApiProvider";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const MainRoom = () => {
  const [streamer, setStreamer] = useState("");
  const parent = process.env.PARENT_TWITCH_CHAT;
  const lang = getLang();
  const { getBearer } = useApiContext();
  useEffect(() => {
    const getStreamer = async () => {
      const bearerAppToken = await getBearer();
      if (bearerAppToken !== null) {
        const bearer = bearerAppToken.data.access_token;
        await fetch(`/api/getStreamer?lang=${lang}&bearer=${bearer}`)
          .then((res) => res.json())
          .then((data) => {
            const allUsers = data.user.data;
            const randomIndex = Math.floor(Math.random() * allUsers.length);
            const randomStreamer = allUsers[randomIndex].user_login;
            setStreamer(randomStreamer);
          });
      } else {
        // Gérez le cas où le bearer est null
      }
    };

    getStreamer();
  }, [lang, getBearer]);

  useEffect(() => {
    const checkWinner = async () => {
      try {
        const response = await fetch(`/api/getWinner`);
        if (response.ok) {
          const winnerData = await response.json();
          // Utilisez les données du gagnant
        } else {
          // Gestion des erreurs
          console.error("Erreur lors de la récupération du gagnant");
        }
      } catch (error) {
        // Gestion des erreurs
        console.error(error);
      }
    };

    // Appel initial pour vérifier le gagnant
    checkWinner();

    // Appel périodique toutes les 1 minute
    setInterval(checkWinner, 5000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] pl-8 pr-8 mt-12 md:flex-row">
      <ReactPlayer
        url={`https://www.twitch.tv/${streamer}`}
        width="100%"
        height="100%"
        playing={true}
        muted={false}
        volume={1}
      />
      <iframe
        src={`https://www.twitch.tv/embed/${streamer}/chat?parent=${parent}`}
        className="w-full md:w-[400px] h-full"
      ></iframe>
    </div>
  );
};

export default MainRoom;
