import Image from 'next/image';

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <h2 className="section-title">Sobre Nós</h2>
        <p className="about-text">
          A HeRa-i é uma Agência Inteligente de desenvolvimento web e sistemas digitais que nasceu da união de quatro mentes brilhantes: Mr.Goose, Lari Lopes, Heloisa Lopes e Ravi Felipe, representando uma nova geração de inteligência e criatividade, que possuem quase 30 anos de experiência no mercado de tecnologia.
        </p>
        <p className="about-text">
          Nossa missão é criar sites, aplicativos e sistemas web modernos, personalizados, escaláveis e com uso inteligente de IA, transformando a presença digital dos nossos clientes e impulsionando seus resultados.
        </p>
        <div className="founders">
          <a href="https://www.linkedin.com/in/mrgoose/" className="founder pixel-border" target="_blank" rel="noopener noreferrer">
            <Image src="/imgs/mrgoose.jpg" alt="Mr.Goose" width={150} height={150} />
            <h3>MR.GOOSE</h3>
            <p>Programador e Desenvolvedor desde 1998 e entusiasta da Tecnologia desde 1994, é hoje um Maestro de Inteligência Artificial</p>
          </a>
          <a href="https://www.linkedin.com/in/larisselopes/" className="founder pixel-border" target="_blank" rel="noopener noreferrer">
            <Image src="/imgs/larilopes.jpg" alt="Lari Lopes" width={150} height={150} />
            <h3>LARI LOPES</h3>
            <p>Gerente de Projetos com +3 Graduações e Pós Graduações em Gestão de Projetos Agéis, Ciência de Dados e Inteligência Artificial</p>
          </a>
          <a href="https://www.instagram.com/eu.helo__/" className="founder pixel-border" target="_blank" rel="noopener noreferrer">
            <Image src="/imgs/heloisa.png" alt="Heloisa Lopes" width={150} height={150} />
            <h3>HELOISA LOPES</h3>
            <p>Nerd, vaidosa e perfeccionista. Geração Z, responsável pela parte criativa e inovadora dos projetos.</p>
          </a>
          <a href="https://www.instagram.com/ravi.lipe/" className="founder pixel-border" target="_blank" rel="noopener noreferrer">
            <Image src="/imgs/ravilipe.png" alt="Ravi Felipe" width={150} height={150} />
            <h3>RAVI FELIPE</h3>
            <p>O mini gênio da Tecnologia e Desenvolvedor Mirim de Jogos e Aplicativos representando a nova geração.</p>
          </a>
        </div>
      </div>
    </section>
  );
}
