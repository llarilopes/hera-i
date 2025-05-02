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
    // Dar foco automaticamente ao campo de busca quando a página carregar
    setTimeout(() => {
      if (faqInputRef.current) {
        faqInputRef.current.focus();
      }
    }, 300); // Pequeno delay para garantir que o componente está montado
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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [targetId]);

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
