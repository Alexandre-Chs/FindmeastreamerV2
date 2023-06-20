"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useApiContext } from "@/context/ApiProvider";

const Login = () => {
  const t = useTranslations("Home");
  const { getAccessToken, user } = useApiContext();

  const [login, setLogin] = useState();

  const handleAPI = async () => {
    await fetch("http://localhost:3000/api/apiCode")
      .then((res) => res.json())
      .then((data) => (window.location.href = data.message));
  };

  const storedUser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const expirationTime = localStorage.getItem("expirationTime");
    if (expirationTime && storedUser) {
      const currentTime = new Date().getTime();
      if (parseInt(expirationTime) < currentTime) {
        // Les informations de l'utilisateur ont expiré, supprimez-les du localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("expirationTime");
      } else {
        // Les informations de l'utilisateur sont valides, utilisez-les
        setLogin({
          login: storedUser.login,
          display_name: storedUser.display_name,
        });
        getAccessToken();
        return;
      }
    }

    // Si les informations de l'utilisateur ne sont pas présentes ou expirées, appelez getAccessToken
    getAccessToken();
  }, [getAccessToken, storedUser]);

  useEffect(() => {
    if (user) {
      const expirationTime = new Date().getTime() + 8 * 60 * 60 * 1000;
      const userData = {
        login: user.user.login,
        display_name: user.user.display_name,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("expirationTime", expirationTime.toString());
    }
  }, [storedUser, getAccessToken, user]);

  return (
    <a
      className="bg-[#6441a5] w-auto  mr-4 pl-4 pr-4 h-[40px] flex items-center justify-center rounded-lg cursor-pointer hover:bg-[#7847d3]"
      onClick={handleAPI}
    >
      {login ? <span>{login.display_name}</span> : t("login")}
    </a>
  );
};

export default Login;
