import { FC, useState } from 'react';

const fetchData = () => {
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

export const Counter: FC = () => {
  const [count, setCount] = useState(0);
  const [timestamp, setTimestamp] = useState(new Date().valueOf());

  console.log('--- render counter: ', count);

  throw new Promise((resolve) => setTimeout(resolve, 1000));

  const increment = () => {
    setCount(count + 1);
    fetchData().then(() => {
      setTimestamp(new Date().valueOf());
    });
  };

  return (
    <>
      <h2>Counter</h2>
      <p>count: {count}</p>
      <p>timestamp: {timestamp}</p>
      <button onClick={increment}>increment</button>
      <button>decrement</button>
    </>
  );
};
