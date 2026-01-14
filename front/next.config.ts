import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow images from public directory
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
