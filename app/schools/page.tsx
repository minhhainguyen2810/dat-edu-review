import Search from 'app/search';
import SchoolList from './SchoolList';
import Header from './Header';
import CreateSchool from './CreateSchool';

export default function Page({
  searchParams
}: {
  searchParams: { q: string };
}) {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl min-h-[calc(100vh-64px-48px)]">
      <Header />
      <Search />

      <SchoolList searchParams={searchParams} />
      <CreateSchool />
    </main>
  );
}
