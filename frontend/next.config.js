const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',  // Isso vai gerar a pasta 'out'
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
  reactStrictMode: true,
};
