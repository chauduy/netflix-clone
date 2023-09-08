/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        domains: ["image.tmdb.org", "rb.gy"],
    },
    transpilePackages: ["@stripe/firestore-stripe-payments"],
};

module.exports = nextConfig;
