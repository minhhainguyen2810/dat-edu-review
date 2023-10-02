import { Title } from '@tremor/react';
import { queryBuilder } from 'lib/planetscale';
import ProgramDetail from './ProgramDetail';
import ProgramComment from './ProgramComments';
import CreateComment from './CreateComment';

export default async function Page({
  params: { programId, schoolId }
}: {
  params: { programId: number; schoolId: number };
}) {
  const programDetail = await queryBuilder
    .selectFrom('program')
    .innerJoin('school', 'school.id', 'program.school_id')
    .select([
      'program.id',
      'program.name',
      'program.duration',
      'program.goal',
      'program.description',
      'program.school_id',
      'school.name as school_name'
    ])
    .where('program.id', '=', programId)
    .where('school_id', '=', schoolId)
    .execute();
  const program_comments = await queryBuilder
    .selectFrom('program_comment')
    .select([
      'id',
      'pros',
      'cons',
      'program_id',
      'need_to_improved',
      'rate_overall',
      'date',
      'user'
    ])
    .where('program_id', '=', programId)
    .orderBy('date', 'desc')
    .execute();

  const { school_name } = programDetail[0];

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Trường: {school_name}</Title>
      <ProgramDetail programDetail={programDetail[0]} />
      <CreateComment programDetail={programDetail[0]} />
      <Title className="font-medium mt-6">
        Đánh giá từ học viên ({program_comments.length})
      </Title>
      <ProgramComment programComment={program_comments} />
    </main>
  );
}
