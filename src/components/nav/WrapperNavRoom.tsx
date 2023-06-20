import React from "react";
import Languages from "./Languages";
import { typePageProps } from "@/types/pageType";
import LotteryManager from "@/app/[locale]/room/LotteryManager";
import Login from "../Login";

const WrapperNavRoom = ({ page }: typePageProps) => {
  return (
    <header className="flex flex-col items-center justify-between w-full gap-2 px-2 mt-5 border-b border-gray-700 sm:flex-row text-bold sm:px-4 pb-7">
      <a href="/">Findmeastreamer</a>
      <nav className="flex items-center justify-center">
        <Login />
        <LotteryManager />
        <Languages page={page} />
      </nav>
    </header>
  );
};

export default WrapperNavRoom;
