import { Card, Text } from '@tremor/react';
import { Rate } from 'antd';
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
      <p>{programDetail.description.substring(0, 50)}...</p>

      <div className="m-6">
        <Image src="/07531069.jpg" alt="image" width={350} height={200} />
      </div>
      <div className="mt-2">
        Đánh giá trung bình: 4,5
        <span>
          <Rate allowHalf value={4.9} />
        </span>
      </div>
    </Card>
  );
}
