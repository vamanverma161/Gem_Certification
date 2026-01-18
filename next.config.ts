import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Cache busting - last updated 2024-01-15
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
