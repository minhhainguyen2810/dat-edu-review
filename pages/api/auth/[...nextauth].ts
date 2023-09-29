import { queryBuilder } from 'lib/planetscale';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { KyselyAdapter } from '@auth/kysely-adapter';

export const authOptions: NextAuthOptions = {
  adapter: KyselyAdapter(queryBuilder),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ]
};

export default NextAuth(authOptions);
