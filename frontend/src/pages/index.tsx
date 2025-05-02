import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Cases from '@/components/Cases';
import Testimonials from '@/components/Testimonials';
import React, { useRef } from 'react';
import FaqSearchBox from '../components/FaqSearchBox';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  const faqInputRef = useRef<HTMLInputElement>(null);
  const scrollToFaqAndFocus = (e?: React.MouseEvent) => {
    e?.preventDefault();
    const faqSection = document.getElementById('faq');
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        faqInputRef.current?.focus();
      }, 400);
    }
  };

  useEffect(() => {
    const sections = document.querySelectorAll('.about, .services, .cases, .testimonials, .faq, .contact');
    const anchors = document.querySelectorAll('a[href^="#"]');
    const pixelBorders = document.querySelectorAll('.pixel-border');
    
    // Verificar se há links para a seção FAQ e adicionar comportamento de foco
    // Seleciona tanto links com href="/#faq" quanto href="#faq"
    const faqLinks = document.querySelectorAll('a[href="/#faq"], a[href="#faq"]');
    faqLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToFaqAndFocus();
      });
    });
    
    // Adicionar tratamento especial para os links do menu principal
    // Capturar todos os links que contêm "faq" no href, incluindo os do menu superior
    document.querySelectorAll('header a[href*="faq"], header .nav-links a[href*="faq"], footer a[href*="faq"]').forEach(link => {
      // Verificar se estamos na página inicial
      if (window.location.pathname === '/' || window.location.pathname === '') {
        link.addEventListener('click', (e) => {
          // Apenas prevenir o comportamento padrão se o link for para a âncora na mesma página
          const href = (link as HTMLAnchorElement).getAttribute('href');
          if (href && (href === '#faq' || href === '/#faq' || href.includes('#faq'))) {
            e.preventDefault();
            scrollToFaqAndFocus();
          }
        });
      }
    });

    function checkScroll() {
      const triggerBottom = window.innerHeight * 0.8;
      sections.forEach((section) => {
        const top = section.getBoundingClientRect().top;
        if (top < triggerBottom) section.classList.add('visible');
        else section.classList.remove('visible');
      });
    }

    // Tratamento para outros links de âncora que não são FAQ
    anchors.forEach((anchor) => {
      const href = (anchor as HTMLAnchorElement).getAttribute('href');
      // Pular os links de FAQ que já foram tratados acima
      if (href === '#faq' || href === '/#faq') return;
      
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = href;
        const targetElement = document.querySelector(targetId!);
        if (targetElement) {
          window.scrollTo({ top: (targetElement as HTMLElement).offsetTop - 80, behavior: 'smooth' });
        }
      });
    });

    pixelBorders.forEach((border) => {
      border.addEventListener('mouseenter', () => {
        (border as HTMLElement).style.transform = 'scale(1.05)';
        (border as HTMLElement).style.transition = 'all 0.3s ease';
      });
      border.addEventListener('mouseleave', () => {
        (border as HTMLElement).style.transform = 'scale(1)';
      });
    });

    window.addEventListener('scroll', checkScroll);
    checkScroll();

    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <About />
      <Services />
      <Cases />
      <Testimonials />
      <section id="faq" className="w-full flex flex-col items-center justify-center py-12" style={{ scrollMarginTop: '100px', padding: '100px 0' }}>
        <div className="container mx-auto px-4">
          <FaqSearchBox ref={faqInputRef} />
        </div>
      </section>
      <ContactForm />
      <Footer />
    </>
  );
}
