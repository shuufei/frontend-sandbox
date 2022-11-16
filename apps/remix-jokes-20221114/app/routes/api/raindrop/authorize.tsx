import { LoaderFunction, redirect } from '@remix-run/cloudflare';

declare const RAINDROP_CLIENT_ID: string;

export const loader: LoaderFunction = ({ request }) => {
  const clientId = RAINDROP_CLIENT_ID;
  const redirectUrl = `http://localhost:4200/api/raindrop/access-token`;
  const redirecTo = `https://raindrop.io/oauth/authorize?redirect_uri=${redirectUrl}&client_id=${clientId}`;
  return redirect(redirecTo);
};
