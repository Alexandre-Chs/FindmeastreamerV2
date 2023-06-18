export const getParentTwitchChat = () => {
  if (process.env.NODE_ENV === "production") {
    return "findmeastreamer";
  } else {
    return "localhost";
  }
};
