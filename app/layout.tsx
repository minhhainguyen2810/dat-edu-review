import { Analytics } from '@vercel/analytics/react';
import Nav from './nav';
import { Suspense } from 'react';
import { AuthProvider } from './providers/auth';
import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '../lib/AntdRegistry';
import { ConfigProvider } from 'antd';
import theme from 'theme/themeConfig';

const inter = Inter({ subsets: ['latin'] });
import './globals.css';
import getUserInfo from './helpers/getUserInfo';

export const metadata = {
  title: 'Azubi Edu Review',
  description: 'Azubi Edu Review'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const sessionWithRole = await getUserInfo();

  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className={`${inter.className} `}>
        <Suspense>
          <Nav />
        </Suspense>
        
        <AuthProvider session={sessionWithRole}>
          <ConfigProvider theme={theme}>
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          </ConfigProvider>
        </AuthProvider>
        <Analytics />
        <footer className="p-4 text-xs text-center bg-green-600 text-white">
          ©2023 Azubivn.com
        </footer>
      </body>
    </html>
  );
}
