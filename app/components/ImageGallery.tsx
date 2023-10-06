'use client';

import { useRef, ReactElement, useState } from 'react';
import ReactImageGallery, { ReactImageGalleryProps } from 'react-image-gallery';

export interface IModal {
  title: string;
  icon: ReactElement;
  children: React.ReactElement;
  okText: string;
  onOk: (data: any) => void;
  loading?: boolean;
}

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
  }
];

const ImageGallery = () => {
  const ref = useRef<any>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const handleClick = () => {
    ref.current?.toggleFullScreen();
  };
  return (
    <div className="relative items-center">
      <ReactImageGallery
        onScreenChange={(state) => setIsFullscreen(state)}
        additionalClass="w-[150px]"
        onClick={handleClick}
        ref={ref}
        showThumbnails={isFullscreen}
        items={images}
        slideInterval={10000}
        showPlayButton={false}
        lazyLoad
        showFullscreenButton={isFullscreen}
        showNav={isFullscreen}
      />
      <span className="relative text-white top-[-55px] left-[70px]">+3</span>
    </div>
  );
};

export default ImageGallery;
