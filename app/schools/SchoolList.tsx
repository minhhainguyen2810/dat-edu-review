import { Card, Title } from '@tremor/react';
import { Empty } from 'antd';
import { queryBuilder } from 'lib/planetscale';

export default async function SchoolList({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const schools = await queryBuilder
    .selectFrom('school')
    .select(['id', 'name', 'description'])
    .where('name', 'like', `%${searchParams?.q || ''}%`)
    .execute();

  if (!schools.length)
    return <Empty className="mt-6" description="Không có kết quả tìm kiếm" />;

  return (
    <>
      {schools?.map(({ id, name, description }) => (
        <a key={id} href={`/schools/${id}/programs/`}>
          <Card className="mt-6 shadow-md">
            <Title>{name}</Title>
            <p>{description.substring(0, 50)}...</p>
            <p className="mt-2">Đánh giá trung bình: 4.5 ⭐</p>
          </Card>
        </a>
      ))}
    </>
  );
}
