import WorkspaceList from './WorkspaceList';
import Header from './Header';
import CreateWorkplace from './CreateWorkplace';
import Search from 'app/search';

export default function Page({
  searchParams
}: {
  searchParams: { q: string };
}) {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl min-h-[calc(100vh-64px-48px)]">
      <Header />
      <Search />

      <WorkspaceList searchParams={searchParams} />
      <CreateWorkplace />
    </main>
  );
}
