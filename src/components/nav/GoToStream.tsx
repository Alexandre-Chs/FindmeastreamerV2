import React from "react";
import { useTranslations } from "next-intl";

const GoToStream = () => {
  const t = useTranslations("Home");
  return (
    <div className="mr-4 bg-[#6441a5] px-4 py-2 w-auto align-center justify-center flex rounded-lg hover:bg-[#764ec2] cursor-pointer">
      <button>
        <a href="/room">{t("getStarted")}</a>
      </button>
    </div>
  );
};

export default GoToStream;
