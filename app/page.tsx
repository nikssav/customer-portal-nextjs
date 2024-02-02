'use client';

import { Session } from 'next-auth';
import { signIn, signOut, getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { GetTokenParams, getToken } from 'next-auth/jwt';

export default function Home() {
  // if (session) {
  //   return (
  //     <>
  //       <h1>Home page</h1>
  //       <p>{session?.user?.email}</p>
  //       <button onClick={() => signOut()}>Sign in</button>
  //     </>
  //   );
  // } else {
  //   return (
  //     <>
  //       <h1>Home page</h1>
  //       <button onClick={() => signIn('identity-server4')}>Sign in</button>
  //     </>
  //   );
  // }
  const [session, setSession] = useState<Session | null>(null);

  const getSessionAsync = async () => {
    const session = await getSession();
    setSession(session);
    return session;
  };

  useEffect(() => {
    getSessionAsync();
  }, []);

  console.log('session', session);

  return (
    <>
      <h1>Home page</h1>
      {!!session ? (
        <>
          <p>{session?.user?.name}</p>
          <button
            onClick={() =>
              // signIn('auth-api', {
              //   // callbackUrl: 'https://localhost:3000',
              //   // redirect: true,
              // })
              signOut()
            }
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() =>
              // signIn('auth-api', {
              //   // callbackUrl: 'https://localhost:3000',
              //   // redirect: true,
              // })
              signIn('auth-api')
            }
          >
            Sign in
          </button>
        </>
      )}
    </>
  );
}
