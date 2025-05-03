import { useState, useEffect, useRef } from 'react';
import ExitModal from './ExitModal';

// Configuração do rastreador
const TRACKING_CONFIG = {
  // Intervalo de registro periódico (1 minuto para testes)
  INTERVAL_MS: 1 * 60 * 1000,
  // Número máximo de tentativas para cada requisição
  MAX_RETRIES: 3,
  // Tempo base para backoff exponencial (em ms)
  BACKOFF_BASE_MS: 2000,
  // Flag para habilitar/desabilitar todo o rastreamento
  ENABLED: true,
  // Flag para habilitar logs de depuração
  DEBUG: true
};

// Função para obter a URL base da API de forma que funcione em dev (proxy) e em build estático
const getApiBaseUrl = (): string => {
  // 1) Quando executando no browser em localhost, sempre usar o proxy `/api`
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
      if (TRACKING_CONFIG.DEBUG) console.log('API Base URL (dev proxy): /api');
      return '/api';
    }
  }

  // 2) Caso exista variável de ambiente, usar (útil em produção e em SSR)
  const envUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (envUrl && envUrl.trim() !== '') {
    if (TRACKING_CONFIG.DEBUG) console.log('API Base URL (env):', envUrl);
    return envUrl;
  }

  // 3) Fallback padrão para produção
  const prodUrl = 'https://api.hera-i.com.br';
  if (TRACKING_CONFIG.DEBUG) console.log('API Base URL (fallback prod):', prodUrl);
  return prodUrl;
};

// Função para fazer requisições com retry e backoff exponencial
const fetchWithRetry = async (
  url: string,
  options: RequestInit,
  retries = TRACKING_CONFIG.MAX_RETRIES
): Promise<Response | null> => {
  try {
    if (TRACKING_CONFIG.DEBUG) {
      console.log(`Tentando fetch para ${url}`, options);
    }
    
    const response = await fetch(url, options);
    
    if (TRACKING_CONFIG.DEBUG) {
      console.log(`Resposta do fetch: ${response.status} ${response.statusText}`);
    }
    
    if (!response.ok && retries > 0) {
      // Calcular tempo de espera com backoff exponencial
      const backoffTime = TRACKING_CONFIG.BACKOFF_BASE_MS * Math.pow(2, TRACKING_CONFIG.MAX_RETRIES - retries);
      
      if (TRACKING_CONFIG.DEBUG) {
        console.log(`Retry ${TRACKING_CONFIG.MAX_RETRIES - retries + 1} for ${url} after ${backoffTime}ms`);
      }
      
      // Esperar antes de tentar novamente
      await new Promise(resolve => setTimeout(resolve, backoffTime));
      return fetchWithRetry(url, options, retries - 1);
    }
    return response;
  } catch (error) {
    if (TRACKING_CONFIG.DEBUG) {
      console.error('Erro no fetch:', error);
    }
    
    if (retries > 0) {
      // Calcular tempo de espera com backoff exponencial
      const backoffTime = TRACKING_CONFIG.BACKOFF_BASE_MS * Math.pow(2, TRACKING_CONFIG.MAX_RETRIES - retries);
      
      if (TRACKING_CONFIG.DEBUG) {
        console.log(`Network error, retry ${TRACKING_CONFIG.MAX_RETRIES - retries + 1} for ${url} after ${backoffTime}ms`);
      }
      
      // Esperar antes de tentar novamente
      await new Promise(resolve => setTimeout(resolve, backoffTime));
      return fetchWithRetry(url, options, retries - 1);
    }
    
    if (TRACKING_CONFIG.DEBUG) {
      console.error('Fetch failed after retries:', error);
    }
    return null;
  }
};

