import { useState } from 'react';

import { Gallery as ReactGridGallery } from 'react-grid-gallery';
import Lightbox from 'react-image-lightbox';

import type { ImageProps } from '@/types/common';

import 'react-image-lightbox/style.css';

interface Props {
  images: ImageProps[];
}

// global polyfill for react-image-lightbox
window.global = window.global || window;

const Gallery: React.FC<Props> = ({ images }) => {
  const [index, setIndex] = useState(-1);

  const currentImage = images[index];
  const nextIndex = (index + 1) % images.length;
  const nextImage = images[nextIndex] || currentImage;
  const prevIndex = (index + images.length - 1) % images.length;
  const prevImage = images[prevIndex] || currentImage;

  const handleClick = (index: number, _item: ImageProps) => setIndex(index);
  const handleClose = () => setIndex(-1);
  const handleMovePrev = () => setIndex(prevIndex);
  const handleMoveNext = () => setIndex(nextIndex);

  return (
    <div>
      <ReactGridGallery images={images} onClick={handleClick} enableImageSelection={false} />
      {!!currentImage && (
        <Lightbox
          imageTitle={currentImage.caption}
          mainSrc={currentImage.originalSrc}
          mainSrcThumbnail={currentImage.src}
          nextSrc={nextImage.originalSrc}
          nextSrcThumbnail={nextImage.src}
          prevSrc={prevImage.originalSrc}
          prevSrcThumbnail={prevImage.src}
          onCloseRequest={handleClose}
          onMovePrevRequest={handleMovePrev}
          onMoveNextRequest={handleMoveNext}
        />
      )}
    </div>
  );
};

export default Gallery;
