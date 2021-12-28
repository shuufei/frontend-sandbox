import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/layout';

export default function FirstPost() {
  return (
    <>
      <Head>
        <title>first post</title>
      </Head>
      <Layout>
        <h1>First Post</h1>
      </Layout>
    </>
  );
}
