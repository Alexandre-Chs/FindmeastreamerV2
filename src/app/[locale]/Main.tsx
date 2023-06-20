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
          <button
            type="button"
            className="text-white bg-[#6441a5] hover:bg-[#6a26e7] shadow-lg shadow-[#513783] focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <a href="/room">{t("getStarted")}</a>
            <svg
              aria-hidden="true"
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
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
