const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // <- ISSO FAZ O Next EXPORTAR COMO SITE ESTÁTICO!
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

module.exports = nextConfig;
