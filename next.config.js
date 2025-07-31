/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // 忽略构建时 ESLint 错误
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 忽略 TypeScript 类型错误
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
