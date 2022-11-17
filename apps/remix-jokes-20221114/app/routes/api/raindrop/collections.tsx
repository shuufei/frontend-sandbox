import { json, LoaderFunction } from '@remix-run/cloudflare';
import jwtDecode from 'jwt-decode';
import { accessTokenCookie } from '~/routes/auth/set-cookie';
import { raindropAccessTokenCookie } from './access-token';

type DecodedAccessToken = {
  aud: string;
  sub: string;
  exp: number;
  email: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const cookie = request.headers.get('Cookie');
  const accessToken = await accessTokenCookie.parse(cookie);
  const decoded = jwtDecode(accessToken) as DecodedAccessToken; // TODO: zodなどでshcema validate
  const cacheKey = `collection-${decoded.sub}`;
  const cacheData = await RAINDROP_CACHE.get(cacheKey, {
    type: 'json',
  });
  console.log('---- cache data: ', cacheData);
  if (cacheData) {
    return json({ collections: cacheData });
  }
  const raindropAccessToken = await raindropAccessTokenCookie.parse(cookie);
  const collections = await fetch(
    'https://api.raindrop.io/rest/v1/collections',
    {
      headers: {
        Authorization: `Bearer ${raindropAccessToken}`,
      },
    }
  );
  const body = await collections.json();
  if ((body as any).result) {
    await RAINDROP_CACHE.put(cacheKey, JSON.stringify(body), {
      expirationTtl: 60 * 60 * 24,
    });
  }
  return json({ collections: body });
};
