import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeContextProvider } from '../context/themeStore';
import Head from 'next/head';
import Layout from '../components/Layout';
import WindowSizeContextProvider from '../context/window';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
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
        <WindowSizeContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </WindowSizeContextProvider>
      </ThemeContextProvider>
    </>
  );
}

export default MyApp;
