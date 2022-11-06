import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <>
      <Head>
        <title>Welcome to supabase-auth-sample-20221103!</title>
      </Head>
      <SessionContextProvider supabaseClient={supabaseClient}>
        <Component {...pageProps} />
      </SessionContextProvider>
    </>
  );
}

export default CustomApp;
