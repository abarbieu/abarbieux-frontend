import React, { useState, useCallback } from 'react';
import Gallery from 'react-photo-gallery';
import ImgsViewer from 'react-images-viewer';

export default function ImgGallery (props) {
  const [ currentImage, setCurrentImage ] = useState(0);
  const [ viewerIsOpen, setViewerIsOpen ] = useState(false);
  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };
  const nextImage = () => {
    setCurrentImage(currentImage + 1);
  };
  const prevImage = () => {
    setCurrentImage(currentImage - 1);
  };
  return (
    <div style={{ width: '85vw' }} className='mx-auto p-0'>
      <Gallery
        className='m-0 p-0'
        direction='row'
        photos={props.photos}
        onClick={openLightbox}
      />
      <ImgsViewer
        imgs={props.photos}
        currImg={currentImage}
        isOpen={viewerIsOpen}
        onClickPrev={prevImage}
        onClickNext={nextImage}
        backdropCloseable={true}
        onClose={closeLightbox}
      />
    </div>
  );
}

// type MyProps = {
//   photos: Array<{
//     src: string;
//     height: number;
//     width: number;
//     caption?: string;
//     alt?: string;
//     type?: string;
//     srcset?: Array<string>;
//   }>;
// };
