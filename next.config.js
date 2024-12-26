/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true,
    },
    images: {
        domains: ["image.tmdb.org", "rb.gy", "themoviedb.org"],
    },
    transpilePackages: ["@stripe/firestore-stripe-payments"],
};

module.exports = nextConfig;
