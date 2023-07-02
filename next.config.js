/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PARENT_TWITCH_CHAT:
      process.env.NODE_ENV === "development"
        ? "localhost"
        : "findmeastreamer.com",
  },
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/api/getWinner",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};
const withNextIntl = require("next-intl/plugin")(
  // This is the default (also the `src` folder is supported out of the box)
  "./i18n.ts"
);
module.exports = withNextIntl(nextConfig);
