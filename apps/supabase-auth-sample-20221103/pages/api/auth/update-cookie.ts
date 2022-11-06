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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookieName = 'supabase-auth-token';
  setCookies(
    res,
    [
      {
        name: cookieName,
        value: req.cookies[cookieName],
      },
    ],
    {
      path: '/',
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24, // TODO: 仮
    }
  );
  res.status(200).end();
}
