export const languages = ["en", "fr", "es", "ko"];

export const textLang = (lang: string) => {
  switch (lang) {
    case "fr":
      return "Français";
    case "es":
      return "Español";
    case "ko":
      return "한국어";
    default:
      return "English";
  }
};
