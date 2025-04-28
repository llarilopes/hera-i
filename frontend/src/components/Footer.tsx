import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-container">
          <div className="footer-col">
            <h3>HeRa-i</h3>
            <p>Tecnologia que constrói o futuro.</p>
            <p>Quase 30 anos de experiência em desenvolvimento web e sistemas digitais.</p>
          </div>
          <div className="footer-col">
            <h3>Links Úteis</h3>
            <ul className="footer-links">
              <li><Link href="/#home">Início</Link></li>
              <li><Link href="/#about">Sobre Nós</Link></li>
              <li><Link href="/#services">Serviços</Link></li>
              <li><Link href="/#cases">Cases</Link></li>
              <li><Link href="/#contact">Contato</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Legal</h3>
            <ul className="footer-links">
              <li><Link href="/privacy">Política de Privacidade</Link></li>
              <li><Link href="/terms">Termos de Serviço</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Redes Sociais</h3>
            <div className="social-icons">
              <a href="https://www.facebook.com/anbrasil.org" className="social-icon"><i className="fab fa-facebook-f" /></a>
              <a href="https://www.instagram.com/ravi.lipe/" className="social-icon"><i className="fab fa-instagram" /></a>
              <a href="https://www.linkedin.com/in/mrgoose/" className="social-icon"><i className="fab fa-linkedin-in" /></a>
              <a href="https://github.com/lipegoose" className="social-icon"><i className="fab fa-github" /></a>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2025 HeRa-i. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
