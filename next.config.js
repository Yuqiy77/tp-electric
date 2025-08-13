/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  // For Next.js 15, ensure Pages Router works properly
  trailingSlash: false,
};
module.exports = nextConfig;
