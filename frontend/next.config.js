const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
  // Configurações experimentais
  experimental: {
    // Manter swcMinify desativado, mas dentro de experimental
    swcMinify: false
  },
  reactStrictMode: true,
};
