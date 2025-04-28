import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Política de Privacidade - HeRa-i</title>
      </Head>
      <Header />
      <section className="section privacy" style={{ padding: '142px 0' }}>
        <div className="container">
          <h2 className="section-title">Política de Privacidade</h2>
          <p>A HeRa-i respeita a sua privacidade e está comprometida com a proteção dos seus dados pessoais. Esta Política descreve como coletamos, utilizamos e protegemos suas informações.</p>
          
          <h3>1. Coleta de Informações</h3>
          <p>Coletamos informações pessoais que você nos fornece voluntariamente através de formulários de contato, solicitações de orçamento ou cadastro em nossos serviços. As informações podem incluir nome, e-mail, telefone e dados de empresa.</p>
          
          <h3>2. Uso das Informações</h3>
          <p>Utilizamos suas informações para:</p>
          <ul>
            <li>Responder a solicitações de contato e suporte;</li>
            <li>Fornecer nossos serviços e soluções digitais;</li>
            <li>Melhorar continuamente nossos produtos e a experiência do usuário;</li>
            <li>Enviar comunicações de marketing, quando autorizado.</li>
          </ul>

          <h3>3. Compartilhamento de Dados</h3>
          <p>Não compartilhamos suas informações pessoais com terceiros, exceto quando necessário para prestação de serviços contratados ou quando exigido por lei.</p>

          <h3>4. Segurança</h3>
          <p>Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, uso indevido ou divulgação.</p>

          <h3>5. Direitos do Usuário</h3>
          <p>Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Para isso, entre em contato conosco através dos canais oficiais da HeRa-i.</p>

          <h3>6. Alterações nesta Política</h3>
          <p>Reservamo-nos o direito de alterar esta Política de Privacidade a qualquer momento. Recomendamos que você a revise periodicamente.</p>

          <p>Última atualização: Abril de 2025</p>
        </div>
      </section>
      <Footer />
    </>
  );
}
