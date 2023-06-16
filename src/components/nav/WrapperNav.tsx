import React from "react";
import Login from "../Login";
import Languages from "./Languages";

const WrapperNav = () => {
  return (
    <header className="flex flex-col items-center justify-between w-full gap-2 px-2 mt-5 border-b border-gray-700 sm:flex-row text-bold sm:px-4 pb-7">
      <div>Findmeastreamer</div>
      <nav className="flex items-center justify-center">
        <Languages />
      </nav>
    </header>
  );
};

export default WrapperNav;
