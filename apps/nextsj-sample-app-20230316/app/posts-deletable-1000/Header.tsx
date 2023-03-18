import type { FC } from 'react';

export const Header: FC<{ title: string }> = ({ title }) => {
  return (
    <header
      style={{
        padding: '8px 24px',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #101010',
      }}
    >
      <h1
        style={{
          fontSize: '16px',
        }}
      >
        {title}
      </h1>
      <nav>
        <ul
          style={{
            display: 'flex',
            gap: '2rem',
          }}
        >
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
