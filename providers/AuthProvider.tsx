'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import SessionCheck from './SessionCheck';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Create a client
  // const { data: session } = useSession();

  return (
    <SessionProvider>
      <SessionCheck>{children}</SessionCheck>
    </SessionProvider>
  );
};

export default AuthProvider;
