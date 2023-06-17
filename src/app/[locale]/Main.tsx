import React from "react";
import { useTranslations } from "next-intl";
const Main = () => {
  const t = useTranslations("Home");
  return (
    <main className="flex flex-col items-center justify-center w-full px-4 mx-auto mt-20 text-center">
      <h1 className="max-w-4xl text-5xl font-bold tracking-normal sm:text-7xl">
        {t("title1")}
        <span className="text-[#6441a5] font-bold">{t("title2")}</span>
      </h1>
      <h2 className="relative max-w-xl mt-12 text-base text-gray-500 sm:text-gray-400 xs:text-lg">
        {t("explain")}
      </h2>
      <div className="px-2 py-4 mt-8 border-2 rounded-xl border-slate-800 sm:mt-10 sm:px-4 xs:min-w-[350px] sm:min-w-[600px] items-center justify-center text-center">
        <h3 className="px-4 py-3 text-3xl font-bold">{t("viewers")}</h3>
        <p className="max-w-xl mx-auto text-base font-light text-gray-500 sm:text-gray-400">
          {t("chooseRoom")}
        </p>
        <div className="flex flex-col items-center justify-center gap-2 mt-2 xs:flex-row">
          <a href="/room">Let's discover new streamers ! </a>
        </div>
      </div>
      <div className="px-2 py-4 mt-8 border-2 rounded-xl border-[#6441a5] sm:mt-10 sm:px-4 xs:min-w-[350px] sm:min-w-[600px]">
        <h3 className="px-4 py-3 text-3xl font-bold">{t("streamer")}</h3>
        <p className="max-w-xl mx-auto text-base font-light text-gray-500 sm:text-gray-400">
          {t("lottery")}
        </p>
      </div>
    </main>
  );
};

export default Main;
