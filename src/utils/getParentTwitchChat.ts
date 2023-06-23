export const getParentTwitchChat = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://findmeastreamer.com";
  } else {
    return "https://findmeastreamer.com";
  }
};
