import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Terms() {
  return (
    <>
      <Head>
        <title>Termos de Serviço - HeRa-i</title>
      </Head>
      <Header />
      <section className="section terms" style={{ padding: '142px 0' }}>
        <div className="container">
          <h2 className="section-title">Termos de Serviço</h2>
          <p>Ao acessar e utilizar os serviços da HeRa-i, você concorda com os seguintes Termos de Serviço. Leia-os atentamente antes de utilizar nossos produtos ou contratar nossos serviços.</p>
          
          <h3>1. Aceitação dos Termos</h3>
          <p>O uso dos sites, plataformas e serviços da HeRa-i implica na aceitação integral dos presentes Termos de Serviço. Caso não concorde, solicitamos que não utilize nossos serviços.</p>

          <h3>2. Serviços Oferecidos</h3>
          <p>A HeRa-i oferece desenvolvimento de websites, plataformas web, aplicativos móveis, sistemas inteligentes e consultoria digital especializada.</p>

          <h3>3. Cadastro e Responsabilidades</h3>
          <p>Ao se cadastrar ou contratar nossos serviços, você concorda em fornecer informações verdadeiras, completas e atualizadas. Você é responsável pela segurança de suas credenciais de acesso.</p>

          <h3>4. Propriedade Intelectual</h3>
          <p>Todo o conteúdo desenvolvido ou fornecido pela HeRa-i, incluindo códigos, textos, imagens, marcas e logotipos, é protegido por leis de propriedade intelectual e não pode ser utilizado sem autorização prévia e por escrito.</p>

          <h3>5. Limitação de Responsabilidade</h3>
          <p>A HeRa-i não se responsabiliza por danos diretos, indiretos ou incidentais resultantes do uso ou da incapacidade de uso dos seus serviços.</p>

          <h3>6. Cancelamento e Suspensão</h3>
          <p>A HeRa-i se reserva o direito de suspender ou cancelar qualquer serviço em caso de descumprimento destes Termos ou por motivos de segurança.</p>

          <h3>7. Modificações nos Termos</h3>
          <p>Podemos atualizar estes Termos de Serviço a qualquer momento. As alterações entrarão em vigor assim que publicadas em nosso site.</p>

          <p>Última atualização: Abril de 2025</p>
        </div>
      </section>
      <Footer />
    </>
  );
}
