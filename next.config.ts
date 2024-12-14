import { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Add custom rules for SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    // Always return the modified config
    return config;
  },
};

export default nextConfig;
