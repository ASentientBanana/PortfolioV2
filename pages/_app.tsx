import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme';
import { NavContextProvider } from '../context/navbarStore';
import Head from 'next/head';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NavContextProvider>
      <Head>
        <title>Portfolio</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cutive+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </NavContextProvider>
  );
}

export default MyApp;
