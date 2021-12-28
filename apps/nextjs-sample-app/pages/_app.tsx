import { css } from '@emotion/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/global.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to nextjs-sample-app!</title>
      </Head>
      <main
        className="app"
        css={css`
          padding: 2rem;
        `}
      >
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
