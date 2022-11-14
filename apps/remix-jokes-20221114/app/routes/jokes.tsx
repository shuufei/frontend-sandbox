import {
  createCookie,
  LinksFunction,
  LoaderFunction,
} from '@remix-run/cloudflare';
import { Outlet, useLoaderData } from '@remix-run/react';

import stylesUrl from '~/styles/jokes.css';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesUrl }];
};

const cookie001 = createCookie('samplecookie001', {
  expires: new Date(Date.now() + 60_000),
  httpOnly: true,
  maxAge: 60,
  path: '/',
  sameSite: 'lax',
  secure: true,
});
const cookie002 = createCookie('samplecookie002', {
  expires: new Date(Date.now() + 60_000),
  httpOnly: true,
  maxAge: 60,
  path: '/',
  sameSite: 'lax',
  secure: true,
});

export const loader: LoaderFunction = async ({ request }) => {
  const cookieValue = await cookie001.parse(request.headers.get('Cookie'));
  console.log('--- cookie value: ', cookieValue);
  const headers = new Headers();
  headers.append(
    'Set-Cookie',
    await cookie001.serialize({
      accessToken: '01-xxxx',
      refreshToken: '01-yyyy',
    })
  );
  headers.append(
    'Set-Cookie',
    await cookie002.serialize({
      accessToken: '02-xxxx',
      refreshToken: '02-yyyy',
    })
  );
  return new Response(JSON.stringify({}), {
    headers,
  });
};

export default function JokesRoute() {
  useLoaderData();
  return (
    <div>
      <h1>J🤪KES</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
