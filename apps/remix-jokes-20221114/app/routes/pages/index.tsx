import { ActionFunction, json, LoaderFunction } from '@remix-run/cloudflare';
import jwtDecode from 'jwt-decode';
import { accessTokenCookie } from '../auth/set-cookie';
import { getPages } from './get-pages.server';

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
  console.log('--- decoded: ', decoded);
  const data = await getPages(decoded.sub);
  return json(data);
};
