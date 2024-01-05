/** @type {import('next').NextConfig} */
module.exports = {
    images: {
      domains: ['img.clerk.com', 'blpfrjsykimhjfprbxts.supabase.co'],
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    }
  };
