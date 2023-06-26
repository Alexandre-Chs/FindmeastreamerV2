"use client";

import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useApiContext } from "@/context/ApiProvider";
import { useRouter } from "next-intl/client";

const Login = () => {
  const t = useTranslations("Home");
  const { getAccessToken, user } = useApiContext();
  const router = useRouter();

  const handleAPI = async () => {
    await fetch(`/api/apiCode`)
      .then((res) => res.json())
      .then((data) => {
        const urlRedirect = data.message;
        router.push(urlRedirect);
      });
  };

  useEffect(() => {
    getAccessToken();
  }, [getAccessToken]);

  return (
    <a
      className="bg-[#6441a5] w-full  mr-4 pl-4 pr-4 h-[40px] flex items-center justify-center rounded-lg cursor-pointer hover:bg-[#7847d3]"
      onClick={handleAPI}
    >
      {user ? <span>{user.user.display_name}</span> : t("login")}
    </a>
  );
};

export default Login;
