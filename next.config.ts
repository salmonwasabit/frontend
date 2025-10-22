import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Remove rewrites since we're using direct localhost URLs
};

export default nextConfig;
