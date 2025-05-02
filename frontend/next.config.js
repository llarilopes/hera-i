const path = require('path');

module.exports = {
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
  // Configuração para melhorar o HMR
  webpackDevMiddleware: (config) => {
    // Reduz o número de mensagens no console
    config.stats = 'minimal';
    return config;
  },
  // Desativar algumas otimizações que podem causar problemas com HMR
  swcMinify: false,
  reactStrictMode: true,
};
