import {
  createCookie,
  json,
  LinksFunction,
  LoaderFunction,
} from '@remix-run/cloudflare';
import { Link, useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';
import stylesUrl from '~/styles/index.css';

declare const ENDPOINT: string;

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
  return json({
    endpoint: ENDPOINT,
  });
};

export default function IndexRoute() {
  const { endpoint } = useLoaderData();
  console.log('--- endpoint: ', endpoint);
  useEffect(() => {
    const hash = window.location.hash;
    console.log('---url hash: ', hash);
    const shouldRedirect = hash.startsWith('#access_token=');
    const redirect = async () => {
      await fetch(`${endpoint}/auth/set-cookie`, {
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
  }, [endpoint]);

  const getPages = async () => {
    const res = await fetch('/pages');
    console.log('--- get /pages: ', await res.json());
  };

  const integrateRaindrop = async () => {
    location.href = '/api/raindrop/authorize';
    return;
  };

  return (
    <div className="container">
      <div className="content">
        <h1>
          Remix <span>Jokes!</span>
        </h1>
        <div>
          <button onClick={getPages}>get pages</button>
        </div>
        <div>
          <button onClick={integrateRaindrop}>Raindropと連携</button>
        </div>
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
