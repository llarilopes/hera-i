export default function Header() {
  return (
    <header>
      <div className="container header-container">
        <a href="#home">
          <img src="/imgs/logo.png" alt="HeRa-i Logo" className="logo" />
        </a>
        <nav className="header-menu">
          <ul className="nav-links">
            <li><a href="/#about">Sobre Nós</a></li>
            <li><a href="/#services">Serviços</a></li>
            <li><a href="/#cases">Cases</a></li>
          </ul>
        </nav>
        <a href="/#contact" className="contact-button">Fale Conosco</a>
      </div>
    </header>
  );
}
