import NextAuth from 'next-auth';
import AppleProvider from 'next-auth/providers/apple';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import IdentityServer4Provider from 'next-auth/providers/identity-server4';
import Auth0 from 'next-auth/providers/auth0';

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
    }),
    // Auth0({
    //   id: 'identity-provider',
    //   name: 'Auth0',
    //   issuer: process.env.AUTH_ISSUER,
    //   clientId: process.env.AUTH_CLIENT_ID!,
    //   clientSecret: process.env.AUTH_CLIENT_SECRET!,
    //   authorization: {
    //     url: `${process.env.AUTH_ISSUER}/authentication`,
    //     params: {
    //       scope: process.env.AUTH_SCOPE,
    //     },
    //   },
    // }),
    // {
    //   id: 'auth-api',
    //   name: 'AuthAPI',
    //   issuer: process.env.AUTH_ISSUER,
    //   clientId: process.env.AUTH_CLIENT_ID,
    //   // clientSecret: process.env.AUTH_CLIENT_SECRET,
    //   type: 'oauth',

    //   // wellKnown:
    //   //   'https://auth-api-test.construo.no/.well-known/openid-configuration',
    //   authorization: {
    //     // url: `${process.env.AUTH_ISSUER}/Account/Login`,
    //     // https://auth-api-test.construo.no/Account/Login?ReturnUrl=
    //     params: {
    //       // callbackUrl: 'https://localhost:3000/authentication/login-callback',
    //       // callbackUrl: `${process.env.NEXTAUTH_URL}/authentication/login-callback`,
    //       // ReturnUrl: 'connect/authorize/callback',
    //       // client_id: process.env.AUTH_CLIENT_ID,
    //       // redirect_uri: 'https://localhost:3000/authentication/login-callback',
    //       // response_type: 'code',
    //       scope:
    //         'openid profile roles offline_access DocStore-public Esign-public ni RR.View GatewayApi KycApi-public WorkEng-public Notifications-public PortfolioReportApi-public',
    //       // state: '1234567890',
    //       // code_challenge: '1234567890',
    //       // code_challenge_method: 'S256',
    //       // response_mode: 'query',
    //     },
    //   },

    //   // idToken: true,
    //   // checks: ['pkce', 'state'],

    //   profile(profile) {
    //     return {
    //       id: profile.sub,
    //       name: profile.name,
    //       email: profile.email,
    //       image: profile.picture,
    //     };
    //   },
    // },
  ],
  // Not providing any secret or NEXTAUTH_SECRET will throw an error in production.
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,

  // These are examples for custom definitions
  pages: {
    // signIn: process.env.AUTH_ISSUER,
    // signOut: `${process.env.AUTH_ISSUER}/account/logout`,
    // error: '/authentication/error', // Error code passed in query string as ?error=
    // verifyRequest: '/authentication/verify-request', // (used for check email message)
    // newUser: null // If set, new users will be directed here on first sign in
  },
  session: {
    strategy: 'jwt',
  },

  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   return true;
    // },
    // async redirect({ url, baseUrl }) {
    //   return 'http://localhost:3000/authentication/login-callback';
    // },
    // async session({ session, user, token }) {
    //   return session;
    // },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   console.log('JWT Token: ', token);
    //   return token;
    // },

    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      // if (account) {
      //   token.accessToken = account.access_token;
      // }
      if (account) {
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
        token.expires_at = account.expires_at;
      }

      console.log('JWT Token: ', token);

      return token;
    },
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
