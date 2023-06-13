"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { getCodeAPI } from "@/app/[locale]/api/routes";
const Login = () => {
  const t = useTranslations("Home");

  const handleAPI = async () => {
    const response = await getCodeAPI();
    console.log(response);
  };

  return (
    <a
      className="bg-[#6441a5] w-auto  pl-4 pr-4 h-[40px] flex items-center justify-center rounded-lg cursor-pointer hover:bg-[#7847d3]"
      onClick={handleAPI}
    >
      {t("login")}
    </a>
  );
};

export default Login;
