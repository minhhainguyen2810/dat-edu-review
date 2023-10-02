'use client';

import { useState } from 'react';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload as AntdUpload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { beforeUpload } from 'app/helpers';

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
  customRequest,
  ...props
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
      {...props}
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
