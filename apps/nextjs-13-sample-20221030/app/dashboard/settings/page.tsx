import { FC, Suspense } from 'react';
import { Counter } from './counter';
import { FetchContent1 } from './fetch-content1';
import { FetchContent2 } from './fetch-content2';
import { NavBar } from './nav-bar';

async function getData() {
  return new Promise<{ content: 'dashboard/settings' }>((resolve) => {
    setTimeout(() => {
      resolve({ content: 'dashboard/settings' });
    }, 1000);
  });
}


const Loading1: FC = () => {
  return <p>Loading1...</p>
}

const Loading2: FC = () => {
  return <p>Loading2...</p>
}

export async function DashboardSettings() {
  const data = await getData();
  return (
    <>
      <h1>Dashboard Settings</h1>
      <p>data: {JSON.stringify(data)}</p>
      <Counter />
      <Suspense fallback={<Loading1 />}>
        <FetchContent1 />
      </Suspense>
      <Suspense fallback={<Loading2 />}>
        <FetchContent2 />
      </Suspense>
      <NavBar />
    </>
  );
};

export default DashboardSettings;
