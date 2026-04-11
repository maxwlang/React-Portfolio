import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'standalone',
    images: {
        qualities: [75, 80, 95],
    },
};

export default nextConfig;
