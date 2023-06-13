export const languages = ["en", "fr", "es", "kr"];

export const textLang = (lang: string) => {
  switch (lang) {
    case "fr":
      return "Français";
    case "es":
      return "Español";
    case "kr":
      return "한국어";
    default:
      return "English";
  }
};
