'use client';

import { useParams } from 'next/navigation';
import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  name: string;
  duration: string;
  goal: string;
  description: string;
  school_id: string;
};

import Modal from 'app/components/Modal';

async function getData(body: Inputs) {
  const res = await fetch(`/schools/${body.school_id}/programs/api`, {
    method: 'POST',
    body: JSON.stringify(body as any)
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default function CreateModal({}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>();
  const searchParams = useParams();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await getData({
      ...data,
      school_id: searchParams?.schoolId as string
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal
        title="Thêm mới chương trình học"
        okText="Thêm"
        icon={
          <AcademicCapIcon
            className="h-6 w-6 text-blue-600"
            aria-hidden="true"
          />
        }
        onOk={handleSubmit(onSubmit)}
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tên
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      id="name"
                      autoComplete="name"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Khoa học máy tính"
                      {...register('name')}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="goal"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mục tiêu đào tạo
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      id="goal"
                      autoComplete="goal"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      {...register('goal')}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thời gian đào tạo
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      id="duration"
                      autoComplete="duration"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="4 năm"
                      {...register('duration')}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thông tin thêm
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={''}
                    placeholder="Thông tin thêm về chương trình học này"
                    {...register('description')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </form>
  );
}
