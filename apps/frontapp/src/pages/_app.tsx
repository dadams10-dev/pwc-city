import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import '@city-frontend-test/ui/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>ManCity Search</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </QueryClientProvider>
  );
}

export default CustomApp;
