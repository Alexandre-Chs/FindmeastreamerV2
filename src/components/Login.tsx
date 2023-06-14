"use client";

import React from "react";
import { useTranslations } from "next-intl";
const Login = () => {
  const t = useTranslations("Home");

  const handleAPI = async () => {
    await fetch("http://localhost:3000/api/apiCode")
      .then((res) => res.json())
      .then((data) => (window.location.href = data.message));
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
