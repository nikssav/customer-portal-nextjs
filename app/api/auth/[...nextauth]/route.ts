// import NextAuth, { Session, User, TokenSet } from 'next-auth';
import NextAuth, { User, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import IdentityServer4Provider from 'next-auth/providers/identity-server4';

const handler = NextAuth({
  providers: [
    IdentityServer4Provider({
      id: 'auth-api',
      name: 'AuthAPI',
      type: 'oauth',
      issuer: process.env.AUTH_ISSUER,
      clientId: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      authorization: {
        params: {
          scope: process.env.AUTH_SCOPE,
        },
      },
      // idToken: true,
    }),
  ],
  // Not providing any secret or NEXTAUTH_SECRET will throw an error in production.
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log('Sign In: ', user, account, profile, email, credentials);
      return true;
    },
    // async redirect({ url, baseUrl }) {
    //   console.log('Redirect: ', url, baseUrl);
    //   return 'https://localhost:3030';
    // },

    async jwt({ token, account, profile, trigger, session }) {
      if (trigger === 'update') {
        console.log('update triggered', session);
        token.access_token = session.accessToken;
        token.refresh_token = session.refreshToken;
        token.expires_at = session.expiresAt;
        console.log('update triggered', token);
        // return {
        // ...session,
        // accessToken: session.accessToken,
        // ...token,
        // ...account,
        // };
        return token;
      }

      if (account) {
        token.accessToken = account.access_token;
        token.refresh_token = account.refresh_token;
        token.expires_at = account.expires_at;
      }
      console.log('JWT TOKEN: ', token);
      return token;
    },

    async session({
      session,
      token,
      user,
    }: {
      session: Session;
      token: JWT;
      user: User;
    }) {
      // console.log('Session user: ', user);
      // console.log('Session token: ', token);
      // session.accessToken = token.access_token;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refresh_token;
      session.expiresAt = token.expires_at;

      // session.user = user;
      console.log('Session: ', session);
      return session;
    },
  },
});

export { handler as GET, handler as POST };
