import { Card, Text, Divider } from '@tremor/react';
import { IProgramComment } from 'app/types';
import { Fragment } from 'react';

interface ProgramCommentProps {
  programComment: IProgramComment[];
}

export default async function ProgramComment({
  programComment
}: ProgramCommentProps) {
  return (
    <Card className="my-6">
      {programComment.map((comment, index) => (
        <Fragment key={comment.id}>
          <Text className="font-semibold">Người dùng: Người dùng ẩn danh</Text>
          <Text>Ưu điểm: {comment.pros}</Text>
          <Text>Nhược điểm: {comment.cons}</Text>
          <Text>Cần cải thiện: {comment.need_to_improved}</Text>
          {comment.rate_overall && (
            <Text className="mt-2">
              Đánh giá tổng quan: {comment.rate_overall} ⭐
            </Text>
          )}
          {index < programComment.length - 1 && <Divider />}
        </Fragment>
      ))}
    </Card>
  );
}
