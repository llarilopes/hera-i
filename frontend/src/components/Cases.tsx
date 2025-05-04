import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const CASES = [
  {
    title: 'S.O.S Computadores',
    tooltip: 'Consultoria',
    year: '1998-1999',
    link: 'https://www.sos.com.br/',
    image_logo: '/imgs/cases/S.O.S-Computadores-Logico-Music.jpg',
  },
  {
    title: 'Mr.Goose Group',
    tooltip: 'Consultoria e Desenvolvido Sistemas e Aplicativos',
    year: '2009-Atualmente',
    link: 'https://www.google.com/search?q=Mr.Goose+Group',
    image_logo: '/imgs/cases/mrgoose.jpeg',
  },
  {
    title: 'Grupo Promove Soebras',
    tooltip: 'Desenvolvido Sistemas e WebSites',
    year: '2011-2012',
    link: 'https://www.grupopromove.com.br/',
    image_logo: '/imgs/cases/promove.png',
  },
  {
    title: 'Grupo Animatto',
    tooltip: 'Desenvolvido Sistemas e WebSites e E-commerce',
    year: '2013-2014',
    link: 'https://www.google.com/search?q=Grupo+Animatto',
    image_logo: '/imgs/cases/animatto.jpg',
  },
  {
    title: 'CECON / Angra Soluções',
    tooltip: 'Desenvolvido Sistemas e WebSites',
    year: '2014-2016',
    link: 'https://www.google.com/search?q=CECON+Angra+Solu%C3%A7%C3%B5es',
    image_logo: '/imgs/cases/cecon-mg.png',
  },
  {
    title: 'AcessoWeb',
    tooltip: 'Desenvolvido Sistemas e WebSites',
    year: '2016',
    link: 'https://www.google.com/search?q=AcessoWeb+empresa',
    image_logo: '/imgs/cases/acessoweb.png',
  },
  {
    title: 'Feira Shop',
    tooltip: 'Desenvolvido Sistemas e WebSites e E-commerce',
    year: '2016-2017',
    link: 'https://www.google.com/search?q=Feira+Shop',
    image_logo: '/imgs/cases/feira_shop.png',
  },
  {
    title: 'PrimeTS - Prime Technology Solutions',
    tooltip: 'Consultoria e Desenvolvido Sistemas, Web Sites e Aplicativos',
    year: '2017',
    link: 'https://www.google.com/search?q=PrimeTS+Prime+Technology+Solutions',
    image_logo: '/imgs/cases/primets.png',
  },
  {
    title: 'Zap Gráfica Online',
    tooltip: 'Desenvolvido Sistemas e WebSites',
    year: '2017',
    link: 'https://www.google.com/search?q=Zap+Gr%C3%A1fica+Online',
    image_logo: '/imgs/cases/zapgrafica.jpeg',
  },
  {
    title: 'Desejo Atendido',
    tooltip: 'Desenvolvido WebSites e E-commerce',
    year: '2018',
    link: 'https://www.google.com/search?q=Desejo+Atendido+classificados',
    image_logo: '/imgs/cases/desejo-atendido.png',
  },
  {
    title: 'Grupo Integração',
    tooltip: 'Desenvolvido Sistemas para gestão pública de saúda (SUS)',
    year: '2020',
    link: 'https://www.google.com/search?q=Grupo+Integra%C3%A7%C3%A3o+saude',
    image_logo: '/imgs/cases/grupo_integracao.jpeg',
  },
  {
    title: 'ANB',
    tooltip: 'Consultoria e Desenvolvido Web Sites e Aplicativos',
    year: '2010-Atualmente',
    link: 'https://www.google.com/search?q=ANB+empresa',
    image_logo: '/imgs/cases/anb.png',
  },
  {
    title: 'Hospital Hilton Rocha',
    tooltip: 'Desenvolvido Sistemas e WebSites',
    year: '2011',
    link: 'https://www.hospitalhiltonrocha.com.br/',
    image_logo: '/imgs/cases/hospital_hilton_rocha.png',
  },
  {
    title: 'NextID',
    tooltip: 'Desenvolvido Sistemas e WebSites',
    year: '2018',
    link: 'https://www.google.com/search?q=NextID+empresa+tecnologia',
    image_logo: '/imgs/cases/nextid.jpeg',
  },
  {
    title: 'Soebras',
    tooltip: 'Desenvolvido Sistemas e WebSites',
    year: '2011-2012',
    link: 'https://www.soebras.edu.br/',
    image_logo: '/imgs/cases/soebras.jpg',
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
              {/* Tooltip customizado */}
              <div className="home-tooltip pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-30 flex items-center justify-center w-full h-full">
                <div className="tooltip-bubble">
                  {c.tooltip}
                  <span className="tooltip-arrow"></span>
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
                <div className="card-image">
                  <img 
                    src={c.image_logo} 
                    alt={c.title} 
                    className="w-full h-full object-contain p-4" 
                  />
                </div>
                <div className="p-4 flex flex-col items-center justify-center">
                  <h3 className="text-center font-bold">{c.title}</h3>
                  <p className="text-center">{c.year}</p>
                </div>
              </motion.a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
