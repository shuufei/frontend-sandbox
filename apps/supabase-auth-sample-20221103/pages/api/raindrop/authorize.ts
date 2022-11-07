import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const clientId = process.env.RAINDROP_CLIENT_ID;
  const redirectUrl = `http://localhost:4200/api/raindrop/access-token`;
  const redirecTo = `https://raindrop.io/oauth/authorize?redirect_uri=${redirectUrl}&client_id=${clientId}`;
  res.redirect(redirecTo);
  return;
}
