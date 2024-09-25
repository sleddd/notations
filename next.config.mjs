/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        WP_GQL_URL: process.env.WP_GQL_URL,
    }
};

export default nextConfig;
