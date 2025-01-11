/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ["menyou-svc-gw.darkube.app"],
  },
  webpack(config) {
    // Add custom rules for SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;
