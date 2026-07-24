/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
  ],

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "techsoftwebsolutions.com",
        pathname: "/techsoft/demo/ayurvedamana/public/uploads/**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/proxy/:path*",
        destination: "https://www.techsoftwebsolutions.com/techsoft/demo/ayurvedamana/public/api/:path*",
      },
    ];
  },
};

export default nextConfig;