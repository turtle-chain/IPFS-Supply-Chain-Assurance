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
          background: "8fb996",
          primary: "#beffc7",
          secondary: "#a7c4b5",
        },
      },
      fontSize: {
        xxs: ["0.5rem", "0.75rem"],
        h1: ["2rem", "3rem"],
        h2: ["1.375rem", "2.0625rem"],
        h3: ["1rem", "1.5625rem"],
        h4: ["0.75rem", "1.125rem"],
        h5: ["0.625rem", "1rem"],
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
