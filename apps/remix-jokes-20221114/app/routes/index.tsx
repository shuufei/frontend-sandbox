import {
  createCookie,
  json,
  LinksFunction,
  LoaderFunction,
} from '@remix-run/cloudflare';
import { Link, useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';
import stylesUrl from '~/styles/index.css';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesUrl }];
};

export const loader: LoaderFunction = async ({ request }) => {
  const cookie = request.headers.get('Cookie');
  const accessTokenCookie = createCookie('AccessToken');
  const refreshTokenCookie = createCookie('RefreshToken');
  const accessToken = await accessTokenCookie.parse(cookie);
  const refreshToken = await refreshTokenCookie.parse(cookie);
  console.log('--- token: ', accessToken, refreshToken);
  return json({});
};

export default function IndexRoute() {
  useLoaderData();
  useEffect(() => {
    const hash = window.location.hash;
    console.log('---url hash: ', hash);
    const shouldRedirect = hash.startsWith('#access_token=');
    const redirect = async () => {
      await fetch('http://localhost:4200/auth/set-cookie', {
        method: 'POST',
        body: JSON.stringify({ hash }),
      });
      // navigate(`/auth/set-cookie?hash=${hash}`);
      // router.push('/home');
    };
    if (shouldRedirect) {
      redirect();
      return;
    }
    // router.push('/home');
  }, []);
  return (
    <div className="container">
      <div className="content">
        <h1>
          Remix <span>Jokes!</span>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to="jokes">Read Jokes</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
