module.exports = {
  swcMinify: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false, stream: false, constants: false };

    return config;
  },
  images: {
    minimumCacheTTL: 31536000,
    deviceSizes: [420, 768, 1024, 1200],
    iconSizes: [],
    domains: [],
    path: '/_next/image',
    loader: 'default'
  }
}
