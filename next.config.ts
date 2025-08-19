import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    domains: ['menyou-svc-gw.darkube.app'],
  },
  trailingSlash: true,
};

export default nextConfig;


