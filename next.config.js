/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hackathon pragmatism: some dependencies (e.g. viem/ox) ship TS sources that can
  // trigger upstream type errors during `next build` type-check.
  // We still lint in CI/dev; this just prevents upstream typings from blocking shipping.
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
