'use client';

import { useParams } from 'next/navigation';
import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { Card, Title, Subtitle, Text, Divider } from '@tremor/react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Rate } from 'antd';
import { useState } from 'react';

type Inputs = {
  pros: string;
  cons: string;
  need_to_improved: string;
  rate_overall: number;
  rate_teachers: number;
  rate_quality: number;
};

const desc = ['Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời'];

import { Button } from '@tremor/react';

async function getData(body: Inputs, schoolId: number, programId: number) {
  const res = await fetch(`/schools/${schoolId}/programs/${programId}/api`, {
    method: 'POST',
    body: JSON.stringify(body as any)
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

interface ProgramDetailProps {
  programDetail: {
    name: string;
    description: string;
    school_name: string;
    rate: number;
  };
}

export default function CreateComment({ programDetail }: ProgramDetailProps) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm<Inputs>();
  const searchParams = useParams();
  const [value, setValue] = useState(3);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

    await getData(
      {
        data
      },
      searchParams?.schoolId,
      searchParams?.programId
    );
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <Title>
              Viết đánh giá cho khoa {programDetail.name}, trường{' '}
              {programDetail.school_name}
            </Title>
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
                    render={({ field }) => <Rate {...field} tooltips={desc} />}
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
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <textarea
                      id="pros"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <textarea
                      id="cons"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <textarea
                      id="need_to_improved"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={''}
                      placeholder="Chất lượng giảng dạy, cơ sở vật chất..."
                      {...register('need_to_improved')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center md:justify-start">
            <Button type="submit">Gửi đánh giá</Button>
          </div>
        </div>
      </form>
    </Card>
  );
}
