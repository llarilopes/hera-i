import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar se é dispositivo móvel
  useEffect(() => {
    const checkMobile = () => window.innerWidth < 768;
    setIsMobile(checkMobile());

    const handleResize = () => {
      const mobile = checkMobile();
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false); // Fechar menu ao mudar para desktop
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Alternar menu mobile
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <div className="container header-container">
        <Link href="/#home">
          <Image 
            src="/imgs/logo.png" 
            alt="HeRa-i Logo" 
            width={150} 
            height={50} 
            className="logo" 
            priority={true}
          />
        </Link>
        
        {/* Botão de contato - sempre visível em mobile */}
        {isMobile && (
          <Link 
            href="/#contact" 
            className="contact-button mobile-contact"
            onClick={() => menuOpen && setMenuOpen(false)}
          >
            Fale Conosco
          </Link>
        )}

        {/* Menu Hamburguer para Mobile */}
        {isMobile && (
          <button 
            className="hamburger-menu" 
            onClick={toggleMenu}
            aria-label="Menu de navegação"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        )}

        {/* Menu de navegação - versão desktop e mobile são diferentes */}
        <nav className={`header-menu ${isMobile ? (menuOpen ? 'mobile-open' : 'mobile-closed') : ''}`}>
          {/* Links para desktop - versão reduzida */}
          {!isMobile && (
            <ul className="nav-links">
              <li><Link href="/#about">Quem Somos</Link></li>
              <li><Link href="/#services">Serviços</Link></li>
              <li><Link href="/#cases">Cases</Link></li>
              <li><Link href="/#faq">FAQ-i</Link></li>
            </ul>
          )}
          
          {/* Links para mobile - versão completa com todos os links do footer */}
          {isMobile && (
            <ul className="nav-links mobile-nav-links">
              <li><Link href="/#home" onClick={() => setMenuOpen(false)}>Início</Link></li>
              <li><Link href="/#about" onClick={() => setMenuOpen(false)}>Quem Somos</Link></li>
              <li><Link href="/#services" onClick={() => setMenuOpen(false)}>Serviços</Link></li>
              <li><Link href="/#cases" onClick={() => setMenuOpen(false)}>Cases</Link></li>
              <li><Link href="/#testimonials" onClick={() => setMenuOpen(false)}>Recomendações</Link></li>
              <li><Link href="/#faq" onClick={() => setMenuOpen(false)}>Perguntas Frequentes</Link></li>
              <li><Link href="/#contact" onClick={() => setMenuOpen(false)}>Contato</Link></li>
            </ul>
          )}
        </nav>

        {/* Botão de contato - visível apenas em desktop */}
        {!isMobile && (
          <Link 
            href="/#contact" 
            className="contact-button"
          >
            Fale Conosco
          </Link>
        )}
      </div>
    </header>
  );
}
