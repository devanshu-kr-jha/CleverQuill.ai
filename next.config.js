/** @type {import('next').NextConfig} */
module.exports = {
    images: {
      domains: ['img.clerk.com'],
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    }
  };
