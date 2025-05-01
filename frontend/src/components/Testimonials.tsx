import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    text: 'Um excelente programador que não tem medo de desafios, um profissional centrado que sempre busca novos conhecimentos em novas tecnologias, tem vasto conhecimento na área e mesmo assim sempre está disposto a aprender coisas novas. É autodidata e aprende tudo muito rápido. Como colega de trabalho, ele sempre está disposto a ajudar, é uma pessoa extrovertida. Sempre estamos discutindo sobre novas tecnologias e tópicos sobre a área. Eu também o vejo como um colega de estudo e sempre estamos tirando dúvidas um do outro.',
    author: 'Dyemerson Almeida – Co-Founder da Plataforma Verde',
  },
  {
    text: 'Olá! Felipe Machado foi meu funcionário na Angra Games no desenvolvimento do sistema Neo de ensino. Disciplinado, comprometido, além de muito responsável, sempre trabalhou propondo soluções mais eficientes e criativas. Felipe, além de ótimo profissional, é uma pessoa que trabalha muito bem em equipe. Preserva um bom ambiente entre os colegas e está disposto a compartilhar seus conhecimentos. De extrema confiança, recomendo os trabalhos do Felipe e como profissional.',
    author: 'Marina Valadas França – Sócia-diretora da Angra Games',
  },
  {
    text: 'Trabalhei com o Felipe Machado quase 3 anos num projeto inovador e de grande complexidade. Ele sempre foi um responsável desenvolvedor e de grande paixão por tudo que fazia. Metódico, contemplativo e engenhoso nas soluções propostas, possui característica de liderança e excelente predisposição de trabalho em equipe. Um grande coração e boa capacidade de socialização com todos na empresa. Eu autentico essa recomendação e marco como muito positiva sua atuação em nosso projeto.',
    author: 'Adan Ribeiro – Diretor de Marketing Empresarial',
  },
  {
    text: 'Trabalhei com o Felipe por 1 ano na Animatto e 6 meses na Primets, ele é um profissional bastante organizado, está sempre disponível para ajudar e possui bastante conhecimento.',
    author: 'Israel – Desenvolvedor',
  },
  {
    text: 'Trabalhei com o Felipe Goose na Desejo Atendido por pouco mais de dois meses e mesmo tendo convivido por pouco tempo, pude aprender muito com ele. Seu profissionalismo e alto astral sempre agregaram muito ao ambiente de trabalho. Ele é um EXCELENTE profissional, sempre mostrando muita vontade, habilidade e versatilidade!',
    author: 'Gybsom Batista de Souza – Full Stack Developer',
  },
  {
    text: 'Felipe trabalhou na equipe de desenvolvimento da PrimeTS e desempenhou suas funções sempre com muita dedicação e competência. Recomendo.',
    author: 'Saulo Araujo – Gerente de Projetos',
  },
  {
    text: 'Tivemos o prazer de trabalhar juntos em duas oportunidades! Sempre atencioso e prestativo, com um conhecimento único em PHP. Extremamente dinâmico nas tomadas de decisão, sempre buscando propor uma melhor solução para a resolução do problema. Altamente capaz na produção de código de qualidade e resolução de problemas complexos!',
    author: 'Edmilson Expedito – Desenvolvedor Fullstack',
  },
  {
    text: 'Profissional extremamente focado e confiável. Excelente técnica de desenvolvimento, além de muito intuitivo para resolução de problemas.',
    author: 'Adan Ribeiro – Gestão de Tecnologia',
  },
  {
    text: 'Trabalhei com o Felipe, na Plataforma Verde e foi sem dúvidas uma experiência única. Felipe trabalhava em um projeto paralelo ao meu entretanto seu apoio e experiência no mundo da tecnologia sempre foi algo enriquecedor para o dia a dia.',
    author: 'Giovanni Carvalho Mendes – Analista de Sistemas',
  },
  {
    text: 'Fico feliz em poder fazer esta Recomendação: Felipe Ganso foi um grande parceiro interno na empresa em um projeto de grande porte em um sistema (no qual ele era responsável pelo desenvolvimento) que teve grande repercussão no mercado com centenas de milhares de empresas cadastradas. Foi um projeto onde Felipe participou com criatividade, dedicação e profissionalismo. Foi um grande parceiro, dando apoio técnico, solução e inovação.',
    author: 'Elidier Araujo – Gestão de TI',
  },
  {
    text: 'Tive o prazer de trabalhar com o Felipe na PlataformaVerde. Ótimo profissional, sempre focado em resultados e disposto a ajudar os colegas que precisem de uma mãozinha. Me ajudou bastante quando ingressei na empresa e não consigo estimar o quanto isso foi importante no meu crescimento profissional.',
    author: 'Renato Silva – Senior Backend Python Developer',
  },
  {
    text: 'O Felipe é dedicado e resiliente e não se deixa vencer pelas adversidades. Destaca-se pela sua capacidade de resolver problemas inesperados. Guardo excelentes memórias dos tempos em que trabalhamos juntos e não hesito em recomendar o Felipe para qualquer função no universo da tecnologia.',
    author: 'Felipe Medeiros – Senior Full Stack PHP',
  },
  {
    text: 'Profissional competente, engajado e preocupado com os resultados. O Felipe gosta de ajudar outros, é sempre gentil e muito organizado. Procurar fazer seu trabalho com excelência, seja ele qual for. Quem quiser trabalhar com ele pode ter certeza de estar ao lado de alguém 100% comprometido.',
    author: 'Ibrahim Brumate – Senior Software Engineer',
  },
  {
    text: 'Ótimo profissional!',
    author: 'Danniel Covo – Co-Fundador e CMO',
  },
  {
    text: 'I am pleased to recommend Larisse, with whom I had the opportunity to study during our academic training. From the beginning, Larisse consistently stood out for her exemplary dedication to her studies and her initiative in academic projects and challenges. In addition to being an extremely committed professional, she demonstrated remarkable leadership and teamwork skills, consistently contributing to the success of our projects. Her intellectual curiosity and continuous pursuit of learning are truly inspiring and reflect her commitment to excellence. I am confident that Larisse will bring the same enthusiasm, competence, and dedication to any professional opportunity she embraces. She is undoubtedly a valuable addition to any team.',
    author: 'Luã Oliveira Ferreira – Strategic Sourcing',
  },
  {
    text: 'Tive o prazer de trabalhar com a Larisse e posso dizer que sua dedicação, competência e visão dos projetos fazem a diferença. Sempre comprometido com as entregas, além de demonstrar muita habilidade no uso de IA para otimizar resultados e com uma abordagem centrada para resolver desafios. Sua capacidade de trabalho em equipe são inspiradoras. Obrigado pela parceria!',
    author: 'Charlles Franco – Gestor de Projetos',
  },
  {
    text: 'Larisse demonstra grandes competências na gestão de projetos, conhecimentos técnicos em soluções customizadas, forte contribuição na produção de documentações dos projetos em que atua e grande capacidade de organização. Excelente profissional, uma pessoa interessada, motivada e envolvida na organização, contribui ativamente para lançar desafios e concretizar objetivos. Estou certo que sempre será de grande valia em qualquer organização que atuar.',
    author: 'José Carlos Mattiuzzi – CEO na Ubicua Cloud',
  },
  {
    text: 'Atuando na área Comercial tive a oportunidade de trabalhar com a Larisse em diversos projetos, onde ela demonstrou ser uma profissional extremamente competente e focada em Gestão de Projetos. Sua habilidade em organizar e gerenciar tarefas complexas é exemplar, sempre garantindo que os prazos sejam cumpridos e os objetivos alcançados. Larisse tem uma abordagem proativa e uma atenção aos detalhes que fazem toda a diferença. Sua dedicação e paixão pelo trabalho são inspiradoras. Recomendo fortemente a Larisse para qualquer posição de Gestão de Projetos. Sua competência e foco são qualidades que a tornam uma profissional de destaque.',
    author: 'Marcelo Bastos – Gerente de Contas',
  },
  {
    text: 'A Larisse tem um mente visionária que vai além do seu tempo. Ela visualizou o Cartão de Visitas Virtual e Interativo muito antes da Pandemia ou da necessidade de fato existir. Neste \'novo normal\' onde a vida é "100% home-office", e não há mais interação física entre as pessoas, mais do que nunca, esta Tecnologia que a Larisse ajudou a aperfeiçoar se faz necessária. Parabéns pela visão além do alcance. Parabéns pelas belíssimas artes que você sempre criou para nossos clientes. #vamosJuntos ;-) Sucesso! ^^',
    author: 'Felipe Machado Goose – Desenvolvedor Full Stack',
  },
  {
    text: 'Larisse se relaciona muito bem com os os envolvidos em processos de prestação de serviços, consegue organizar e definir formas diversas de gestão de contratos.',
    author: 'Letícia Regina Silva – Gestora de Equipes',
  },
];

