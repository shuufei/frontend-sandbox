import { NextApiRequest, NextApiResponse } from 'next';
import jwtDecode from 'jwt-decode';
import { getServiceSupabase } from '../../libs/supabase-client';

type DecodedAccessToken = {
  aud: string;
  sub: string;
  exp: number;
  email: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabase = getServiceSupabase();
  const token = req.cookies['AccessToken'];
  const decoded = jwtDecode(token) as DecodedAccessToken; // TODO: zodなどでshcema validate
  console.log('--- decoded: ', decoded);
  const data = await supabase
    .from('Page_not_rlp')
    .select('*')
    .eq('user_id', decoded.sub);
  console.log('--- data: ', data);
  res.status(200).json(data);
}
