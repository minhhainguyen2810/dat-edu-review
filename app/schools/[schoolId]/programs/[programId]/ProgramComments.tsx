'use client';

import { Card, Text } from '@tremor/react';
import { IProgramComment } from 'app/types';
import { Fragment } from 'react';

import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { Avatar, Empty, Rate } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import RateInfo from 'app/components/Rate';
import ImageGallery from 'app/components/ImageGallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import ReactImageGallery from 'react-image-gallery';

dayjs.extend(relativeTime);

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/'
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/'
  },
  {
    original: 'https://picsum.photos/id/1020/1000/600/',
    thumbnail: 'https://picsum.photos/id/1020/250/150/'
  },
  {
    original: 'https://picsum.photos/id/1021/1000/600/',
    thumbnail: 'https://picsum.photos/id/1021/250/150/'
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/'
  }
];

interface ProgramCommentProps {
  programComment: IProgramComment[];
}

export default function ProgramComment({
  programComment
}: ProgramCommentProps) {
  if (!programComment.length) {
    return <Empty description="Chưa có đánh giá nào" />;
  }

  return (
    <Card className="my-6 space-y-4">
      <ReactImageGallery
        items={images}
        slideInterval={10000}
        showPlayButton={false}
        lazyLoad
        // renderItem={() => null}
      />
      {programComment.map((comment, index) => (
        <div className="" key={comment.id}>
          <div className="flex">
            <div className="flex-1 max-w-[40px]">
              <Avatar size="large" icon={<UserOutlined />} />
            </div>

            <div className="ml-5">
              <div className="flex items-baseline space-x-2">
                <span className="font-semibold">
                  {comment.user || 'Người dùng ẩn danh'}
                </span>
                {comment.date && (
                  <span className="text-[14px] text-slate-500">
                    {dayjs(new Date()).to(dayjs(comment.date))}
                  </span>
                )}
              </div>
              {comment.rate_overall && (
                <RateInfo value={comment.rate_overall} />
              )}
              <Text className="mb-2 mt-3">
                <span>Ưu điểm: </span>
                <span>{comment.pros || '-'}</span>
              </Text>
              <Text className="mb-2">
                <span>Nhược điểm: </span>
                <span>{comment.cons || '-'}</span>
              </Text>
              <Text>
                <span>Cần cải thiện: </span>
                <span>{comment.need_to_improved || '-'}</span>
              </Text>
              <ImageGallery />
            </div>
          </div>
        </div>
      ))}
    </Card>
  );
}
