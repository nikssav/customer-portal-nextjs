'use client';

import React from 'react';
import { TokenSet } from 'next-auth';
import { signIn, signOut, useSession } from 'next-auth/react';

const Profile = () => {
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

  const { data: session, update } = useSession();

  const renewToken = async () => {
    const requestData = new URLSearchParams();
    requestData.append('client_id', 'prdt-CustomerPortal');
    requestData.append('grant_type', 'refresh_token');
    requestData.append('refresh_token', session?.refreshToken as string);

    console.log('requestData', requestData);

    const response = await fetch(
      `https://auth-api-test.construo.no/connect/token`,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: requestData,
        method: 'POST',
      }
    );

    const tokens: TokenSet = await response.json();
    // const renew = await fetch(
    //   'https://auth-api-test.construo.no/connect/token',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //       response_type: 'token',
    //       // authorization: `Barear ${session?.accessToken}`,
    //     },
    //     body: JSON.stringify({
    //       grant_type: 'refresh_token',
    //       client_id: 'prdt-CustomerPortal',
    //       refresh_token: session?.refreshToken,
    //     }),
    //   }
    // );
    // const data = await renew.json();
    console.log('RENEW', tokens);

    await update({
      ...session,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresAt: tokens.expires_in,
    });
  };

  const logSession = () => {
    console.log('session', session);
  };
  return (
    <div className='buttons' style={{ marginLeft: 'auto' }}>
      {!!session ? (
        <ul>
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
        </ul>
      ) : (
        <ul>
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
        </ul>
      )}
    </div>
  );
};

export default Profile;
