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
        
        {/* Meta Tags Open Graph Básicas */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hera-i.com.br" />
        <meta property="og:site_name" content="HeRa-i" />
        <meta property="og:title" content="HeRa-i Agência inteligente" />
        <meta property="og:description" content="Quase 30 anos de experiência em desenvolvimento web e sistemas digitais." />
        <meta property="og:locale" content="pt_BR" />
        
        {/* Múltiplas imagens Open Graph para diferentes plataformas */}
        {/* Imagem quadrada (1:1) - Preferida pelo WhatsApp */}
        <meta property="og:image" content="https://hera-i.com.br/imgs/og-image-800x800.png" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="800" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="HeRa-i Agência inteligente" />
        
        {/* Imagem principal formato paisagem (1.91:1) - Preferida pelo Facebook */}
        <meta property="og:image" content="https://hera-i.com.br/imgs/og-image-1200x630.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="HeRa-i Agência inteligente - Desenvolvimento Web" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HeRa-i Agência inteligente" />
        <meta name="twitter:description" content="Quase 30 anos de experiência em desenvolvimento web e sistemas digitais." />
        <meta name="twitter:image" content="https://hera-i.com.br/imgs/twitter-card-1200x600.png" />
        <meta name="twitter:image:alt" content="HeRa-i Agência inteligente - Desenvolvimento Web e Sistemas Digitais" />
        
        {/* Meta tags adicionais para SEO */}
        <meta property="og:updated_time" content="2025-06-15T08:30:00+00:00" />
        <meta name="author" content="HeRa-i" />
        <meta name="theme-color" content="#a3ff00" />
        
        {/* Schema.org para Rich Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              'name': 'HeRa-i',
              'url': 'https://hera-i.com.br',
              'logo': 'https://hera-i.com.br/imgs/og-image-800x800.png',
              'description': 'Quase 30 anos de experiência em desenvolvimento web e sistemas digitais.',
              'contactPoint': {
                '@type': 'ContactPoint',
                'contactType': 'customer service'
              }
            })
          }}
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
