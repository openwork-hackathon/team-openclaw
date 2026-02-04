/** @type {import('next').NextConfig} */
const nextConfig = {
  // Workaround for upstream type errors in third-party deps (e.g. ox TS sources)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
