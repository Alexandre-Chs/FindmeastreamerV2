"use client";

import React, { useEffect } from "react";
import { useTranslations } from "next-intl";

const Login = () => {
  const t = useTranslations("Home");
  const handleAPI = async () => {
    await fetch("http://localhost:3000/api/apiCode")
      .then((res) => res.json())
      .then((data) => (window.location.href = data.message));
  };

  // useEffect(() => {
  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const codeAPI = urlParams.get("code");
  //   if (codeAPI) {
  //     const postData = async () => {
  //       try {
  //         const response = await fetch("http://localhost:3000/api/apiCode", {
  //           method: "POST",
  //           body: JSON.stringify({ code: codeAPI }),
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         });
  //         if (response.ok) {
  //           const data = await response.json();
  //           if (data.data.access_token) {
  //             const getUser = await fetch("http://localhost:3000/api/getUser", {
  //               headers: {
  //                 Authorization: `Bearer ${data.data.access_token}`,
  //               },
  //             });
  //             const userData = await getUser.json();
  //             console.log(userData);
  //           }
  //         } else {
  //           console.error("Error from post get token");
  //         }
  //       } catch (error) {
  //         console.error("error post token" + error);
  //       }
  //     };
  //     postData();
  //   }
  // }, []);

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
