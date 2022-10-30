import { FC } from 'react';
import Link from 'next/link';

const Dashboard: FC = () => {
  return (
    <>
      <h1>Dashboard Top</h1>
      <Link href="/dashboard/settings">settings</Link>
    </>
  );
};

export default Dashboard;
