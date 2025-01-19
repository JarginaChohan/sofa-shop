import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'], // Add Sanity's CDN domain
  },
};

export default nextConfig;
