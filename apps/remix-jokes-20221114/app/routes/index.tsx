import {
  createCookie,
  json,
  LinksFunction,
  LoaderFunction,
} from '@remix-run/cloudflare';
import { Link, useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import stylesUrl from '~/styles/index.css';

declare const ENDPOINT: string;

type Collection = {
  _id: number;
  title: string;
  public: boolean;
};
type GetCollectionsRes = {
  collections: {
    result: boolean;
    items: Collection[];
  };
};

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
  const [collections, setCollectios] = useState<Collection[]>([]);
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

  const getCollections = async () => {
    const res = await fetch('/api/raindrop/collections');
    const body = await res.json<GetCollectionsRes>();
    console.log('--- get collections: ', body);
    setCollectios(body.collections.items);
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
        <div>
          <button onClick={getCollections}>get raindrop collections</button>
        </div>
        <section>
          <h2>collections</h2>
          <ul>
            {collections.map((collection) => {
              return (
                <li key={collection._id}>
                  <Link to={`raindrop/collections/${collection._id}`}>
                    {collection._id}: {collection.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
        {/* <nav>
          <ul>
            <li>
              <Link to="jokes">Read Jokes</Link>
            </li>
          </ul>
        </nav> */}
      </div>
    </div>
  );
}
