'use client';

import React from 'react';
import { TokenSet } from 'next-auth';
import { signIn, signOut, useSession } from 'next-auth/react';
import axios from 'axios';
import { JwtPayload, jwtDecode } from 'jwt-decode';

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

    const response = await axios.post(
      `https://auth-api-test.construo.no/connect/token`,
      requestData,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        // body: requestData,
        // method: 'POST',
      }
    );

    const tokens: TokenSet = await response.data;

    console.log('RENEW', tokens);

    let expiresAt;

    if (!!tokens.access_token && tokens.access_token.length) {
      const jwt_Token_decoded: JwtPayload = jwtDecode(tokens.access_token);

      const tokenExpIn = jwt_Token_decoded.exp
        ? jwt_Token_decoded.exp - Math.floor(Date.now() / 1000)
        : -1;

      console.log('tokenExpIn', tokenExpIn);
    }

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

          <button onClick={() => signOut()}>Sign out</button>
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
