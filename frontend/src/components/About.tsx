export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <h2 className="section-title">Sobre Nós</h2>
        <p className="about-text">
          A HeRa-i é uma Agência Inteligente de desenvolvimento web e sistemas digitais que nasceu da união de quatro mentes brilhantes: Mr.Goose, Lari Lopes, Heloisa e Ravi Felipe, representando uma nova geração de inteligência e criatividade, que possuem quase 30 anos de experiência no mercado de tecnologia.
        </p>
        <p className="about-text">
          Nossa missão é criar sites, aplicativos e sistemas web modernos, personalizados, escaláveis e com uso inteligente de IA, transformando a presença digital dos nossos clientes e impulsionando seus resultados.
        </p>
        <div className="founders">
          <div className="founder pixel-border">
            <img src="/imgs/mrgoose.jpg" alt="Mr.Goose" />
            <h3>Mr.Goose</h3>
            <p>Programador e Desenvolvedor desde 1998 e entusiasta da Tecnologia desde 1994</p>
          </div>
          <div className="founder pixel-border">
            <img src="/imgs/larilopes.jpg" alt="Lari Lopes" />
            <h3>Lari Lopes</h3>
            <p>Gerente de Projetos com +3 Graduações e Pós Graduações em Gestão de Projetos Agéis, Ciência de Dados e Inteligência Artificial</p>
          </div>
          <div className="founder pixel-border">
            <img src="https://cdn-icons-png.flaticon.com/512/4140/4140051.png" alt="Heloisa Lopes" />
            <h3>Heloisa</h3>
            <p>Nerd, vaidosa e perfeccionista. Geração Z, responsável pela parte criativa e inovadora dos projetos.</p>
          </div>
          <div className="founder pixel-border">
            <img src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png" alt="Ravi Felipe" />
            <h3>Ravi Felipe</h3>
            <p>O mini gênio da Tecnologia e Desenvolvedor Mirim de Jogos e Aplicativos representando a nova geração.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
