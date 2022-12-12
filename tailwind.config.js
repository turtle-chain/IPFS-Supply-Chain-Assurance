/** @type {import('tailwindcss').Config} */

/** @typedef { import('tailwindcss/defaultConfig') } DefaultConfig */
/** @typedef { import('tailwindcss/defaultTheme') } DefaultTheme */

/** @type { DefaultConfig & { theme: { extend: DefaultTheme } } } */
module.exports = {
  // content: [],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        15: "3.75rem",
      },
      height: {
        15: "3.75rem",
      },
      colors: {
        custom: {
          secondary: "#02c39a",
          primary: "#00a896",
          danger: "#d84654",
          alert: "#f99c39",
          back: "#a7c4b5",
          success: "#4f9d69",
          light: "#cbf3f0",
          dark: "#028090",
          darker: "#05668d",
        },
      },
      fontSize: {
        xxs: ["0.5rem", "0.75rem"],
        h1: ["2rem", "3rem"],
        h2: ["1.5rem", "2.0625rem"],
        h3: ["1.1rem", "1.5625rem"],
        h4: ["0.85em", "1.125rem"],
        h5: ["0.7rem", "1rem"],
        p: ["1rem", "1rem"],
        "10xl": ["3.375rem", "5.0625rem"],
      },
    },
  },
  variants: {
    extend: {
      fill: ["hover"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
