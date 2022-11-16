// import Button from "~/components/button.client";
// import { supabase } from "~/libs/supabase-client";
import { useLoaderData } from '@remix-run/react';
import { LoaderFunction } from '@remix-run/server-runtime';
// import Button from "~/components/button";
// import { getSupabaseForBrowser } from "~/libs/supabase-client";
import { createClient } from '@supabase/supabase-js';

export const getSupabaseForBrowser = (
  supabaseUrl: string,
  supabaseAnonKey: string
) => createClient(supabaseUrl, supabaseAnonKey);

type LoadData = {
  supabaseUrl: string;
  supabaseAnonKey: string;
  endpoint: string;
};

declare var NX_NEXT_PUBLIC_SUPABASE_URL: string;
declare var NX_NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
declare const ENDPOINT: string;

export const loader: LoaderFunction = () => {
  console.log('--- process env: ', NX_NEXT_PUBLIC_SUPABASE_URL);
  return {
    supabaseUrl: NX_NEXT_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: NX_NEXT_PUBLIC_SUPABASE_ANON_KEY,
    endpoint: ENDPOINT,
  };
};

export default function Auth() {
  // const refreshSession = () => {
  //   supabase.auth.refreshSession();
  // };
  const { supabaseUrl, supabaseAnonKey, endpoint } = useLoaderData<LoadData>();
  console.log('--- supabaseurl: ', supabaseUrl);
  const signInWithGoogle = async () => {
    console.log('--- sign in with google');
    const supabase = getSupabaseForBrowser(supabaseUrl, supabaseAnonKey);
    const data = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${endpoint}`,
      },
    });
    console.log('--- signin res: ', data);
  };
  const postTest = async () => {
    fetch('/auth/set-cookie', {
      method: 'POST',
      body: JSON.stringify({}),
    });
  };
  return (
    <main className="p-4">
      <h1>Auth</h1>
      <div className="mt-2">
        <button onClick={signInWithGoogle}>signin with google</button>
      </div>
      {/* <div className="mt-2">
        <Button onClick={refreshSession}>refresh session</Button>
      </div> */}
      <div>
        <button onClick={postTest}>post test</button>
      </div>
    </main>
  );
}
