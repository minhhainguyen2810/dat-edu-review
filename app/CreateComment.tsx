'use client';

import { Card, Title } from '@tremor/react';
import { Rate, message, Button, Select } from 'antd';
import { useParams } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import uploadCustomRequest from 'app/helpers/uploadCustomRequest';
import Upload from 'app/components/Upload';
import { IProgramDetail } from 'app/types';
import dayjs from 'dayjs';
import { RATE_RANKS } from 'app/const';
import { useUserInfo } from 'app/hooks/useUserInfo';
import { signIn } from 'next-auth/react';
import { AutoComplete } from 'antd';
import { useState } from 'react';

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
  user_email: string;
  is_approved: boolean;
  school_id: string;
  program_id: string;
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

export type School = {
  id: number;
  name: string;
};

export default function CreateComment({ schools }: { schools: School[] }) {
  const { session } = useUserInfo();
  const { register, handleSubmit, control, setValue } = useForm<Inputs>();
  const searchParams = useParams<{ schoolId: string; programId: string }>();

  const [programId, setProgramId] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const [programOptions, setProgramOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await sendComment(
        {
          ...data,
          user: session?.user?.name || '',
          user_email: session?.user?.email || '',
          school_id: schoolId,
          program_id: programId,
          date: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
        },
        schoolId,
        programId
      );
      message.success(
        'Gửi đánh giá thành công, đánh giá của bạn đang chờ được duyệt bởi quản trị viên'
      );
    } catch {
      message.error('Gửi đánh giá thất bại');
    }
  };

  const handleSearch = async (text: string) => {
    console.log(text);
    try {
      const res = await fetch(`/api/school?q=${text}`, {
        method: 'GET'
      });

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await res.json();
      console.log(result);

      setOptions(
        result.data.map((item: School) => ({
          label: item.name,
          value: item.id
        }))
      );
    } catch {
      console.log('failed to fetch');
    }
  };

  const handleSelect = async (
    value: string,
    option: { value: string; label: string }
  ) => {
    setValue('school_id', option.label);
    setSchoolId(value);

    try {
      const res = await fetch(`/api/program?schoolId=${value}`, {
        method: 'GET'
      });

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await res.json();
      console.log(result);

      setProgramOptions(
        result.data.map((item: School) => ({
          label: item.name,
          value: item.id
        }))
      );
    } catch {
      console.log('failed to fetch');
    }
  };

  const handleSelectProgram = async (
    value: string,
    option: { value: string; label: string }
  ) => {
    setValue('program_id', option.label);

    setProgramId(value);
  };

  const handleSearchProgram = async (text: string) => {
    console.log(text);
    setProgramOptions(
      programOptions.filter((program) => program.label === text)
    );
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
                  htmlFor="school_id"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Trường:
                </label>
                <div className="mt-2">
                  <Controller
                    name="school_id"
                    control={control}
                    render={({ field, formState: {} }) => (
                      <AutoComplete
                        {...field}
                        className="focus:shadow-white"
                        options={options}
                        style={{ width: 200, boxShadow: 'none' }}
                        onSearch={handleSearch}
                        placeholder="control mode"
                        onSelect={handleSelect}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="program_id"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Khoa:
                </label>
                <div className="mt-2">
                  <Controller
                    name="program_id"
                    control={control}
                    render={({ field }) => (
                      <AutoComplete
                        {...field}
                        className="focus:shadow-white"
                        options={programOptions}
                        style={{ width: 200, boxShadow: 'none' }}
                        onSearch={handleSearchProgram}
                        placeholder="control mode"
                        onSelect={handleSelectProgram}
                      />
                    )}
                  />
                </div>
              </div>

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
