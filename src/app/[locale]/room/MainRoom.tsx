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
    const dataTestError = {
      winner: [
        {
          id: 12,
          name: "solaryhs",
          lang: "fr",
          createdAt: "2023-06-29T10:26:13.987Z",
        },
        {
          id: 13,
          name: "solaryhs",
          lang: "fr",
          createdAt: "2023-06-29T10:27:03.615Z",
        },
        {
          id: 14,
          name: "solaryhs",
          lang: "fr",
          createdAt: "2023-06-29T10:28:04.024Z",
        },
        {
          id: 15,
          name: "solaryhs",
          lang: "fr",
          createdAt: "2023-06-29T10:30:09.251Z",
        },
        {
          id: 16,
          name: "solaryhs",
          lang: "fr",
          createdAt: "2023-06-29T10:31:03.792Z",
        },
        {
          id: 17,
          name: "solaryhs",
          lang: "fr",
          createdAt: "2023-06-29T10:32:04.604Z",
        },
        {
          id: 18,
          name: "solaryhs",
          lang: "fr",
          createdAt: "2023-06-29T10:33:03.379Z",
        },
        {
          id: 19,
          name: "solaryhs",
          lang: "fr",
          createdAt: "2023-06-29T10:33:22.149Z",
        },
      ],
    };
    
    const checkWinner = async () => {
      try {
        const response = await fetch("/api/getWinner");
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

  console.log(streamer);

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
