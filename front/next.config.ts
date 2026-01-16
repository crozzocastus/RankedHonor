import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/RankedHonor",
  assetPrefix: "/RankedHonor",
  images: {
    // Unoptimized for static export - images will be pre-processed before build
    unoptimized: true,
  },
};

export default nextConfig;
