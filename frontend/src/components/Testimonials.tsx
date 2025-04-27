import React, { useState, useEffect, useRef } from 'react';

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
    author: 'Adan Ribeiro – Diretor de Marketing Empresarial - CECON',
  },
  {
    text: 'Trabalhei com Felipe por 1 ano na Animatto e 6 meses na Primets, ele é um profissional bastante organizado, está sempre disponível para ajudar e possui bastante conhecimento.',
    author: 'Israel - Desenvolvedor - Animatto e Primets',
  },
  {
    text: 'Trabalhei com o Felipe Goose na Desejo Atendido por pouco mais de dois meses e mesmo tendo convivido por pouco tempo, pude aprender muito com ele. Seu profissionalismo e alto astral sempre agregaram muito ao ambiente de trabalho. Ele é um EXCELENTE profissional, sempre mostrando muita vontade, habilidade e versatilidade!',
    author: 'Gybsom Batista de Souza - Full Stack Developer - Desejo Atendid',
  },
];

function getInitialCount() {
  if (typeof window !== 'undefined') {
    return window.innerWidth < 768 ? 1 : 3;
  }
  return 3;
}

export default function Testimonials() {
  const [visibleCount, setVisibleCount] = useState(getInitialCount());
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsividade: reinicia ao redimensionar
  useEffect(() => {
    function handleResize() {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setVisibleCount(mobile ? 1 : 3);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Efeito slide-down ao mostrar mais
  useEffect(() => {
    if (containerRef.current) {
      const children = Array.from(containerRef.current.children) as HTMLDivElement[];
      children.forEach((child, idx) => {
        if (idx < visibleCount) {
          child.style.maxHeight = child.scrollHeight + 'px';
          child.style.opacity = '1';
          child.style.marginBottom = '30px';
        } else {
          child.style.maxHeight = '0';
          child.style.opacity = '0';
          child.style.marginBottom = '0';
        }
      });
    }
  }, [visibleCount, isMobile]);

  // Acessibilidade: foco no botão
  const buttonRef = useRef<HTMLButtonElement>(null);

  function handleShowMore() {
    setVisibleCount((prev) => Math.min(prev + 1, testimonials.length));
    setTimeout(() => {
      buttonRef.current?.focus();
    }, 0);
  }

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <h2 className="section-title">O que nossos clientes dizem</h2>
        <div
          className="testimonials-container"
          ref={containerRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
            fontFamily: `'Press Start 2P', cursive`,
          }}
        >
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="testimonial"
              tabIndex={0}
              aria-hidden={idx >= visibleCount}
              style={{
                overflow: 'hidden',
                transition: 'max-height 0.5s cubic-bezier(.4,2,.6,1), opacity 0.5s',
                maxHeight: idx < visibleCount ? undefined : 0,
                opacity: idx < visibleCount ? 1 : 0,
                marginBottom: idx < visibleCount ? 30 : 0,
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
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 0 }}>
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
    </section>
  );
}
