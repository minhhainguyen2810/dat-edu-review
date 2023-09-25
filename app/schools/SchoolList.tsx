import { Card, Title, Button } from '@tremor/react';
import { queryBuilder } from 'lib/planetscale';
import { useSearchParams } from 'next/navigation';

export default async function SchoolList({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const schools = await queryBuilder
    .selectFrom('school')
    .select(['id', 'name', 'description'])
    .where('name', 'like', `%${searchParams.q || ''}%`)
    .execute();

  return (
    <>
      {schools.map(({ id, name, description }) => (
        <a key={id} href={`/schools/${id}/programs/`}>
          <Card className="mt-6">
            <h3>{name}</h3>
            <p>{description.substring(0, 50)}...</p>
          </Card>
        </a>
      ))}
    </>
  );
}
