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
  const [modalIsOpen, setIsOpen] = useState<boolean>();

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="mr-4 bg-[#6441a5] px-4 py-2 w-auto align-center justify-center flex rounded-lg hover:bg-[#764ec2] cursor-pointer">
      <button onClick={openModal}>{t("participation")}</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      ></Modal>
    </div>
  );
};

export default LotteryManager;
