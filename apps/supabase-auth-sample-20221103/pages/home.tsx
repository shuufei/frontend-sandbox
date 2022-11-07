import { FC } from 'react';

const Home: FC = () => {
  return (
    <>
      <h1>Home</h1>

      <section>
        <h2>from server</h2>
        <button
          onClick={async () => {
            location.href = '/api/raindrop/authorize';
          }}
        >
          Raindropと連携
        </button>
      </section>
    </>
  );
};

export default Home;
