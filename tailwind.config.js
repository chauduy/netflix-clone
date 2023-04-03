/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
        fontFamily: {
            roboto: ["Roboto", "sans-serif"],
        },
    },
    plugins: [
        require("tailwindcss-textshadow"),
        require("tailwind-scrollbar-hide"),
    ],
};
