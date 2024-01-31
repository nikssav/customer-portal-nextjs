'use client';

import { useSession, signIn, signOut, getSession } from 'next-auth/react';

export default function Home() {
  // const { data: session } = useSession();
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
  const getSessionAsync = async () => {
    const session = await getSession();
    console.log(session);
    return session;
  };
  getSessionAsync();

  return (
    <>
      <h1>Home page</h1>
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
  );
}
