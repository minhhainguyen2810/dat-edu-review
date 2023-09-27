'use client';

import { Fragment, useRef, ReactElement, ReactComponentElement } from 'react';
import { TextInput } from '@tremor/react';

import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useModalStore } from '../hooks';

import { useParams } from 'next/navigation';
import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { Card, Title, Subtitle, Text, Divider } from '@tremor/react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Rate } from 'antd';
import { useState, useMemo } from 'react';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload as AntdUpload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { beforeUpload } from 'app/helpers';
import Image from 'next/image';

export interface IUpload {
  value: string;
  onChange: (value: string) => void;
  name: string;
  customRequest: UploadProps['customRequest'];
}

const Upload: React.FC<IUpload> = ({
  name,
  value,
  onChange,
  customRequest
}) => {
  const [loading, setLoading] = useState(false);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      onChange(info.file.response.url);
    }
  };
  return (
    <AntdUpload
      name={name}
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      customRequest={customRequest}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {value ? (
        <img src={value} alt="avatar" style={{ width: '100%' }} />
      ) : (
        uploadButton
      )}
    </AntdUpload>
  );
};

export default Upload;
