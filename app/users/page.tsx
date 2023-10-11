import { Card, Title, Text } from '@tremor/react';
import { queryBuilder } from 'lib/planetscale';
import Search from '../search';
import CommentsTable from './table';
import { NextRequest, NextResponse } from 'next/server';
import getUserInfo from 'app/helpers/getUserInfo';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function IndexPage(page: { searchParams: { q: string } }) {
  const session = await getUserInfo();

  const search = page.searchParams.q ?? '';
  const users = await queryBuilder
    .selectFrom('User')
    .select(['id', 'name', 'email', 'role'])
    .where('name', 'like', `%${search}%`)
    .execute();

  if (session?.user.role !== 'admin') {
    redirect('/');
  }
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl min-h-[calc(100vh-64px-48px)]">
      <Title>Users</Title>
      <Text>
        A list of users retrieved from a MySQL database (PlanetScale).
      </Text>
      <Search />
      <Card className="mt-6">
        <CommentsTable users={users} />
      </Card>
    </main>
  );
}
