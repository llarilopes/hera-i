import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface ExitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExitModal: React.FC<ExitModalProps> = ({ isOpen, onClose }) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const router = useRouter();
  
  if (!isOpen) return null;
  
  const handleDontShowAgain = () => {
    setDontShowAgain(!dontShowAgain);
  };
  
  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem('dontShowExitModal', 'true');
    }
    onClose();
  };
  
  const handleContactClick = () => {
    if (dontShowAgain) {
      localStorage.setItem('dontShowExitModal', 'true');
    }
    
    // Fechar a modal antes de navegar
    onClose();
    
    // Navegar para a seção de contato
    router.push('/#contact');
  };

  return (
    <div className="exit-modal-overlay">
      <div className="exit-modal">
        <h2>Antes de sair</h2>
        <p>Ficou com alguma dúvida que a gente possa te ajudar?</p>
        <div className="exit-modal-buttons">
          <button 
            className="exit-modal-button primary" 
            onClick={handleContactClick}
          >
            Sim, tenho uma dúvida
          </button>
          <button className="exit-modal-button secondary" onClick={handleClose}>
            Não, tudo certo
          </button>
        </div>
        <div className="exit-modal-checkbox">
          <input 
            type="checkbox" 
            id="dontShowAgain" 
            checked={dontShowAgain}
            onChange={handleDontShowAgain}
          />
          <label htmlFor="dontShowAgain">Por favor, não me pergunte isso de novo. Obrigado.</label>
        </div>
      </div>
    </div>
  );
};

export default ExitModal;