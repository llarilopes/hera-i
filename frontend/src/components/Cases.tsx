import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const CASES = [
  {
    title: 'Petrobras',
    tooltip: 'Projeto SEGUP via EDGE/UFAL',
    year: '2024-2025',
    link: 'https://www.google.com/',
    image_logo: '/imgs/mascotes.jpeg',
  },
  {
    title: 'Lorsa Jeans',
    tooltip: 'Plataforma de Gestão Têxtil via Ubícua',
    year: '2023',
    link: 'https://www.google.com/',
    image_logo: '/imgs/mascotes.jpeg',
  },
  {
    title: 'Resolve Assist',
    tooltip: 'Sistema de Gestão',
    year: '2022',
    link: 'https://www.google.com/',
    image_logo: '/imgs/mascotes.jpeg',
  },
  {
    title: 'Seguros Unimed',
    tooltip: 'Projetos PHP',
    year: '2021',
    link: 'https://www.google.com/',
    image_logo: '/imgs/mascotes.jpeg',
  },
  {
    title: 'Animatto',
    tooltip: 'E-commerce WooCommerce',
    year: '2020',
    link: 'https://www.google.com/',
    image_logo: '/imgs/mascotes.jpeg',
  },
  {
    title: 'JSL / Movida',
    tooltip: 'Projetos internos de TI em Mogi das Cruzes/SP',
    year: '2019',
    link: 'https://www.google.com/',
    image_logo: '/imgs/mascotes.jpeg',
  },
  {
    title: 'ICTS',
    tooltip: 'Desenvolvimento Full Stack',
    year: '2018',
    link: 'https://www.google.com/',
    image_logo: '/imgs/mascotes.jpeg',
  },
];

export default function Cases() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const checkScreen = () => setShowNav(window.innerWidth >= 768);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Autoplay com loop infinito: a cada 4s
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      if (!containerRef.current) return;
      // Se chegou perto do fim, volta ao início para loop
      const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth;
      if (containerRef.current.scrollLeft + 10 >= maxScroll) {
        containerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scroll('right');
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [paused]);

  const scroll = (dir: 'left' | 'right') => {
    if (!containerRef.current) return;
    const { clientWidth } = containerRef.current;
    const scrollAmount = clientWidth * 0.8; // 80% da largura visível
    containerRef.current.scrollBy({
      left: dir === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="cases" className="cases py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title text-3xl font-bold text-gray-900">Cases de Sucesso</h2>
          <Link href="/cases" className="text-lime-600 font-medium hover:underline flex items-center gap-1">
            Ver todos <span className="text-xl">→</span>
          </Link>
        </div>

        {/* Botões navegação */}
        {showNav && (
          <>
            <button
              aria-label="Anterior"
              onClick={() => scroll('left')}
              className="hidden md:flex items-center justify-center absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-lime-500 text-white shadow-md hover:bg-lime-600 transition z-10"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              aria-label="Próximo"
              onClick={() => scroll('right')}
              className="hidden md:flex items-center justify-center absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-lime-500 text-white shadow-md hover:bg-lime-600 transition z-10"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Carrossel */}
        <div
          ref={containerRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 md:pb-4 -mx-2 px-2 hide-scrollbar"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {CASES.map((c, i) => (
            <div key={c.title} className="relative group w-[300px] h-[300px] flex-shrink-0 snap-center">
              {/* Tooltip customizado centralizado no meio do card, balão responsivo */}
              <div className="cases-tooltip pointer-events-none absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-30 flex items-center justify-center w-full h-full">
                <div className="cases-tooltip-bubble">
                  {c.tooltip}
                  <span className="cases-tooltip-arrow"></span>
                </div>
              </div>
              <motion.a
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="w-full h-full block bg-white rounded-xl overflow-hidden shadow-md border-2 border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-full h-auto bg-gray-100 flex items-center justify-center">
                  <img 
                    src={c.image_logo} 
                    alt={c.title} 
                    className="w-full h-auto object-contain p-4" 
                  />
                </div>
                <div className="p-4 flex flex-col items-center justify-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 truncate text-center">
                    {c.title}
                  </h3>
                  <p className="text-lime-600 text-xs text-center font-medium mb-0">{c.year}</p>
                </div>
              </motion.a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
