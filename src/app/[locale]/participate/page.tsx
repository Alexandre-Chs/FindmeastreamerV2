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
      <div className="max-w-xs m-auto flex items-start justify-center flex-col">
        <div className="flex items-center justify-between w-full">
          <p className="text-9xl">1.</p>
          <p>
            Connecte toi : <Login />
          </p>
        </div>
        <div className="flex items-center justify-center">
          <p className="text-9xl">2.</p>
          <p>Selectionne la langue que tu parles :</p>
          <select className="text-black">
            <option value="fr">Français</option>
            <option value="en">Anglais</option>
            <option value="ko">Coréen</option>
            <option value="es">Espagnol</option>
          </select>
        </div>
        <div className="flex items-center justify-center">
          <p className="text-9xl">3.</p>
          <button onClick={handleSubmitParticipate}>Soumettre</button>
        </div>
        {<p className="text-2xl font-bold text-red-600">{error}</p>}
      </div>
    </div>
  );
}
