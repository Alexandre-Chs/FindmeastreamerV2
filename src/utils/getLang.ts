import { languages } from "./language";

export const getLang = () => {
  if (typeof document !== "undefined") {
    const url = window.location.pathname;
    const pathUrl = url.split("/");
    const lang = languages;
    const langUrl = lang.find((element) => pathUrl.includes(element)) || "en";
    return langUrl;
  }
};
