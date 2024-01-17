import { Title } from '@tremor/react';
import { queryBuilder } from 'lib/planetscale';
import WorkplaceDetail from './WorkplaceDetail';
import WorkplaceComments from './WorkplaceComments';
import CreateComment from './CreateComment';

export default async function Page({
  params: { workplaceId }
}: {
  params: { workplaceId: number };
}) {
  const workplaceDetail = await queryBuilder
    .selectFrom('workplace')
    .select(['id', 'name', 'description', 'location'])
    .where('id', '=', workplaceId)
    .execute();
  const workplace_comments = await queryBuilder
    .selectFrom('workplace_comment')
    .select([
      'id',
      'workplace_id',
      'need_to_improved',
      'rate_overall',
      'date',
      'user'
    ])
    .where('workplace_id', '=', workplaceId)
    .orderBy('date', 'desc')
    .execute();

  const { name } = workplaceDetail[0];

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl min-h-[calc(100vh-64px-48px)]">
      <Title>{name}</Title>
      <WorkplaceDetail workplaceDetail={workplaceDetail[0]} />
      <CreateComment workplaceDetail={workplaceDetail[0]} />
      <Title className="font-medium mt-6">
        Đánh giá từ học viên ({workplace_comments.length})
      </Title>

      <WorkplaceComments workplaceComments={workplace_comments} />
    </main>
  );
}
