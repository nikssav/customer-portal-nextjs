// 'use client';

import { Session, TokenSet } from 'next-auth';
import { signIn, signOut, getSession, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { GetTokenParams, getToken } from 'next-auth/jwt';

export default function Home() {
  // const [session, setSession] = useState<Session | null>(null);

  // const getSessionAsync = async () => {
  //   const session = await getSession();
  //   setSession(session);
  //   return session;
  // };

  // useEffect(() => {
  //   getSessionAsync();
  // }, []);

  // console.log('session', session);

  // const { data: session, update } = useSession();

  // const renewToken = async () => {
  //   await update({
  //     ...session,
  //     accessToken: 'new_token',
  //   });
  //   const requestData = new URLSearchParams();
  //   requestData.append('client_id', 'prdt-CustomerPortal');
  //   requestData.append('grant_type', 'refresh_token');
  //   requestData.append('refresh_token', session?.refreshToken as string);

  //   console.log('requestData', requestData);

  //   const response = await fetch(
  //     `https://auth-api-test.construo.no/connect/token`,
  //     {
  //       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  //       body: requestData,
  //       method: 'POST',
  //     }
  //   );

  //   const tokens: TokenSet = await response.json();

  //   console.log('RENEW', tokens);
  // };

  // const logSession = () => {
  //   console.log('session', session);
  // };

  return (
    <>
      <h1>Home page</h1>
      <p>
        This is public page that can be accessed without user authentication
      </p>
      {/* {!!session ? (
        <>
          <p>{session?.user?.name}</p>
          <button onClick={renewToken}>Renew token</button>
          <button onClick={logSession}>Log session</button>
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
      )} */}
    </>
  );
}
