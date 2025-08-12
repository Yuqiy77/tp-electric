/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 构建时忽略 ESLint
  },
  typescript: {
    ignoreBuildErrors: true, // 构建时忽略 TS 错误
  },
};

module.exports = nextConfig;
