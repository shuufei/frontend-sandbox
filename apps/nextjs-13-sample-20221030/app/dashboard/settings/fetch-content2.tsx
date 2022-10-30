import { FC, use } from 'react';

async function getData() {
  return new Promise<{ content: 'content2' }>((resolve) => {
    setTimeout(() => {
      resolve({ content: 'content2' });
    }, 5000);
  });
}

export async function FetchContent2() {
  const data = await getData();
  return (
    <div>
      <h2>Fetch Content2</h2>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}
