import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // 静的エクスポートではImage Optimizationを無効化
  },
};

export default nextConfig;
