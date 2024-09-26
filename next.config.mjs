/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        WP_GQL_URL: process.env.WP_GQL_URL,
        ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
    }
};

export default nextConfig;
