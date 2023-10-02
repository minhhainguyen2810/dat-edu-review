import { Analytics } from '@vercel/analytics/react';
import Nav from './nav';
import { Suspense } from 'react';
import { getServerSession } from 'next-auth/next';
import { AuthProvider } from './providers/auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '../lib/AntdRegistry';
import { ConfigProvider } from 'antd';
import theme from 'theme/themeConfig';

const inter = Inter({ subsets: ['latin'] });
import './globals.css';

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
      <body className={inter.className}>
        <Suspense>
          <Nav />
        </Suspense>
        <AuthProvider session={session}>
          <ConfigProvider theme={theme}>
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          </ConfigProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
