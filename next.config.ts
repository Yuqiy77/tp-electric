import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // 忽略构建时 ESLint 错误
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 忽略 TypeScript 检查
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
