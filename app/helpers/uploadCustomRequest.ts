import { UploadProps } from 'antd';
import { RcFile } from 'antd/es/upload';

const uploadCustomRequest: UploadProps['customRequest'] = async ({
  file,
  fileName,
  onSuccess
}: {
  file: RcFile | string | Blob;
  fileName?: string;
  onSuccess?: any;
}) => {
  try {
    const response = await fetch(
      `api/uploadCommentImage?filename=${fileName}`,
      {
        method: 'POST',
        body: file
      }
    );

    onSuccess?.(await response.json(), file as any);
  } catch (e) {
    console.log(e);
  }
};

export default uploadCustomRequest;
