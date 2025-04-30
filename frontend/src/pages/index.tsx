import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Cases from '@/components/Cases';
import Testimonials from '@/components/Testimonials';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  useEffect(() => {
    const sections = document.querySelectorAll('.about, .services, .cases, .testimonials, .faq, .contact');
    const anchors = document.querySelectorAll('a[href^="#"]');
    const pixelBorders = document.querySelectorAll('.pixel-border');

    function checkScroll() {
      const triggerBottom = window.innerHeight * 0.8;
      sections.forEach((section) => {
        const top = section.getBoundingClientRect().top;
        if (top < triggerBottom) section.classList.add('visible');
        else section.classList.remove('visible');
      });
    }

    anchors.forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = (anchor as HTMLAnchorElement).getAttribute('href');
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
      <FaqAccordion />
      <ContactForm />
      <Footer />
    </>
  );
}
