import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

// Compartilhamos o mesmo array de cases usado no componente Cases.tsx
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
  {
    title: 'Cliente X',
    tooltip: 'Desenvolvimento de Aplicativo Mobile',
    year: '2017',
    link: 'https://www.google.com/',
    image_logo: '/imgs/mascotes.jpeg',
  },
  {
    title: 'Cliente Y',
    tooltip: 'Sistema de ERP Personalizado',
    year: '2016',
    link: 'https://www.google.com/',
    image_logo: '/imgs/mascotes.jpeg',
  },
  {
    title: 'Cliente Z',
    tooltip: 'Consultoria em Infraestrutura Azure',
    year: '2015',
    link: 'https://www.google.com/',
    image_logo: '/imgs/mascotes.jpeg',
  },
];

export default function CasesPage() {
  return (
    <>
      <Head>
        <title>Cases de Sucesso - HeRa-i</title>
        <meta name="description" content="Conheça nossos cases de sucesso e projetos realizados para empresas de diversos segmentos." />
      </Head>
      
      <Header />
      
      <main className="pt-24 pb-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <Link href="/" className="text-gray-500 hover:text-lime-600 transition-colors mr-2">
              Início
            </Link>
            <span className="text-gray-400 mx-2">/</span>
            <span className="text-gray-900 font-medium">Cases de Sucesso</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Cases de Sucesso</h1>
          <p className="text-gray-600 mb-10 max-w-3xl">
            Conheça alguns dos projetos que desenvolvemos para clientes em diversos segmentos.
            Cada case representa uma solução personalizada que trouxe resultados concretos.
          </p>
          
          {/* Grid de cards */}
          <div className="cases-grid">
          {CASES.map((c, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              key={c.title}
              className="card-item"
            >
              <a
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full block relative group"
              >
                {/* Tooltip customizado */}
                <div className="cases-tooltip pointer-events-none absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-30 flex items-center justify-center w-full h-full">
                  <div className="cases-tooltip-bubble">
                    {c.tooltip}
                    <span className="cases-tooltip-arrow"></span>
                  </div>
                </div>
                <div className="card-image">
                  <img 
                    src={c.image_logo} 
                    alt={c.title} 
                    className="w-full h-full object-contain p-4" 
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-center font-bold">{c.title}</h3>
                  <p className="text-center">{c.year}</p>
                </div>
              </a>
            </motion.div>
          ))}
          </div>
          {/* CTA após os cards */}
          <div className="mt-16 text-center bg-gray-50 border border-gray-100 rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quer ser nosso próximo case de sucesso?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Converse com nossa equipe sobre seu projeto e descubra como podemos ajudar 
              sua empresa a alcançar os melhores resultados.
            </p>
            <Link 
              href="/contact" 
              className="inline-block px-6 py-3 bg-lime-500 text-white font-medium rounded-md hover:bg-lime-600 transition-colors"
            >
              Entre em contato
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
} 