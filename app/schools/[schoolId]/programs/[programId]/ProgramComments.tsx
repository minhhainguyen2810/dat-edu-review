import { Card, Title, Subtitle, Text, Divider } from '@tremor/react';
import { queryBuilder } from 'lib/planetscale';
import { Fragment } from 'react'

interface ProgramCommentProps {
  programComment: {
    pros: string;
    cons: string;
    id: number;
    need_to_improved: string;
  }[]
}

export default async function ProgramComment({ programComment }: ProgramCommentProps) {
  return (
    <Card className="my-6">
      {programComment.map((comment, index) => (
        <Fragment key={comment.id}>
          <Text className="font-semibold">Người dùng: Người dùng ẩn danh</Text>
          <Text>Ưu điểm: {comment.pros}</Text>
          <Text>Nhược điểm: {comment.cons}</Text>
          <Text>Cần cải thiện: {comment.need_to_improved}</Text>
          <Text className="mt-2">Đánh giá trung bình: 4.5 ⭐</Text>
          {index < programComment.length - 1 && <Divider />}
        </Fragment >
      ))}
    </Card>
  );
}
