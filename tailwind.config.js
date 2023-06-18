/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // using ./src/ dir
    "./src/**/*.{js,ts,jsx,tsx}",
    // using ./ dir
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // add more paths here
  ],
  theme: {
    extend: {
      animation: {
        text: "text 3s ease infinite",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
    },
    screens: {
      xs: "330px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [],
};
