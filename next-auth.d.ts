// nextauth.d.ts
import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

interface IUser extends DefaultUser {
  sub: string;
  group: string[];
}

declare module 'next-auth' {
  interface User extends IUser {}
  interface Session extends DefaultSession {
    accessToken: string | undefined;
    refreshToken: string | undefined;
    expiresAt: number | undefined;
    user: IUser;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends IUser, DefaultJWT {
    access_token: string | undefined;
    refresh_token: string | undefined;
    expires_at: number | undefined;
  }
}
