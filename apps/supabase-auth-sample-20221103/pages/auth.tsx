import { useEffect, useState } from 'react';
import { supabase } from '../libs/supabase-client';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';

export default function AuthPage() {
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    const cookie = document.cookie;
    const shuoldUpdateCookie = cookie.includes('supabase-auth-token');
    console.log('--- should update cookie: ', cookie, shuoldUpdateCookie);
    if (shuoldUpdateCookie) {
      fetch('/api/auth/update-cookie');
    }
  }, []);

  return (
    <main>
      <h1>Auth</h1>
      <div className="row flex flex-center">
        <div>
          <div>
            <button
              onClick={() => {
                fetch('/api/me');
                return;
              }}
            >
              get me
            </button>
          </div>

          <div>
            <button
              onClick={async () => {
                const user = await supabaseClient.auth.getUser();
                console.log('--- user: ', user);
              }}
            >
              get me from client
            </button>
          </div>

          <div>
            <button
              onClick={() => {
                fetch('/api/auth/update-cookie');
                return;
              }}
            >
              update cookie for secure
            </button>
          </div>
        </div>

        <Auth
          redirectTo="http://localhost:4200/auth"
          appearance={{ theme: ThemeSupa }}
          supabaseClient={supabaseClient}
          providers={['google']}
          onlyThirdPartyProviders={true}
        />
      </div>
    </main>
  );
}
