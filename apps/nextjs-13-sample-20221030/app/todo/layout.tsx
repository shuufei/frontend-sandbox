import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main>
      <h1>Todos</h1>
      {children}
    </main>
  );
}
