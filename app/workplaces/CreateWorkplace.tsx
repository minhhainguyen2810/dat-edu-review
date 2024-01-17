'use client';

import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { useForm, SubmitHandler } from 'react-hook-form';
import Modal from 'app/components/Modal';
import { useRouter } from 'next/navigation';
import { useModalStore } from 'app/hooks';
import { useTransition } from 'react';

type Inputs = {
  name: string;
  location: string;
  description: string;
};

async function createWorkplace(body: Inputs) {
  const res = await fetch(`/api/workplace`, {
    method: 'POST',
    body: JSON.stringify(body)
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
    formState: { isSubmitting }
  } = useForm<Inputs>();
  const { setOpened } = useModalStore((state) => state);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await createWorkplace(data);

    startTransition(() => {
      router.refresh();
      setOpened(false);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal
        title="Thêm mới nơi làm việc"
        okText="Thêm"
        icon={
          <AcademicCapIcon
            className="h-6 w-6 text-blue-600"
            aria-hidden="true"
          />
        }
        onOk={handleSubmit(onSubmit)}
        loading={isPending || isSubmitting}
      >
        <div className="space-y-12">
          <div className=" pb-12">
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
                      placeholder="Trung tâm làm việc ABC"
                      {...register('name')}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Địa chỉ
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      id="location"
                      autoComplete="location"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      {...register('location')}
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
                    placeholder="Thông tin thêm về trung tâm làm việc này"
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
