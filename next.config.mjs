/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NOTATIONS_GQL_URL: process.env.NOTATIONS_GQL_URL,
        ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
        NOTATIONS_SECRET: process.env.NOTATIONS_SECRET
    }
};

export default nextConfig;
