/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00B37E",
        dark: "#121214",
        card: "#202024",
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
};
