import { ActionFunction, json, LoaderFunction } from '@remix-run/cloudflare';
import { createClient } from '@supabase/supabase-js';

declare var NX_NEXT_PUBLIC_SUPABASE_URL: string;
declare var SUPABASE_SERVICE_KEY: string;

export const getServiceSupabase = () =>
  createClient(NX_NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY);

export const getPages = async (userId: string) => {
  const supabase = getServiceSupabase();
  const data = await supabase
    .from('Page_not_rlp')
    .select('*')
    .eq('user_id', userId);
  console.log('--- data: ', data);
  return { data };
};
