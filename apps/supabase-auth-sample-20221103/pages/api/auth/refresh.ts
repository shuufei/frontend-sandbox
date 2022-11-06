import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../libs/supabase-client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const refreshToken = req.cookies['RefreshToken'];
  console.log('--- refresh token: ', refreshToken);
  const refreshRes = await supabase.auth.refreshSession({
    refresh_token: refreshToken,
  });
  console.log('--- refresh res: ', refreshRes);
  res.status(200).end();
}
