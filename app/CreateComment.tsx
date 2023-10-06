'use client';

import { Card, Title } from '@tremor/react';
import { Rate, message, Button } from 'antd';
import { useParams } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import uploadCustomRequest from 'app/helpers/uploadCustomRequest';
import Upload from 'app/components/Upload';
import { IProgramDetail } from 'app/types';
import dayjs from 'dayjs';
import { RATE_RANKS } from 'app/const';
import { useUserInfo } from 'app/hooks/useUserInfo';
import { signIn } from 'next-auth/react';

type Inputs = {
  pros: string;
  cons: string;
  need_to_improved: string;
  rate_overall: number;
  rate_teachers: number;
  rate_quality: number;
  image_url: string;
  user: string;
  date: string;
};

async function sendComment(body: Inputs, schoolId: string, programId: string) {
  const res = await fetch(`/api/program/comment`, {
    method: 'POST',
    body: JSON.stringify({ ...body, program_id: programId })
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default function CreateComment() {
  const { session } = useUserInfo();
  const { register, handleSubmit, control } = useForm<Inputs>();
  const searchParams = useParams<{ schoolId: string; programId: string }>();
  const { schoolId = '', programId = '' } = searchParams || {};

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await sendComment(
        {
          ...data,
          user: session?.user?.name || '',
          date: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
        },
        schoolId,
        programId
      );
      message.success('Gửi đánh giá thành công');
    } catch {
      message.success('Gửi đánh giá thất bại');
    }
  };

  if (!session?.user)
    return (
      <div className="my-4">
        <div className="flex justify-center md:justify-start">
          <Button type="primary" onClick={() => signIn()}>
            Đăng nhập để gửi đánh giá
          </Button>
        </div>
      </div>
    );

  return (
    // <Card>
    <div className="m-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <Title>Viết đánh giá cho khoa</Title>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="pros"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Đánh giá tổng quan
                </label>
                <div className="mt-2">
                  <Controller
                    name="rate_overall"
                    control={control}
                    render={({ field }) => (
                      <Rate {...field} tooltips={RATE_RANKS} allowHalf />
                    )}
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="pros"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ưu điểm
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md">
                    <textarea
                      id="pros"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                      defaultValue={''}
                      placeholder="Chất lượng giảng dạy, cơ sở vật chất..."
                      {...register('pros')}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="goal"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nhược điểm
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md">
                    <textarea
                      id="cons"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                      defaultValue={''}
                      placeholder="Chất lượng giảng dạy, cơ sở vật chất..."
                      {...register('cons')}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="goal"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cần cải thiện
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md">
                    <textarea
                      id="need_to_improved"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                      defaultValue={''}
                      placeholder="Chất lượng giảng dạy, cơ sở vật chất..."
                      {...register('need_to_improved')}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="image_url"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thêm hình ảnh
                </label>
                <Controller
                  name="image_url"
                  control={control}
                  render={({ field }) => (
                    <Upload {...field} customRequest={uploadCustomRequest} />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center md:justify-start">
            <Button type="primary" htmlType="submit">
              Gửi đánh giá
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
