import "../styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";

// Carregamento dinâmico do VisitTracker para evitar problemas de SSR e HMR
const VisitTracker = dynamic(
  () => import("../components/VisitTracker"),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>HeRa-i: Agência Inteligente</title>
      </Head>
      <Component {...pageProps} />
      {/* Componente de rastreamento de visitas carregado apenas no cliente */}
      <VisitTracker />
    </>
  );
}
