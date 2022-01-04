import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/layout';
import { getSortedPostsData } from '../lib/posts';

type Props = {
  allPostsData: ReturnType<typeof getSortedPostsData>;
};

export function Home({ allPostsData }: Props) {
  console.log('--- props: ', allPostsData);
  return (
    <>
      <Head>
        <title>Top</title>
      </Head>
      <Layout home>
        <section>
          <h2>Blog</h2>
          <ul>
            {allPostsData.map(({ id, date, title }) => (
              <li key={id}>
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <br />
                <small>{date}</small>
              </li>
            ))}
          </ul>
        </section>
      </Layout>
    </>
  );
}

export default Home;

// export async function getServerSideProps() {
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
