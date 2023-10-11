import { queryBuilder } from 'lib/planetscale';
import CommentsTable from './Comments';
import getUserInfo from 'app/helpers/getUserInfo';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function IndexPage() {
  const session = await getUserInfo();

  const comments = await queryBuilder
    .selectFrom('program_comment')
    .innerJoin('program', 'program.id', 'program_comment.program_id')
    .select([
      'id',
      'cons',
      'pros',
      'rate_overall',
      'user',
      'is_approved',
      'program_id',
      'program.school_id as school_id',
      'need_to_improved'
    ])
    .where('is_approved', '!=', true)
    .execute();

  if (session?.user.role !== 'admin') {
    redirect('/');
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl min-h-[calc(100vh-64px-48px)]">
      <h1>Duyệt bình luận</h1>
      <CommentsTable comments={comments} />
    </main>
  );
}
