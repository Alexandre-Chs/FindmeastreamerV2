/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PARENT_TWITCH_CHAT: "localhost",
  },
};
const withNextIntl = require("next-intl/plugin")(
  // This is the default (also the `src` folder is supported out of the box)
  "./i18n.ts"
);
module.exports = withNextIntl(nextConfig);
