import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages configuration - uncomment for deployment
  // output: "export",
  // basePath: "/RankedHonor",
  // assetPrefix: "/RankedHonor",
  images: {
    // Unoptimized for static export - images will be pre-processed before build
    unoptimized: true,
    // Remote patterns for external images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.cloudflare.com',
      },
    ],
  },
};

export default nextConfig;
