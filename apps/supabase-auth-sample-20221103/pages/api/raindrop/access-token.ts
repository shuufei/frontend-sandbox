import { CookieSerializeOptions, serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

type GetAccessTokenResponse = {
  access_token: string;
  refresh_token: string;
  expires: number;
  expires_in: number;
  token_type: string;
};

// TODO: 共通化
export const setCookies = (
  res: NextApiResponse,
  cookies: {
    name: string;
    value: unknown;
  }[],
  options: CookieSerializeOptions = {}
) => {
  const cookie = cookies.map(({ name, value }) => {
    const stringValue =
      typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);

    if (typeof options.maxAge === 'number') {
      options.expires = new Date(Date.now() + options.maxAge * 1000);
    }
    return serialize(name, stringValue, options);
  });

  res.setHeader('Set-Cookie', cookie);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const clientId = process.env.RAINDROP_CLIENT_ID;
  const clientSecret = process.env.RAINDROP_CLIENT_SECRET;
  const code = req.query.code;
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
    console.log('--- access token: ', body);
    setCookies(
      res,
      [
        { name: 'RaindropAccessToken', value: body.access_token },
        { name: 'RaindropRefreshToken', value: body.refresh_token },
        { name: 'RaindropTokenType', value: body.token_type },
      ],
      {
        path: '/',
        httpOnly: true,
        secure: true,
        maxAge: body.expires_in,
      }
    );
  } catch (error) {
    console.log('--- error: ', error);
  } finally {
    res.redirect('/home');
  }
  return;
}
