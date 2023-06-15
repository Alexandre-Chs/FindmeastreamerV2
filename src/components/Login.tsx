"use client";

import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useApiContext } from "@/context/ApiProvider";

const Login = () => {
  const t = useTranslations("Home");
  const { getAccessToken, user } = useApiContext();
  const handleAPI = async () => {
    await fetch("http://localhost:3000/api/apiCode")
      .then((res) => res.json())
      .then((data) => (window.location.href = data.message));
  };

  useEffect(() => {
    getAccessToken();
  }, [getAccessToken, user]);

  return (
    <a
      className="bg-[#6441a5] w-auto  pl-4 pr-4 h-[40px] flex items-center justify-center rounded-lg cursor-pointer hover:bg-[#7847d3]"
      onClick={handleAPI}
    >
      {user ? <span>{user.user.display_name}</span> : t("login")}
    </a>
  );
};

export default Login;
