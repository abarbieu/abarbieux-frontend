import React, { useState, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import photos from './ceramics-photos';

export default function CeramicsGallery () {
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
    <Container style={{ paddingBottom: '50px' }} fluid='large'>
      <Gallery photos={photos} direction={'column'} onClick={openLightbox} />
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
    </Container>
  );
}
