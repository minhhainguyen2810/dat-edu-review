import Image from 'next/image';
import homepage from './homepage.png';
import CreateComment from './CreateComment';

export const dynamic = 'force-dynamic';

export default async function IndexPage() {
  return (
    <main className="md:p-4 mx-auto max-w-7xl min-h-[calc(100vh-64px-48px)]">
      <div className="flex justify-center">
        <Image src={homepage} alt="Picture of the author" />
      </div>
      <div className="mt-2 mb-6">
        <CreateComment />
      </div>
    </main>
  );
}
