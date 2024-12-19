/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        domains: ["image.tmdb.org", "rb.gy"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "image.tmdb.org",
                pathname: "/t/p/**",
            },
        ],
    },
    transpilePackages: ["@stripe/firestore-stripe-payments"],
};

module.exports = nextConfig;
