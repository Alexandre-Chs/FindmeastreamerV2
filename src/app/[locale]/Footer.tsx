import React from "react";
import { FiGithub } from "react-icons/fi";
import { FiTwitter } from "react-icons/fi";
import { useTranslations } from "next-intl";
const Footer = () => {
  const t = useTranslations("Home");
  return (
    <footer className="flex flex-col items-center justify-between w-full px-3 pt-4 mt-8 text-center sm:h-20 sm:pt-2 sm:flex-row sm:mb-0">
      <div className="text-gray-500">{t("copyright")}</div>
      <div className="text-gray-500">
        {t("createdBy")}
        <span className="font-bold">AlexandreChs</span>
      </div>
      <div className="text-gray-500 flex w-[40px] justify-between items-center">
        <a href="https://twitter.com/AlexandreChsDev" target="blank">
          <FiGithub />
        </a>
        <a href="https://github.com/Alexandre-Chs" target="blank">
          <FiTwitter />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
