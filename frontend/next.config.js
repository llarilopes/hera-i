const path = require('path');
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');

/**
 * @param {string} phase Fase em que o Next.js está rodando
 * @returns {import('next').NextConfig}
 */
module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const isProdBuild = phase === PHASE_PRODUCTION_BUILD;

  return {
    // Só gera export estático durante o build de produção
    output: isProdBuild ? 'export' : undefined,
    images: {
      unoptimized: true,
    },
    webpack: (config) => {
      config.resolve.alias['@'] = path.resolve(__dirname, 'src');
      return config;
    },
    reactStrictMode: true,
  };
};
