import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/layout';

export function Home() {
  return (
    <>
      <Head>
        <title>Top</title>
      </Head>
      <Layout home>
        <h1>Next.js Sample App</h1>

        <nav>
          <ul>
            <li>
              <Link href="/posts/first-post">
                <a>posts/first-post</a>
              </Link>
            </li>
          </ul>
        </nav>

        <section>
          <p>[Your Self Introduction]</p>
        </section>
      </Layout>
    </>
  );
}

export default Home;
