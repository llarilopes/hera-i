export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <h2 className="section-title">Sobre Nós</h2>
        <p className="about-text">
          A HeRa-i é uma agência inteligente de desenvolvimento web e sistemas digitais que nasceu da união de duas mentes brilhantes: Heloisa (14 anos) e Ravi (5 anos), representando uma nova geração de inteligência e criatividade, junto com seus pais Lipe e Lari, que possuem mais de 20 anos de experiência no mercado de tecnologia.
        </p>
        <p className="about-text">
          Nossa missão é criar sites, aplicativos e sistemas web modernos, personalizados, escaláveis e com uso inteligente de IA, transformando a presença digital dos nossos clientes e impulsionando seus resultados.
        </p>
        <div className="founders">
          <div className="founder pixel-border">
            <img src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png" alt="Heloisa" />
            <h3>Heloisa (14 anos)</h3>
            <p>Programadora e designer apaixonada por tecnologia, responsável pela parte criativa e inovadora dos projetos.</p>
          </div>
          <div className="founder pixel-border">
            <img src="https://cdn-icons-png.flaticon.com/512/4140/4140051.png" alt="Ravi" />
            <h3>Ravi (5 anos)</h3>
            <p>O gênio da estratégia que, com sua visão única e criatividade infinita, traz soluções inovadoras para os desafios mais complexos.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
