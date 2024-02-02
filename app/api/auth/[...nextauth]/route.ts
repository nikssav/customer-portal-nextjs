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
      idToken: true,
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

    async jwt({ token, account, profile }) {
      console.log('JWT token: ', token);
      console.log('JWT account: ', account);
      // console.log('JWT profile: ', profile);

      if (account) {
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
        token.expires_at = account.expires_at;
      }
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
      console.log('Session: ', session);
      console.log('Session user: ', user);
      console.log('Session token: ', token);
      // session.accessToken = token.access_token;
      session.accessToken = token.access_token;
      return session;
    },
    // async jwt({ token, account }) {
    //   // Persist the OAuth access_token to the token right after signin
    //   // if (account) {
    //   //   token.accessToken = account.access_token;
    //   // }
    //   if (account) {
    //     token.access_token = account.access_token;
    //     token.refresh_token = account.refresh_token;
    //     token.expires_at = account.expires_at;
    //   }
    //   console.log('JWT Token: ', token);
    //   return token;
    // },
    // async session({ session, token, user }) {
    //   // Send properties to the client, like an access_token from a provider.
    //   // session.accessToken = token.accessToken
    //   const newSession: any = { ...session };
    //   newSession.accessToken = token.accessToken;
    //   return newSession;
    // },
    // async redirect({ url, baseUrl }) {
    //   // Allows relative callback URLs
    //   // if (url.startsWith('/')) return `${baseUrl}${url}`;
    //   // Allows callback URLs on the same origin
    //   // else if (new URL(url).origin === baseUrl) return url;
    //   // return baseUrl;
    //   return 'http://localhost:3000/authentication/login-callback';
    // },
  },

  // callbackUrl: 'http://localhost:3000/authentication/login-callback',
});

export { handler as GET, handler as POST };
