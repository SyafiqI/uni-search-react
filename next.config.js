/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: process.env.BUILD_STANDALONE == "true" ? "standalone" : undefined,
};

module.exports = nextConfig;
