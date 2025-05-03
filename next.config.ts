import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "pbs.twimg.com"], 
  },
  webpack(config, { isServer }) {
    config.experiments = { 
      asyncWebAssembly: true,
      layers: true,
    };
    if (!isServer) {
    }
    return config;
  },
};

export default nextConfig;
