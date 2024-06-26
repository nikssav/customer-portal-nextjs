import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Link from 'next/link';

import TanstackProvider from '../providers/TanstackProvider';
import AuthProvider from '../providers/AuthProvider';
import Profile from './components/Profile';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className} suppressHydrationWarning={true}>
        <AuthProvider>
          <div
            className='layout'
            style={{
              display: 'grid',
              gridTemplateRows: 'auto 1fr auto',
              gridTemplateColumns: '1fr',
              height: 'calc(100vh - 16px)',
            }}
          >
            <header style={{ borderBottom: '1px solid #ccc', display: 'flex' }}>
              <nav>
                <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
                  <li style={{ padding: '10px' }}>
                    <Link href='/'>Home</Link>
                  </li>
                  <li style={{ padding: '10px' }}>
                    <Link href='/documents'>Documents</Link>
                  </li>
                  <li style={{ padding: '10px' }}>
                    <Link href='/documents-rtk'>Documents RTK</Link>
                  </li>
                </ul>
              </nav>
              <Profile />
            </header>

            <main style={{ padding: '10px' }}>
              <TanstackProvider>{children}</TanstackProvider>
            </main>

            <footer style={{ borderTop: '1px solid #ccc', marginTop: '1rem' }}>
              Footer
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
