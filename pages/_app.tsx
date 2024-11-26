import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Header } from "@/components/pages/Header";


export default function App({ Component, pageProps }: AppProps) {
  return<>
  <Header/>
  <main>
  <Component {...pageProps} />
  </main>
   </>
}
