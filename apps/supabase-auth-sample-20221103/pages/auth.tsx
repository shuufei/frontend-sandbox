import { supabase } from '../libs/supabase-client';

export default function Auth() {
  const signInWithGoogle = async () => {
    const data = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'http://localhost:4200/' },
    });
    console.log('--- signin res: ', data);
    supabase.auth.refreshSession();
  };

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Supabase + Next.js</h1>
        <div>
          <button onClick={signInWithGoogle}>SignIn with Google</button>
        </div>

        <div>
          <button
            onClick={() => {
              fetch('/api/auth/refresh');
            }}
          >
            Refresh Token
          </button>
        </div>
      </div>
    </div>
  );
}
