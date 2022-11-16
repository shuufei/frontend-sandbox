import {
  CookieOptions,
  createCookie,
  LoaderFunction,
  redirect,
} from '@remix-run/cloudflare';

declare const RAINDROP_CLIENT_ID: string;
declare const RAINDROP_CLIENT_SECRET: string;

type GetAccessTokenResponse = {
  access_token: string;
  refresh_token: string;
  expires: number;
  expires_in: number;
  token_type: string;
};

const cookieOptions: CookieOptions = {
  httpOnly: true,
  path: '/',
  sameSite: 'lax',
  secure: true,
};
const raindropAccessTokenCookie = createCookie(
  'RainAccessToken',
  cookieOptions
);
const raindropRefreshTokenCookie = createCookie(
  'RainAccessToken',
  cookieOptions
);
const raindropTokenType = createCookie('RaindropTokenType', cookieOptions);

export const loader: LoaderFunction = async ({ request, params }) => {
  const clientId = RAINDROP_CLIENT_ID;
  const clientSecret = RAINDROP_CLIENT_SECRET;
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  console.log('--- params: ', code);
  const redirectUrl = `http://localhost:4200/api/raindrop/access-token`;
  try {
    const accessTokenRes = await fetch(
      'https://api.raindrop.io/v1/oauth/access_token',
      {
        method: 'post',
        body: JSON.stringify({
          grant_type: 'authorization_code',
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUrl,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const body = (await accessTokenRes.json()) as GetAccessTokenResponse;
    const options = { expires: new Date(Date.now() + body.expires_in * 1000) };
    console.log(
      '--- access token: ',
      body,
      body.expires_in,
      options.expires.toISOString()
    );
    const headers = new Headers();
    headers.append(
      'Set-Cookie',
      await raindropAccessTokenCookie.serialize(body.access_token, options)
    );
    headers.append(
      'Set-Cookie',
      await raindropRefreshTokenCookie.serialize(body.refresh_token, options)
    );
    headers.append(
      'Set-Cookie',
      await raindropTokenType.serialize(body.token_type, options)
    );
    return redirect('/', {
      headers,
    });
  } catch (error) {
    console.log('--- error: ', error);
    return redirect('/');
  }
};
