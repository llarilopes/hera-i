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

        {/* Menu de navegação - visível em desktop ou quando expandido em mobile */}
        <nav className={`header-menu ${isMobile ? (menuOpen ? 'mobile-open' : 'mobile-closed') : ''}`}>
          <ul className="nav-links">
            <li><Link href="/#about" onClick={() => isMobile && setMenuOpen(false)}>Quem Somos</Link></li>
            <li><Link href="/#services" onClick={() => isMobile && setMenuOpen(false)}>Serviços</Link></li>
            <li><Link href="/#cases" onClick={() => isMobile && setMenuOpen(false)}>Cases</Link></li>
            <li><Link href="/#faq" onClick={() => isMobile && setMenuOpen(false)}>FAQ</Link></li>
          </ul>
        </nav>

        {/* Botão de contato - visível em desktop ou quando expandido em mobile */}
        <Link 
          href="/#contact" 
          className={`contact-button ${isMobile && !menuOpen ? 'mobile-hidden' : ''}`}
          onClick={() => isMobile && setMenuOpen(false)}
        >
          Fale Conosco
        </Link>
      </div>
    </header>
  );
}
