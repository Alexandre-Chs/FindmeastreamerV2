"use client";

import Login from "@/components/Login";
import React from "react";
import { useApiContext } from "@/context/ApiProvider";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContentParticipate = () => {
  const { user } = useApiContext();
  const [error, setError] = useState("");
  const [langSelected, setLangSelected] = useState<string>("fr");
  const t = useTranslations("Participate");
  const [isParticipating, setisParticipating] = useState<boolean>();

  const handleSubmitParticipate = async () => {
    if (!user) {
      setError("You must login first");
    } else {
      fetch(`/api/postParticipants`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: user.user, lang: langSelected }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success === true) {
            toast.success(t("successSubmit") + " " + user.user.login);
            setisParticipating(true);
          } else {
            toast.error(t("errorSubmit"));
          }
        });
    }
  };

  useEffect(() => {
    if (user) {
      fetch(`/api/ifParticipating?user=${user.user.login}`, {
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => setisParticipating(data.success));
    }
  }, [user]);

  const handleDeleteParticipation = () => {
    if (user && user.user && user.user.login) {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `${process.env.NEXT_PUBLIC_PW}`);

      fetch(`/api/deleteParticipation?user=${user.user.login}`, {
        method: "DELETE",
        headers: headers,
      }).then((res) => {
        if (res.ok) {
          console.log("Delete user from backend");
          toast.warning(t("deleteFromBackend"));
          setisParticipating(false);
        } else {
          console.log("Error with delete user in backend");
        }
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLangSelected(e.target.value);
  };

  return (
    <div className="mb-10">
      <ToastContainer />
      <div className="flex items-center justify-center mx-8 mt-8 text-center">
        <h1 className="max-w-5xl text-lg tracking-normal sm:text-3xl">
          {t("titleParticipation1")}{" "}
          <span className="text-[#6441a5]">{t("titleParticipation2")}</span>
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center mx-8 mt-8 mb-10 text-left">
        <p className="max-w-5xl text-sm font-light tracking-normal sm:text-lg">
          {t("explain1")}
        </p>
        <p className="max-w-5xl mt-2 text-sm font-light tracking-normal sm:mt-4 sm:text-lg">
          {t("explain2")}
        </p>
      </div>
      <div className="flex flex-col items-start justify-center max-w-md m-auto mt-8">
        <div className="h-auto w-[330px] sm:w-[450px] sm:h-[200px] bg-[#8080801a] flex m-auto flex-col sm:flex-row items-center justify-center p-6 rounded-lg">
          <div className="font-bold text-9xl">01</div>
          <div className="sm:w-[250px] sm:ml-4">
            <h1 className="text-4xl font-bold">{t("connexion")}</h1>
            <p className="mt-2 text-sm">{t("ConnexionText")}</p>
            <p className="mt-2">
              <Login />
            </p>
          </div>
        </div>

        <div className="h-auto w-[330px] sm:w-[450px] sm:h-[200px] bg-[#8080801a] flex m-auto flex-col sm:flex-row items-center justify-center p-6 rounded-lg mt-8">
          <div className="font-bold text-9xl">02</div>
          <div className="sm:w-[250px] sm:ml-4">
            <h1 className="text-4xl font-bold">{t("lang")}</h1>
            <p className="mt-2 text-sm">{t("selectLang")}</p>
            <select
              className="w-full mt-2 bg-[#6441a5] pl-4 pr-4 h-[40px] rounded-lg cursor-pointer"
              onChange={handleChange}
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="ko">한국어</option>
            </select>
          </div>
        </div>

        <div className="h-auto w-[330px] sm:w-[450px] sm:h-[200px] bg-[#8080801a] flex m-auto flex-col sm:flex-row items-center justify-center p-6 rounded-lg mt-8">
          <div className="font-bold text-9xl">03</div>
          <div className="sm:w-[250px] sm:ml-4">
            <h1 className="text-4xl font-bold">{t("submit")}</h1>
            <p className="mt-2 text-sm">{t("lotteryRules")}</p>

            {!isParticipating ? (
              <button
                onClick={handleSubmitParticipate}
                className="w-full mt-2 pl-4 pr-4 h-[40px] rounded-lg cursor-pointer bg-[#6441a5]  hover:bg-[#7847d3]"
              >
                {t("submit")}
              </button>
            ) : (
              <button
                onClick={handleDeleteParticipation}
                className="w-full mt-2 pl-4 pr-4 h-[40px] rounded-lg cursor-pointer bg-[#c0291e]  hover:bg-[#da3125]"
              >
                Quitter la loterie
              </button>
            )}
          </div>
        </div>
        {<p className="text-2xl font-bold text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default ContentParticipate;
