import { FC } from 'react';
import Link from 'next/link';

const Dashboard: FC = () => {
  return (
    <>
      <h1>Dashboard Top</h1>
      {new Array(100).fill(null).map((num, i) => {
        return (
          <p
            key={i}
            style={{
              padding: '1rem',
              borderBottom: '1px',
              borderColor: 'red',
              background: 'white',
              color: 'black'
            }}
          >
            {i}
            <Link href="/dashboard/settings">settings</Link>
          </p>
        );
      })}
    </>
  );
};

export default Dashboard;
