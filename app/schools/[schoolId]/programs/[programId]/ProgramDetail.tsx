import { Card, Title, Subtitle, Text, Divider } from '@tremor/react';
import { queryBuilder } from 'lib/planetscale';
import { Fragment } from 'react'

interface ProgramDetailProps {
  programDetail: {
    name: string; description: string;
  }
}

export default async function ProgramDetail({ programDetail }: ProgramDetailProps) {
  return (
    <Card className="my-6">
      <Text className="font-semibold">Khoa/ngành: {programDetail.name}</Text>
      <p>{programDetail.description.substring(0, 50)}...</p>
      <p className="mt-2">Đánh giá trung bình: 4,5 ⭐</p>
    </Card>
  );
}
