import { Card } from '@tremor/react';
import { Empty } from 'antd';
import { queryBuilder } from 'lib/planetscale';

export default async function WorkspaceList({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';

  const workplaces = await queryBuilder
    .selectFrom('workplace')
    .select(['id', 'name', 'location', 'description'])
    .where('name', 'like', `%${search}%`)
    .execute();

  if (!workplaces.length)
    return <Empty className="mt-6" description="Không có kết quả tìm kiếm" />;

  return (
    <>
      {workplaces.map(({ id, name, location, description }) => (
        <a key={id} href={`/workplaces/${id}`}>
          <Card className="mt-6 shadow-md">
            <h3>{name}</h3>
            <p>Địa điểm: {location}</p>
            <p>{description}</p>
            <p className="mt-2">Đánh giá trung bình: 4.5 ⭐</p>
          </Card>
        </a>
      ))}
    </>
  );
}
