import { ReactNode, Suspense } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <header>header</header>
      <Suspense fallback={<p>loading layout...</p>}>
      <main>{children}</main>
      </Suspense>
    </>
  );
}
