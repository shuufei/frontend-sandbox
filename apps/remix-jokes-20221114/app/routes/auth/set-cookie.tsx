import {
  ActionFunction,
  CookieOptions,
  createCookie,
  json,
  LoaderFunction,
} from '@remix-run/cloudflare';

const parseToken = (
  hash: string
): {
  accessToken: string;
  expires: string;
  providerToken: string;
  refreshToken: string;
  tokenType: string;
} => {
  const splitted = hash.split('&');
  const accessToken = splitted[0].split('#access_token=')[1];
  const expires = splitted[1].split('expires_in=')[1];
  const providerToken = splitted[2].split('provider_token=')[1];
  const refreshToken = splitted[3].split('refresh_token=')[1];
  const tokenType = splitted[4].split('token_type=')[1];
  return {
    accessToken,
    expires,
    providerToken,
    refreshToken,
    tokenType,
  };
};

const cookieOptions: CookieOptions = {
  httpOnly: true,
  path: '/',
  sameSite: 'lax',
  secure: true,
};
export const accessTokenCookie = createCookie('AccessToken', cookieOptions);
const refreshTokenCookie = createCookie('RefreshToken', cookieOptions);
const tokenTypeCookie = createCookie('TokenType', cookieOptions);

export const loader: LoaderFunction = async ({ request }) => {
  // const body = await request.json();
  // console.log('--- body: ', body);
  console.log('--- method: ', request.method);
  return json({ message: 'hello get' });
};

export const action: ActionFunction = async ({ request }) => {
  const body = await request.json<{ hash: string }>();
  console.log('--- body: ', body);
  const { accessToken, expires, refreshToken, tokenType } = parseToken(
    body.hash
  );

  const headers = new Headers();
  const options = { expires: new Date(Date.now() + Number(expires) * 1000) };
  console.log(
    '--- expire: ',
    options.expires.toISOString(),
    Date.now(),
    expires
  );
  headers.append(
    'Set-Cookie',
    await accessTokenCookie.serialize(accessToken, options)
  );
  headers.append(
    'Set-Cookie',
    await refreshTokenCookie.serialize(refreshToken, options)
  );
  headers.append(
    'Set-Cookie',
    await tokenTypeCookie.serialize(tokenType, options)
  );
  return new Response(null, {
    headers,
  });
};
