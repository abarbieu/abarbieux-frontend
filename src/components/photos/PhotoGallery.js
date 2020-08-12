import React, { useState, useCallback } from 'react';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import photos from './photos';

export default function PhotoGallery () {
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
  return (
    <div style={{ width: '85vw' }} className='mx-auto p-0'>
      <Gallery
        className='m-0 p-0'
        direction='row'
        photos={photos}
        onClick={openLightbox}
      />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map((x) => ({
                ...x,
                srcSet  : x.srcSet,
                caption : x.title,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
}
