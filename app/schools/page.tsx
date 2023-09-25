import Search from 'app/search';
import SchoolList from './SchoolList';
import Header from './Header';
import CreateModal from './CreateModal';

export default function Page({
  searchParams
}: {
  searchParams: { q: string };
}) {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Header />
      <Search />

      <SchoolList searchParams={searchParams} />
      <CreateModal />
    </main>
  );
}
