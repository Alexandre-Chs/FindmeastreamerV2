"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Modal from "react-modal";
import Login from "@/components/Login";

Modal.setAppElement("body");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const LotteryManager = () => {
  const t = useTranslations("Room");

  return (
    <div className="mr-4 bg-[#6441a5] px-4 py-2 w-auto align-center justify-center flex rounded-lg hover:bg-[#764ec2] cursor-pointer">
      <button>
        <a href="/participate">{t("participation")}</a>
      </button>
    </div>
  );
};

export default LotteryManager;
