import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

export default function Layout({
  children,
  home,
}: PropsWithChildren<{ home?: boolean }>) {
  return (
    <div>
      <header>
        {home ? (
          <Image
            priority
            src="/images/uotarou.png"
            height={100}
            width={100}
            alt="profile"
          />
        ) : (
          <Link href="/">
            <a>
              <Image
                priority
                src="/images/uotarou.png"
                height={100}
                width={100}
                alt="profile"
              />
            </a>
          </Link>
        )}
      </header>
      {children}
      {!home && (
        <footer>
          <Link href="/">
            <a>⇦ Back to home</a>
          </Link>
        </footer>
      )}
    </div>
  );
}
