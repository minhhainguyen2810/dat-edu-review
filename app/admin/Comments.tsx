'use client';

import { Database } from 'lib/planetscale';

import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Inputs {
  id: string;
  program_id: number;
}

async function sendComment(body: Inputs) {
  const res = await fetch(`/api/admin/comment-approval`, {
    method: 'POST',
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

interface DataType {
  //   key: string;
  id: number;
  pros: string;
  cons: string;
  need_to_improved?: string;
  date?: string;
  //   rate_teachers: number;
  //   rate_quality: number;
  //   rate_facilities: number;
  rate_overall: number;
  user: string;
  program_id: number;
  school_id: number;
  is_approved: boolean;
}

const handleClick = (body: Inputs) => async () => {
  try {
    await sendComment(body);
  } catch {}
};

const columns: ColumnsType<DataType> = [
  {
    title: 'pros',
    dataIndex: 'pros',
    key: 'pros'
  },
  {
    title: 'cons',
    dataIndex: 'cons',
    key: 'cons'
  },
  {
    title: 'need_to_improved',
    dataIndex: 'need_to_improved',
    key: 'need_to_improved'
  },
  {
    title: 'school_id',
    dataIndex: 'school_id',
    key: 'school_id'
  },
  {
    title: 'program_id',
    dataIndex: 'program_id',
    key: 'program_id'
  },
  {
    title: 'user',
    dataIndex: 'user',
    key: 'user'
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Button
        type="link"
        onClick={handleClick({
          id: `${record.id}`,
          program_id: record.program_id
        })}
      >
        Approve
      </Button>
    )
  }
];

export default function CommentsTable({ comments }: { comments: DataType[] }) {
  return <Table columns={columns} dataSource={comments} rowKey={"id"}/>;
}
