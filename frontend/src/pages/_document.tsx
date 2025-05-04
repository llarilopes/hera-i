import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="description" content="HeRa-i: Inteligência, Tecnologia e Resultados para o seu Negócio. Desenvolvimento de sites, sistemas e soluções digitais sob medida." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="icon" href="/imgs/favicon.ico" type="image/x-icon" />
        {/* Meta Tags Sociais e Open Graph */}
        {/* Open Graph padrão */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hera-i.com.br" />
        <meta property="og:title" content="HeRa-i Agência inteligente" />
        <meta property="og:description" content="Quase 30 anos de experiência em desenvolvimento web e sistemas digitais." />
        <meta property="og:image" content="https://hera-i.com.br/imgs/open_graph_hera.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="HeRa-i" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://hera-i.com.br" />
        <meta name="twitter:title" content="HeRa-i Agência inteligente" />
        <meta name="twitter:description" content="Quase 30 anos de experiência em desenvolvimento web e sistemas digitais." />
        <meta name="twitter:image" content="https://hera-i.com.br/imgs/open_graph_hera.png" />

        {/* Extras para SEO/social */}
        <meta name="author" content="HeRa-i" />
        <meta name="theme-color" content="#a3ff00" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
