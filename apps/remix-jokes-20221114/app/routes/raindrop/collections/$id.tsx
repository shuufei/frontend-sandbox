import { json, LoaderFunction } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import jwtDecode from 'jwt-decode';
import { raindropAccessTokenCookie } from '~/routes/api/raindrop/access-token';
import { accessTokenCookie } from '~/routes/auth/set-cookie';

type DecodedAccessToken = {
  aud: string;
  sub: string;
  exp: number;
  email: string;
};

type Raindrop = {
  _id: number;
  title: string;
  lastUpdate: string;
  link: string;
  cover: string;
};
type LoadData = {
  collection: {
    result: boolean;
    collectionId: number;
    items: Raindrop[];
  };
};

export const loader: LoaderFunction = async ({ request, params }) => {
  console.log('--- params: ', params);
  const collectionId = params.id;
  const cookie = request.headers.get('Cookie');
  const accessToken = await accessTokenCookie.parse(cookie);
  const decoded = jwtDecode(accessToken) as DecodedAccessToken; // TODO: zodなどでshcema validate
  const cacheKey = `collection-${collectionId}-${decoded.sub}`;
  const cacheData = await RAINDROP_CACHE.get(cacheKey, {
    type: 'json',
  });
  console.log('---- cache data: ', cacheData);
  if (cacheData) {
    return json({ collection: cacheData });
  }
  const raindropAccessToken = await raindropAccessTokenCookie.parse(cookie);
  const res = await fetch(
    `https://api.raindrop.io/rest/v1/raindrops/${collectionId}`,
    {
      headers: {
        Authorization: `Bearer ${raindropAccessToken}`,
      },
    }
  );
  const collection = await res.json();
  if ((collection as any).result) {
    await RAINDROP_CACHE.put(cacheKey, JSON.stringify(collection), {
      expirationTtl: 60 * 60 * 24,
    });
  }
  return json({ collection });
};

export default function CollectionDetailPage() {
  const { collection } = useLoaderData<LoadData>();
  console.log('--- collection: ', collection);
  return (
    <main>
      <h1>collection detail: {collection.collectionId}</h1>
      <ul>
        {collection.items.map((item) => {
          return (
            <li key={item._id}>
              <a href={item.link}>
                {item._id}: {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