// Valor inicial fixo para SSR
// Será atualizado no useEffect para evitar erros de hidratação
const INITIAL_COUNT = 2;

export default function Testimonials() {
  // Inicialização com valores fixos para SSR
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  

  // Detecta mobile/desktop e ajusta a contagem de depoimentos visíveis
  useEffect(() => {
    // Detecta o tamanho inicial da tela
    const checkMobile = () => window.innerWidth < 768;
    const initialMobile = checkMobile();
    setVisibleCount(initialMobile ? 1 : 2);
    // Configura o listener para redimensionamento
    function handleResize() {
      const mobile = checkMobile();
      setVisibleCount(mobile ? 1 : 2);
    }
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Acessibilidade: foco no botão
  const buttonRef = React.createRef<HTMLButtonElement>();

  function handleShowMore() {
    setVisibleCount((prevCount: number) => Math.min(prevCount + 1, testimonials.length));
    setTimeout(() => {
      buttonRef.current?.focus();
    }, 0);
  }

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <h2 className="section-title">O que nossos clientes dizem</h2>
        <div style={{ position: 'relative' }}>
          <div
            className="testimonials-container"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
              fontFamily: `'Press Start 2P', cursive`,
              marginBottom: 20,
            }}
          >
          {testimonials.slice(0, visibleCount).map((t, idx) => (
            <div
              key={idx}
              className="testimonial"
              tabIndex={0}
              style={{
                overflow: 'hidden',
                transition: 'max-height 0.5s cubic-bezier(.4,2,.6,1), opacity 0.5s',
                opacity: 1,
                marginBottom: 30,
                outline: 'none',
                fontFamily: `'Press Start 2P', cursive`,
              }}
            >
              <p>{t.text}</p>
              <div className="testimonial-author">{t.author}</div>
            </div>
          ))}
          </div>
          {visibleCount < testimonials.length && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
            <button
              ref={buttonRef}
              className="form-button"
              style={{
                fontFamily: `'Press Start 2P', cursive`,
                fontSize: 14,
                padding: '15px 30px',
                backgroundColor: 'var(--primary-color)',
                color: 'var(--secondary-color)',
                border: 'none',
                borderRadius: 5,
                cursor: 'pointer',
                textTransform: 'uppercase',
                transition: 'background 0.3s',
                outline: 'none',
                width: '45%',
              }}
              onClick={handleShowMore}
              aria-label="Ver mais depoimentos"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') handleShowMore();
              }}
            >
              Ver mais
            </button>
          </div>
        )}
        </div>
      </div>
    </section>
  );
}
