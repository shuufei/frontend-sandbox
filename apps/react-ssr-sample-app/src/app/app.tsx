import * as React from 'react';
import { FC, useState } from 'react';

export const App: FC = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>Hello World</h1>
      <p>ssr sample</p>
      <section>
        <h2>Counter</h2>
        <p>count: {count}</p>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          increment
        </button>
        <button
          onClick={() => {
            setCount(count - 1);
          }}
        >
          decrement
        </button>
      </section>
    </>
  );
};
