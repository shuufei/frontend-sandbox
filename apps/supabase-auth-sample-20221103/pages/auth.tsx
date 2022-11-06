import { useState } from 'react';
import { supabase } from '../libs/supabase-client';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const signIn = async (email) => {
  //   try {
  //     setLoading(true);
  //     const data = await supabase.auth.signInWithOtp({
  //       email,
  //       options: {
  //         emailRedirectTo: 'http://localhost:4200/api/auth/callback',
  //       },
  //     });
  //     console.log('--- signin result: ', data);
  //     if (data.error) throw data.error;
  //     alert('Check your email for the login link!');
  //   } catch (error) {
  //     alert(error.error_description || error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const signUp = async (email: string, password: string) => {
  //   try {
  //     setLoading(true);
  //     const data = await supabase.auth.signUp({
  //       email,
  //       password,
  //     });
  //     console.log('--- response signup: ', data);
  //     if (data.error) throw data.error;
  //     alert('Check your email for the login link!');
  //   } catch (error) {
  //     alert(error.error_description || error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const signInWithGitHub = async () => {
  //   const data = await supabase.auth.signInWithOAuth({ provider: 'github' });
  //   console.log('--- signin res: ', data);
  // };

  const signInWithGoogle = async () => {
    const data = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'http://localhost:4200/api/auth/callback' },
    });
    console.log('--- signin res: ', data);
  };

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Supabase + Next.js</h1>
        {/* <div>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="inputField"
            type="text"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div> */}
        <div>
          {/* <button
            onClick={(e) => {
              e.preventDefault();
              signUp(email, password);
            }}
            className="button block"
            disabled={loading}
          >
            <span>{'SignUp'}</span>
          </button> */}
          {/* <button
            onClick={(e) => {
              e.preventDefault();
              signIn(email);
            }}
          >
            send magic link
          </button> */}
        </div>
        <div>
          {/* <button onClick={signInWithGitHub}>SignIn with GitHub</button> */}
          <button onClick={signInWithGoogle}>SignIn with Google</button>
        </div>
      </div>
    </div>
  );
}
