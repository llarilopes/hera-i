const path = require('path');

module.exports = {
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NODE_ENV === 'production'
      ? 'https://api.hera-i.com.br'
      : 'http://localhost:8000',
  },
  output: 'export',
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};
