import { Card } from '@tremor/react';
import { Empty } from 'antd';
import { queryBuilder } from 'lib/planetscale';

export default async function ProgramList({
  params,
  searchParams
}: {
  params: { schoolId: number };
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';

  const { schoolId } = params;
  const programs = await queryBuilder
    .selectFrom('program')
    .select(['id', 'name', 'duration', 'goal', 'description', 'school_id'])
    .where('school_id', '=', schoolId)
    .where('name', 'like', `%${search}%`)
    .execute();

  if (!programs.length)
    return <Empty className="mt-6" description="Không có kết quả tìm kiếm" />;

  return (
    <>
      {programs.map(({ id, name, goal }) => (
        <a key={id} href={`/schools/${schoolId}/programs/${id}`}>
          <Card className="mt-6 shadow-md">
            <h3>{name}</h3>
            <p>Muc tieu dao tao: {goal}</p>
          </Card>
        </a>
      ))}
    </>
  );
}
