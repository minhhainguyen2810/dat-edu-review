import { Card, Text } from '@tremor/react';
import RateInfo from 'app/components/Rate';
import { IProgramDetail } from 'app/types';
import Image from 'next/image';

interface ProgramDetailProps {
  programDetail: IProgramDetail;
}

export default async function ProgramDetail({
  programDetail
}: ProgramDetailProps) {
  return (
    <Card className="my-6">
      <Text className="font-semibold">Khoa/ngành: {programDetail.name}</Text>
      <div className="mt-2">
        <RateInfo value={4.5} />
      </div>
      <p>{programDetail.description.substring(0, 50)}...</p>

      <div className="m-6">
        <Image src="/07531069.jpg" alt="image" width={350} height={200} />
      </div>
    </Card>
  );
}
