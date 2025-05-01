import { useState, useEffect } from 'react';
import ExitModal from './ExitModal';

const VisitTracker: React.FC = () => {
  const [visitStartTime, setVisitStartTime] = useState<Date | null>(null);
  const [showExitModal, setShowExitModal] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const [exitIntent, setExitIntent] = useState(false);

  // Inicializar rastreamento
  useEffect(() => {
    // Gerar ou recuperar ID de dispositivo
    const storedDeviceId = localStorage.getItem('deviceId') || crypto.randomUUID();
    localStorage.setItem('deviceId', storedDeviceId);
    setDeviceId(storedDeviceId);
    
    // Registrar início da visita
    const startTime = new Date();
    setVisitStartTime(startTime);
    
    // Registrar visita no backend
    // Dados que serão enviados
    const visitData = {
      device_id: storedDeviceId,
      timestamp: startTime.toISOString(),
      user_agent: navigator.userAgent,
      referrer: document.referrer || 'direct'
    };
    
    fetch('http://localhost:8000/visit/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(visitData)
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      // Silenciar erro para não afetar a experiência do usuário
    });

    // Função para registrar o tempo de permanência ao sair
    const registerTimeSpent = () => {
      if (visitStartTime) {
        const endTime = new Date();
        const timeSpentMs = endTime.getTime() - visitStartTime.getTime();
        const timeSpentSeconds = Math.floor(timeSpentMs / 1000);
        
        // Dados que serão enviados
        const timeData = {
          device_id: storedDeviceId,
          time_spent_seconds: timeSpentSeconds,
          timestamp: endTime.toISOString()
        };
        
        fetch('http://localhost:8000/visit/time', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(timeData)
        })
        .then(response => {
          return response;
        })
        .catch(error => {
          // Silenciar erro para não afetar a experiência do usuário
        });
      }
    };

    // Registrar eventos para detectar saída
    const handleBeforeUnload = () => {
      registerTimeSpent();
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handleBeforeUnload); // Para iOS
    
    // Também registrar a cada 30 segundos para garantir que temos dados mesmo se o usuário não sair corretamente
    const intervalId = setInterval(() => {
      registerTimeSpent();
    }, 30000); // A cada 30 segundos
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handleBeforeUnload);
      clearInterval(intervalId);
      registerTimeSpent(); // Registrar ao desmontar o componente
    };
  }, []);

  // Detectar intenção de saída
  useEffect(() => {
    if (!hasInteracted) return;
    
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
        setExitIntent(true);
        setShowExitModal(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasInteracted]);

  // Detectar interação do usuário
  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted) {
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