import { FC, use } from 'react';
import { Counter } from './counter';

async function getData() {
  return new Promise<{ content: 'content1' }>((resolve) => {
    setTimeout(() => {
      resolve({ content: 'content1' });
    }, 2000);
  });
}

export async function FetchContent1() {
  const data = await getData();
  return (
    <div>
      <h2>Fetch Content1</h2>
      <Counter />
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}
