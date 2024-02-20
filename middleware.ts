export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/documents'],
  // matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'], // all routes except those with a file extension
};
