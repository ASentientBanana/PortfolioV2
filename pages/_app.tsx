import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeContextProvider } from '../context/themeStore';
import { NavContextProvider } from '../context/navbarStore';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NavContextProvider>
       <Head>
        <title>Petar Kocic</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cutive+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeContextProvider>
          <Component {...pageProps} />
      </ThemeContextProvider>
    </NavContextProvider>
  );
}

export default MyApp;
