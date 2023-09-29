import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import Nav from './nav';
import { Suspense } from 'react';
import { getServerSession } from 'next-auth/next';
import { Providers } from './providers/auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';

export const metadata = {
  title: 'Azubi Edu Review',
  description: 'Azubi Edu Review'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense>
          <Nav />
        </Suspense>
        <Providers session={session}>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
