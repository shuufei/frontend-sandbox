import { CookieSerializeOptions, serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body) as { hash: string };
  const { accessToken, expires, refreshToken, tokenType } = parseToken(
    body.hash
  );
  setCookies(
    res,
    [
      { name: 'AccessToken', value: accessToken },
      { name: 'RefreshToken', value: refreshToken },
      { name: 'TokenType', value: tokenType },
    ],
    {
      path: '/',
      httpOnly: true,
      secure: true,
      maxAge: Number(expires),
    }
  );
  res.status(200).end();
}
