import { Card, Text } from '@tremor/react';
import RateInfo from 'app/components/Rate';
import { IProgramDetail } from 'app/types';
import { Database } from 'lib/planetscale';
import Image from 'next/image';

interface ProgramDetailProps {
  workplaceDetail: Omit<Database['workplace'], 'id'> & {
    id: number;
  };
}

export default async function WorkplaceDetail({
  workplaceDetail
}: ProgramDetailProps) {
  return (
    <Card className="my-6">
      <Text className="font-semibold">Khoa/ngành: {workplaceDetail.name}</Text>
      <div className="mt-2">
        <RateInfo value={4.5} />
      </div>
      <p className="mt-6 mb-4">{workplaceDetail.description}</p>

      <div className="grid grid-cols-1 gap-6">
        <Image src="/1.jpg" alt="image" width={350} height={200} />
        <Image src="/2.jpg" alt="image" width={350} height={200} />
      </div>
    </Card>
  );
}
