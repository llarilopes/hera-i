import "../styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

// Carregamento dinâmico do VisitTracker para evitar problemas de SSR e HMR
const VisitTracker = dynamic(
  () => import("../components/VisitTracker"),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      {/* Componente de rastreamento de visitas carregado apenas no cliente */}
      <VisitTracker />
    </>
  );
}
