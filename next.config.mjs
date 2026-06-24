/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'static.vecteezy.com'
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },

  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
