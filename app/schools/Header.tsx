'use client';

import { Title, Button } from '@tremor/react';
import { useModalStore } from 'app/hooks';

export default function Header() {
  const { setOpened } = useModalStore((state) => state);

  return (
    <div className="flex justify-between items-center">
      <Title>Đánh giá & thông tin chi tiết các trường học</Title>
      <Button onClick={() => setOpened(true)}>Tạo mới </Button>
    </div>
  );
}
