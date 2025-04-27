export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-container">
          <div className="footer-col">
            <h3>HeRa-i</h3>
            <p>Tecnologia que constrói o futuro.</p>
            <p>Mais de 20 anos de experiência em desenvolvimento web e sistemas digitais.</p>
          </div>
          <div className="footer-col">
            <h3>Links Úteis</h3>
            <ul className="footer-links">
              <li><a href="#">Início</a></li>
              <li><a href="#about">Sobre Nós</a></li>
              <li><a href="#services">Serviços</a></li>
              <li><a href="#cases">Cases</a></li>
              <li><a href="#contact">Contato</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Legal</h3>
            <ul className="footer-links">
              <li><a href="#">Política de Privacidade</a></li>
              <li><a href="#">Termos de Serviço</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Redes Sociais</h3>
            <div className="social-icons">
              <a href="#" className="social-icon"><i className="fab fa-facebook-f" /></a>
              <a href="#" className="social-icon"><i className="fab fa-instagram" /></a>
              <a href="#" className="social-icon"><i className="fab fa-linkedin-in" /></a>
              <a href="#" className="social-icon"><i className="fab fa-github" /></a>
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
