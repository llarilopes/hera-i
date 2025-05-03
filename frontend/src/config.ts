// Centraliza URL da API em runtime com base no hostname
export const API_BASE_URL = (() => {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
      return '/api';
    }
  }
  return 'https://api.hera-i.com.br';
})();
