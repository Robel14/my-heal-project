/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  async redirects() {
    return [
      {
        source: '/admin',
        destination: 'https://ethiopia-vitality-admin.vercel.app',
        permanent: false, // use true if you're never changing this
      },
    ];
  },
};

export default nextConfig;
