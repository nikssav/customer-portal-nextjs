export { default } from 'next-auth/middleware';
// import middleware from 'next-auth/middleware';

// import { withAuth } from 'next-auth/middleware';

export const config = {
  matcher: ['/documents'],
  // matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

// export default withAuth({
//   pages: {

//     signIn: '/api/auth/signin',
//     signOut: '/api/auth/signout',

//   },
// });
