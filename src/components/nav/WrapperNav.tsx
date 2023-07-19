import React from "react";
import Languages from "./Languages";
import { typePageProps } from "@/types/pageType";
import { useTranslations } from "next-intl";

const WrapperNav = ({ page }: typePageProps) => {
  const t = useTranslations("Home");
  return (
    <header className="flex flex-col items-center justify-between w-full gap-2 px-2 mt-5 border-b border-gray-700 sm:flex-row text-bold sm:px-4 pb-7">
      <a href="/">Findmeastreamer</a>
      <nav className="flex items-center justify-center">
        <button className="text-sm sm:text-base text-black font-bold w-auto h-auto bg-[#ffdd00] px-4 py-2 flex items-center justify-center mr-4 rounded-lg hover:bg-[rgb(252,224,42)]">
          <a href="https://www.buymeacoffee.com/alexandreChs" target="blank">
            {t("support")}
          </a>
        </button>
        <Languages page={page} />
      </nav>
    </header>
  );
};

export default WrapperNav;
