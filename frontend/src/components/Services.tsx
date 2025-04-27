export default function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <h2 className="section-title">Nossos Serviços</h2>
        <div className="services-grid">
          <div className="service-card">
            <i className="fas fa-laptop-code"></i>
            <h3>Desenvolvimento de Websites</h3>
            <p>Sites modernos, responsivos e otimizados para SEO, com design personalizado e experiência de usuário excepcional.</p>
          </div>
          <div className="service-card">
            <i className="fas fa-server"></i>
            <h3>Plataformas e Sistemas Web</h3>
            <p>Desenvolvimento de sistemas web escaláveis e personalizados para otimizar processos e aumentar a produtividade do seu negócio.</p>
          </div>
          <div className="service-card">
            <i className="fas fa-mobile-alt"></i>
            <h3>Aplicativos Mobile</h3>
            <p>Apps nativos e híbridos para iOS e Android, com interfaces intuitivas e funcionalidades avançadas.</p>
          </div>
          <div className="service-card">
            <i className="fas fa-brain"></i>
            <h3>Soluções com IA</h3>
            <p>Integração de Inteligência Artificial para automatizar processos, analisar dados e oferecer experiências personalizadas.</p>
          </div>
          <div className="service-card">
            <i className="fas fa-chart-line"></i>
            <h3>Consultoria Digital</h3>
            <p>Análise e otimização de negócios digitais, com estratégias personalizadas para maximizar resultados.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
