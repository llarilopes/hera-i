import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header>
      <div className="container header-container">
        <Link href="/#home">
          <Image src="/imgs/logo.png" alt="HeRa-i Logo" width={150} height={50} className="logo" />
        </Link>
        <nav className="header-menu">
          <ul className="nav-links">
            <li><Link href="/#about">Sobre Nós</Link></li>
            <li><Link href="/#services">Serviços</Link></li>
            <li><Link href="/#cases">Cases</Link></li>
          </ul>
        </nav>
        <Link href="/#contact" className="contact-button">Fale Conosco</Link>
      </div>
    </header>
  );
}