const VisitTracker: React.FC = () => {
  const [trackingEnabled] = useState(TRACKING_CONFIG.ENABLED);
  const [visitStartTime, setVisitStartTime] = useState<Date | null>(null);
  const [showExitModal, setShowExitModal] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const lastTrackedTimeRef = useRef<number>(0);
  const isRegisteringRef = useRef<boolean>(false);
  const deviceIdRef = useRef<string>('');
  const hasInitializedRef = useRef<boolean>(false);

  useEffect(() => {
    // Evitar inicialização múltipla
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;
    
    if (TRACKING_CONFIG.DEBUG) {
      console.log('Inicializando VisitTracker');
    }
    
    try {
      // Gerar ou recuperar ID de dispositivo
      const storedDeviceId = localStorage.getItem('deviceId') || crypto.randomUUID();
      localStorage.setItem('deviceId', storedDeviceId);
      deviceIdRef.current = storedDeviceId;
      
      // Registrar início da visita
      const startTime = new Date();
      setVisitStartTime(startTime);
      
      if (TRACKING_CONFIG.DEBUG) {
        console.log('Visita iniciada:', startTime);
      }
    } catch (error) {
      if (TRACKING_CONFIG.DEBUG) {
        console.error('Erro ao inicializar VisitTracker:', error);
      }
    }
  }, []); // Dependência vazia para executar apenas uma vez
  
  useEffect(() => {
    if (!visitStartTime || !deviceIdRef.current) return;
    
    // Função para registrar visita
    const registerVisit = async () => {
      // Evitar múltiplas chamadas simultâneas
      if (isRegisteringRef.current) return;
      isRegisteringRef.current = true;
      
      try {
        // Dados que serão enviados
        const visitData = {
          device_id: deviceIdRef.current,
          timestamp: visitStartTime.toISOString(),
          user_agent: navigator.userAgent,
          referrer: document.referrer || 'direct'
        };
        
        const apiUrl = `${getApiBaseUrl()}/visit/register`;
        
        if (TRACKING_CONFIG.DEBUG) {
          console.log('Registrando visita:', apiUrl, visitData);
        }
        
        await fetchWithRetry(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          mode: 'cors',
          credentials: 'include',
          body: JSON.stringify(visitData)
        });
      } catch (error) {
        if (TRACKING_CONFIG.DEBUG) {
          console.error('Erro ao registrar visita:', error);
        }
      } finally {
        isRegisteringRef.current = false;
      }
    };
    
    // Registrar visita inicial
    registerVisit();
    
    // Função para registrar o tempo de permanência
    const registerTimeSpent = async () => {
      if (!visitStartTime || isRegisteringRef.current) return;
      
      // Verificar se passou tempo suficiente desde o último registro
      const now = Date.now();
      if (now - lastTrackedTimeRef.current < 60000) { // Mínimo de 1 minuto entre registros
        return;
      }
      
      isRegisteringRef.current = true;
      lastTrackedTimeRef.current = now;
      
      try {
        const endTime = new Date();
        const timeSpentMs = endTime.getTime() - visitStartTime.getTime();
        const timeSpentSeconds = Math.floor(timeSpentMs / 1000);
        
        if (TRACKING_CONFIG.DEBUG) {
          console.log(`Registrando tempo periódico: ${timeSpentSeconds} segundos`);
        }
        
        // Dados que serão enviados
        const timeData = {
          device_id: deviceIdRef.current,
          time_spent_seconds: timeSpentSeconds,
          timestamp: endTime.toISOString()
        };
        
        const apiUrl = `${getApiBaseUrl()}/visit/time`;
        
        if (TRACKING_CONFIG.DEBUG) {
          console.log('Registrando tempo:', apiUrl, timeData);
        }
        
        await fetchWithRetry(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          mode: 'cors',
          credentials: 'include',
          body: JSON.stringify(timeData)
        });
      } catch (error) {
        if (TRACKING_CONFIG.DEBUG) {
          console.error('Erro ao registrar tempo:', error);
        }
      } finally {
        isRegisteringRef.current = false;
      }
    };

    // Registrar eventos para detectar saída
    const handleBeforeUnload = () => {
      if (TRACKING_CONFIG.DEBUG) {
        console.log('Evento beforeunload/pagehide detectado');
      }
      
      // Usar sendBeacon se disponível para maior confiabilidade
      if (navigator.sendBeacon && visitStartTime) {
        const endTime = new Date();
        const timeSpentMs = endTime.getTime() - visitStartTime.getTime();
        const timeSpentSeconds = Math.floor(timeSpentMs / 1000);
        
        if (TRACKING_CONFIG.DEBUG) {
          console.log(`Registrando tempo na saída: ${timeSpentSeconds} segundos`);
        }
        
        const timeData = {
          device_id: deviceIdRef.current,
          time_spent_seconds: timeSpentSeconds,
          timestamp: endTime.toISOString()
        };
        
        const apiUrl = `${window.location.origin}${getApiBaseUrl()}/visit/time`;
        
        if (TRACKING_CONFIG.DEBUG) {
          console.log('Enviando beacon:', apiUrl, timeData);
        }
        
        navigator.sendBeacon(apiUrl, JSON.stringify(timeData));
      } else {
        registerTimeSpent();
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handleBeforeUnload); // Para iOS
    
    // Registrar periodicamente com intervalo maior
    const intervalId = setInterval(() => {
      if (TRACKING_CONFIG.DEBUG) {
        console.log('Intervalo periódico de registro de tempo');
      }
      registerTimeSpent();
    }, TRACKING_CONFIG.INTERVAL_MS); // A cada 5 minutos
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handleBeforeUnload);
      clearInterval(intervalId);
      registerTimeSpent(); // Registrar ao desmontar o componente
    };
  }, [visitStartTime]); // Dependência apenas do visitStartTime
  
  useEffect(() => {
    if (!hasInteracted || !TRACKING_CONFIG.ENABLED) return;
    
    // Função para verificar se o usuário optou por não ver a modal novamente
    const checkDontShowExitModal = () => {
      return localStorage.getItem('dontShowExitModal') === 'true';
    };
    
    // Se o usuário optou por não ver a modal, não adicionar o listener
    if (checkDontShowExitModal()) return;
    
    const handleMouseLeave = (e: MouseEvent) => {
      // Verificar novamente se o usuário optou por não ver a modal
      if (checkDontShowExitModal()) return;
      
      // Detectar quando o mouse sai pela parte superior da página
      if (e.clientY <= 0) {
        if (TRACKING_CONFIG.DEBUG) {
          console.log('Mouse saiu pela parte superior da página, mostrando modal');
        }
        setShowExitModal(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasInteracted]);

  useEffect(() => {
    if (!TRACKING_CONFIG.ENABLED) return;
    
    const handleInteraction = () => {
      if (!hasInteracted) {
        if (TRACKING_CONFIG.DEBUG) {
          console.log('Primeira interação do usuário detectada');
        }
        setHasInteracted(true);
      }
    };

    // Eventos que indicam interação do usuário
    document.addEventListener('click', handleInteraction);
    document.addEventListener('scroll', handleInteraction);
    
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };
  }, [hasInteracted]);

  if (!trackingEnabled) {
    return null;
  }

  return (
    <>
      <ExitModal 
        isOpen={showExitModal} 
        onClose={() => setShowExitModal(false)} 
      />
    </>
  );
};

export default VisitTracker;