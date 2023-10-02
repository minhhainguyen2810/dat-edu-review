import { Card, Title, Button } from '@tremor/react';
import Search from '../../../search';
import ProgramList from './ProgramList';
import Header from './Header';
import CreateProgram from './CreateProgram';

export default function Page({
  params,
  searchParams
}: {
  params: { schoolId: number };
  searchParams: { q: string };
}) {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Header />
      <Search />

      <ProgramList params={params} searchParams={searchParams} />
      <CreateProgram />
    </main>
  );
}
