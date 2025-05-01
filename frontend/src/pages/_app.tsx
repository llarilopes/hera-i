import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Importar o VisitTracker dinamicamente para evitar problemas de SSR
const VisitTracker = dynamic(() => import("../components/VisitTracker"), {
  ssr: false
});

export default function App({ Component, pageProps }: AppProps) {
  const [isBrowser, setIsBrowser] = useState(false);

  // Garantir que o VisitTracker só seja renderizado no cliente
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  return (
    <>
      <Component {...pageProps} />
      {isBrowser && <VisitTracker />}
    </>
  );
}
