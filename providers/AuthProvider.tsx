'use client';

import { SessionProvider } from 'next-auth/react';
import SessionCheck from './SessionCheck';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider refetchInterval={1 * 60}>
      <SessionCheck>{children}</SessionCheck>
    </SessionProvider>
  );
};

export default AuthProvider;
