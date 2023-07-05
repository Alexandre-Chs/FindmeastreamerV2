"use client";

import { getLang } from "@/utils/getLang";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useApiContext } from "@/context/ApiProvider";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const MainRoom = () => {
  const [streamer, setStreamer] = useState("");
  const parent = process.env.PARENT_TWITCH_CHAT;
  const lang = getLang();
  const { getBearer } = useApiContext();

  useEffect(() => {
    const checkWinner = async () => {
      try {
        const response = await fetch("/api/getWinner", { cache: "no-store" });
        if (response.ok) {
          const currentWinner = await response.json();
          if (currentWinner && currentWinner.winner) {
            const winnerByLang = currentWinner.winner.find(
              (winner: { lang: string | undefined }) => winner.lang === lang
            );
            if (winnerByLang) {
              setStreamer(winnerByLang.name);
            } else {
              const bearerAppToken = await getBearer();
              if (bearerAppToken !== null) {
                const bearer = bearerAppToken.data.access_token;
                const streamerResponse = await fetch(
                  `/api/getStreamer?lang=${lang}&bearer=${bearer}`
                );
                if (streamerResponse.ok) {
                  const streamerData = await streamerResponse.json();
                  const allUsers = streamerData.user.data;
                  const randomIndex = Math.floor(
                    Math.random() * allUsers.length
                  );
                  const randomStreamer = allUsers[randomIndex].user_login;
                  setStreamer(randomStreamer);
                } else {
                  console.error("Can't get a streamers");
                }
              } else {
                console.error("Bearer is null");
              }
            }
          } else {
            console.error("No winner");
          }
        } else {
          console.error("Can't get winner");
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkWinner();
  }, [lang, getBearer]);

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
