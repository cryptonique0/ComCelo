/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  experimental: {
    typedRoutes: true
  },
  webpack: (config, { isServer }) => {
    // Ignore optional peer dependencies that aren't installed
    config.resolve.fallback = {
      ...config.resolve.fallback,
      '@gemini-wallet/core': false,
    };
    
    config.ignoreWarnings = [
      { module: /node_modules\/@wagmi\/connectors/ },
    ];
    
    return config;
  }
};

export default nextConfig;
