'use client';

import { Title } from '@tremor/react';
import { Button } from 'antd';
import { useModalStore } from 'app/hooks';
import { useUserInfo } from 'app/hooks/useUserInfo';

export default function Page() {
  const { setOpened } = useModalStore((state) => state);

  const { isAdmin } = useUserInfo();

  return (
    <div className="flex justify-between items-center">
      <Title>Chương trình đào tạo</Title>
      {isAdmin ? (
        <Button type="primary" onClick={() => setOpened(true)}>
          Tạo mới{' '}
        </Button>
      ) : (
        <div></div>
      )}
    </div>
  );
}
