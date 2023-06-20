"use client";

import Login from "@/components/Login";
import WrapperNav from "@/components/nav/WrapperNav";
import { useApiContext } from "@/context/ApiProvider";
import { useState } from "react";

export default function Participation() {
  const { user } = useApiContext();
  const [error, setError] = useState("");
  const handleSubmitParticipate = () => {
    console.log("submitted");
    console.log(user);
    if (!user) {
      setError("You must login first");
    }
  };
  return (
    <div>
      <WrapperNav page="participate" />
      <div className="flex flex-col items-start justify-center max-w-md m-auto mt-8">
        <div className="h-auto w-[330px] sm:w-[450px] sm:h-[200px] bg-[#8080801a] flex m-auto flex-col sm:flex-row items-center justify-center p-6 rounded-lg">
          <div className="font-bold text-9xl">01</div>
          <div className="sm:w-[250px] sm:ml-4">
            <h1 className="text-4xl font-bold">Connexion</h1>
            <p className="mt-2 text-sm">{`Connecte toi pour pouvoir t'inscrire à la loterie`}</p>
            <p className="mt-2">
              <Login />
            </p>
          </div>
        </div>

        <div className="h-auto w-[330px] sm:w-[450px] sm:h-[200px] bg-[#8080801a] flex m-auto flex-col sm:flex-row items-center justify-center p-6 rounded-lg mt-8">
          <div className="font-bold text-9xl">02</div>
          <div className="sm:w-[250px] sm:ml-4">
            <h1 className="text-4xl font-bold">Langue</h1>
            <p className="mt-2 text-sm">Selectionne ta langue</p>
            <select className="w-full mt-2 bg-[#6441a5] pl-4 pr-4 h-[40px] rounded-lg cursor-pointer">
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="ko">한국어</option>
            </select>
          </div>
        </div>

        <div className="h-auto w-[330px] sm:w-[450px] sm:h-[200px] bg-[#8080801a] flex m-auto flex-col sm:flex-row items-center justify-center p-6 rounded-lg mt-8">
          <div className="font-bold text-9xl">03</div>
          <div className="sm:w-[250px] sm:ml-4">
            <h1 className="text-4xl font-bold">Soumettre</h1>
            <p className="mt-2 text-sm">Tirage au sort toutes les heures !</p>
            <button
              onClick={handleSubmitParticipate}
              className="w-full mt-2 pl-4 pr-4 h-[40px] rounded-lg cursor-pointer bg-[#6441a5]"
            >
              Soumettre
            </button>
          </div>
        </div>
        {<p className="text-2xl font-bold text-red-600">{error}</p>}
      </div>
    </div>
  );
}
