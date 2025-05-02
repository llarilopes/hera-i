import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FaqAccordion, { FaqQuestion } from '@/components/FaqAccordion';
import FaqSearchBox from '@/components/FaqSearchBox';

interface FaqPageProps {
  data: FaqQuestion[];
}

export default function FaqPage() {
  const router = useRouter();
  const targetId = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;
  const scrollRef = useRef<HTMLDivElement>(null);
  const faqInputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<FaqQuestion[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/faq/questions');
        if (!res.ok) throw new Error('Erro ao buscar dados do FAQ');
        const json = await res.json();
        setData(json);

      } catch (e) {
        setData([]);
        console.error('[FAQ] Erro ao buscar dados:', e);
      }
    }
    fetchData();
  }, []);

  // Ref para controlar se já tentamos rolar até a pergunta
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    // Resetar o flag quando o targetId mudar
    hasScrolledRef.current = false;
  }, [targetId]);

  useEffect(() => {
    // Esperar os dados serem carregados e o componente ser renderizado antes de tentar rolar até a pergunta
    if (targetId && data.length > 0 && !hasScrolledRef.current) {
      // Marcar que já tentamos rolar
      hasScrolledRef.current = true;
      
      // Usar um delay maior para garantir que o DOM está completamente renderizado
      setTimeout(() => {
        // Tentar encontrar o elemento pelo ID primeiro
        const targetElement = document.getElementById(`faq-item-${targetId}`);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          console.log(`Rolando até a pergunta ID ${targetId}`);
        } else if (scrollRef.current) {
          // Fallback para o scrollRef
          scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          console.log(`Usando scrollRef para rolar até a pergunta ID ${targetId}`);
        }
      }, 500); // Delay maior para garantir que o DOM está pronto
    }
  }, [targetId, data]);

  return (
    <>
      <Head>
        <title>Perguntas Frequentes - HeRa-i</title>
      </Head>
      <Header />
      <section className="section faq" style={{ padding: '142px 0' }}>
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="section-title text-3xl font-bold text-purple-800 text-center mb-10">Perguntas Frequentes</h2>
          <p className="text-gray-600 text-center mb-12">Encontre respostas para as dúvidas mais comuns sobre nossos serviços e soluções.</p>

          <div className="mb-8">
            <FaqSearchBox ref={faqInputRef} />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <FaqAccordion data={data} defaultOpenId={targetId} scrollRef={scrollRef} />
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-gray-600">Não encontrou o que procurava? <a href="/contact" className="text-purple-600 hover:text-purple-800 font-medium">Entre em contato conosco</a>.</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
