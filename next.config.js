/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // No basePath or assetPrefix needed for username.github.io root deployment
};

module.exports = nextConfig;
