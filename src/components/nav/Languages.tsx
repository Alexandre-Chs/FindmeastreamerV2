"use client";
import { languages } from "@/utils/language";
import React, { useState, useEffect } from "react";
import { BsGlobe } from "react-icons/bs";
import Link from "next-intl/link";
import { textLang } from "@/utils/language";
const Languages = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<string>("");
  const handleClick = () => {
    setIsOpen((curr) => !curr);
  };

  useEffect(() => {
    const url = decodeURIComponent(window.location.href);
    const parts = url.split("/");
    const language = languages.find((lang) => parts.includes(lang)) || "en";
    const stringLang = textLang(language);
    setLang(stringLang);
  }, []);

  return (
    <div className="pr-6">
      <div
        onClick={handleClick}
        className="relative flex items-center justify-center hover:bg-[#8080801a] p-2 rounded-lg cursor-pointer"
      >
        <BsGlobe size="1.5rem" />
        <span className="pl-2">{lang}</span>
        {isOpen ? (
          <div className="absolute left-5 flex flex-col items-center justify-center w-auto h-auto pt-4 pb-4 border-slate-800 border top-14 bg-[#6441a5] rounded-lg">
            <Link
              href="/"
              locale="fr"
              className="hover:bg-[#7f5fb95c] w-full pl-2 pr-2"
            >
              Français
            </Link>
            <Link
              href="/"
              locale="en"
              className="hover:bg-[#7f5fb95c] w-full pl-2 pr-2"
            >
              Anglais
            </Link>
            <Link
              href="/"
              locale="es"
              className="hover:bg-[#7f5fb95c] w-full pl-2 pr-2"
            >
              Español
            </Link>
            <Link
              href="/"
              locale="kr"
              className="hover:bg-[#7f5fb95c] w-full pl-2 pr-2"
            >
              한국어
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Languages;
