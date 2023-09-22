'use client';

import { Card, Title, Button } from '@tremor/react';
import Search from '../../../search';
import { Dialog } from '@headlessui/react';
import ProgramList from './ProgramList';
import { useState } from 'react';
import { useModalStore } from './hooks';

export default function Page() {
  const { setOpened, opened } = useModalStore((state) => state);

  return (
    <div className="flex justify-between items-center">
      <Title> All Programs</Title>
      <Button onClick={() => setOpened(true)}>Tạo mới </Button>
    </div>
  );
}