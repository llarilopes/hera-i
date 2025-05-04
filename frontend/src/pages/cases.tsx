import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

// Compartilhamos o mesmo array de cases usado no componente Cases.tsx
const CASES = [
  // Array original
  {
    title: 'Petrobras',
    tooltip: 'Projeto SEGUP via EDGE/UFAL',
    year: '2024-2025',
    link: 'https://www.google.com/',
    image_logo: '/imgs/cases/semlogo.png',
  },
  {
    title: 'Lorsa Jeans',
    tooltip: 'Plataforma de Gestão Têxtil via Ubícua',
    year: '2023',
    link: 'https://www.google.com/',
    image_logo: '/imgs/cases/semlogo.png',
  },
  {
    title: 'Resolve Assist',
    tooltip: 'Sistema de Gestão',
    year: '2022',
    link: 'https://www.google.com/',
    image_logo: '/imgs/cases/semlogo.png',
  },
  {
    title: 'Seguros Unimed',
    tooltip: 'Projetos PHP',
    year: '2021',
    link: 'https://www.google.com/',
    image_logo: '/imgs/cases/semlogo.png',
  },
  {
    title: 'ICTS',
    tooltip: 'Desenvolvimento Full Stack',
    year: '2018',
    link: 'https://www.google.com/',
    image_logo: '/imgs/cases/semlogo.png',
  },
  
  // Novos registros
  {
    title: 'S.O.S Computadores',
    tooltip: 'Consultoria',
    year: '1998-1999',
    link: 'https://www.sos.com.br/',
    image_logo: '/imgs/cases/S.O.S-Computadores-Logico-Music.jpg',
  },
  {
    title: 'TG Computer',
    tooltip: 'Consultoria',
    year: '2004-2009',
    link: 'https://www.google.com/search?q=TG+Computer',
    image_logo: '/imgs/cases/semlogo.png',
  },
  {
    title: 'Comercial GPC Indústria e Comércio Ltda. (Fogo Mineiro)',
    tooltip: 'Consultoria',
    year: '2005-2006',
    link: 'https://www.google.com/search?q=Comercial+GPC+Ind%C3%BAstria+e+Com%C3%A9rcio+Ltda+Fogo+Mineiro',
    image_logo: '/imgs/cases/semlogo.png',
  },
  {
    title: 'Liq (Contax Contact Center)',
    tooltip: 'Consultoria e Desenvolvido Planilhas Excel Avançadas',
    year: '2006-2009',
    link: 'https://www.liq.com.br/',
    image_logo: '/imgs/cases/semlogo.png',
  },
  {
    title: 'Mr.Goose Group',
    tooltip: 'Consultoria e Desenvolvido Sistemas e Aplicativos',
    year: '2009-Atualmente',
    link: 'https://www.google.com/search?q=Mr.Goose+Group',
    image_logo: '/imgs/cases/mrgoose.jpeg',
  },
  {
    title: 'Maxmix Comercial Ltda. (Camicado)',
    tooltip: 'Consultoria',
    year: '2010',
    link: 'https://www.camicado.com.br/',
    image_logo: '/imgs/cases/semlogo.png',
  },
  {
    title: 'Agência Pixel Web',
    tooltip: 'Consultoria e Desenvolvido Web Sites',
    year: '2009-2011',
    link: 'https://www.google.com/search?q=Ag%C3%AAncia+Pixel+Web',
    image_logo: '/imgs/cases/semlogo.png',
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
    title: 'Doc88',
    tooltip: 'Desenvolvido Sistemas e WebSites',
    year: '2018',
    link: 'https://www.google.com/search?q=Doc88+empresa+tecnologia',
    image_logo: '/imgs/cases/semlogo.png',
  },
  {
    title: 'Movida (JSL S.A.)',
    tooltip: 'Consultoria de Segurança da informação e correções de vulnerabilidades',
    year: '2018-2019',
    link: 'https://www.movida.com.br/',
    image_logo: '/imgs/cases/semlogo.png',
  },
  {
    title: 'Plataforma Verde',
    tooltip: 'Desenvolvido Sistemas para Prefeitura de SP com uso de IA e Python',
    year: '2019-2020',
    link: 'https://www.plataformaverde.com.br/',
    image_logo: '/imgs/cases/semlogo.png',
  },
  {
    title: 'Grupo Integração',
    tooltip: 'Desenvolvido Sistemas para gestão pública de saúda (SUS)',
    year: '2020',
    link: 'https://www.google.com/search?q=Grupo+Integra%C3%A7%C3%A3o+saude',
    image_logo: '/imgs/cases/grupo_integracao.jpeg',
  },
  {
    title: '2Mundos Inc',
    tooltip: 'Desenvolvido Sistemas e Aplicativos',
    year: '2021',
    link: 'https://www.google.com/search?q=2Mundos+Inc+empresa+tecnologia',
    image_logo: '/imgs/cases/semlogo.png',
  },
  {
    title: 'myasosoftware',
    tooltip: 'Desenvolvido Sistemas e WebSites',
    year: '2022-2023',
    link: 'https://www.google.com/search?q=myasosoftware',
    image_logo: '/imgs/cases/semlogo.png',
  },
  {
    title: 'ICTS',
    tooltip: 'Desenvolvido Sistemas e WebSites',
    year: '2024-Atualmente',
    link: 'https://www.icts.com.br/',
    image_logo: '/imgs/cases/semlogo.png',
  },
  {
    title: 'Âncora Imóveis Venda e Administração',
    tooltip: 'Consultoria',
    year: '2010',
    link: 'https://www.google.com/search?q=%C3%82ncora+Im%C3%B3veis+Venda+e+Administra%C3%A7%C3%A3o',
    image_logo: '/imgs/cases/semlogo.png',
  },
  {
    title: 'Organização Nacional dos Estudantes (ONE - ONG)',
    tooltip: 'Consultoria',
    year: '2010-2011',
    link: 'https://www.google.com/search?q=Organiza%C3%A7%C3%A3o+Nacional+dos+Estudantes+ONE+ONG',
    image_logo: '/imgs/cases/semlogo.png',
  },
  {
    title: 'Minas Agro Produção e Exportação Agro-industrial Ltda.',
    tooltip: 'Consultoria',
    year: '2020-2003',
    link: 'https://www.google.com/search?q=Minas+Agro+Produ%C3%A7%C3%A3o+e+Exporta%C3%A7%C3%A3o+Agro-industrial+Ltda',
    image_logo: '/imgs/cases/semlogo.png',
  },
  {
    title: 'Minas Caju Distribuidora Ltda.',
    tooltip: 'Consultoria',
    year: '2004',
    link: 'https://www.google.com/search?q=Minas+Caju+Distribuidora+Ltda',
    image_logo: '/imgs/cases/semlogo.png',
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

export default function CasesPage() {
  return (
    <>
      <Head>
        <title>Cases de Sucesso - HeRa-i</title>
        <meta name="description" content="Conheça nossos cases de sucesso e projetos realizados para empresas de diversos segmentos." />
      </Head>
      
      <Header />
      <section className="section cases-page" style={{ padding: '120px 0 64px 0' }}>
        <div className="container">
          <h2 className="section-title">Cases de Sucesso</h2>
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
                <div className="cases-page-tooltip pointer-events-none absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-30 flex items-center justify-center w-full h-full">
                  <div className="tooltip-bubble">
                    {c.tooltip}
                    <span className="tooltip-arrow"></span>
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
              href="/#contact" 
              className="inline-block px-6 py-3 bg-lime-500 text-white font-medium rounded-md hover:bg-lime-600 transition-colors"
            >
              Entre em contato
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
} 