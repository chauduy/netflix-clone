/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            screens: {
                lg: "1025px",
            },
            backgroundImage: {
                "gradient-to-b":
                    "linear-gradient(to bottom,rgba(20,20,20,0) 0,rgba(20,20,20,.15) 15%,rgba(20,20,20,.35) 29%,rgba(20,20,20,.58) 44%,#141414 68%,#141414 100%);",
            },
        },
        fontFamily: {
            netflix: ["NetflixSans"],
        },
    },
    plugins: [
        require("tailwindcss-textshadow"),
        require("tailwind-scrollbar-hide"),
    ],
    safelist: ["scrollbar-hide"],
};
