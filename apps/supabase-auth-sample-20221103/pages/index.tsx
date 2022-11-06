import { useEffect } from 'react';
import { useRouter } from 'next/router';

export function Index() {
  const router = useRouter();
  // useEffect(() => {
  //   const hash = window.location.hash;
  //   console.log('---url hash: ', hash);
  //   const shouldRedirect = hash.startsWith('#access_token=');
  //   const redirect = async () => {
  //     await fetch('http://localhost:4200/api/auth/set-cookie', {
  //       method: 'POST',
  //       body: JSON.stringify({ hash }),
  //     });
  //     router.push('/home');
  //   };
  //   if (shouldRedirect) {
  //     redirect();
  //     return;
  //   }
  //   router.push('/home');
  // }, [router]);
  return (
    <div>
      <h1>Redirect...</h1>
    </div>
  );
}

export default Index;
