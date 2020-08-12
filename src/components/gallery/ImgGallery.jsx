import React, { useState, useCallback } from 'react';
import Gallery from 'react-photo-gallery';
import ImageGallery from 'react-image-gallery';
import Modal from 'react-bootstrap/Modal';
// import ImgsViewer from 'react-images-viewer';

export default function ImgGallery (props) {
  // const [ thumbPos, setThumbPos ] = useState('bottom');
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
        photos={props.photos}
        onClick={openLightbox}
      />

      <Modal
        show={viewerIsOpen}
        onHide={closeLightbox}
        dialogClassName='mx-auto modal-90w'
        className='pic-modal'
        centered
      >
        <Modal.Header className='pic-modal-header' closeButton>
          <p style={{ color: 'white' }}>{props.photos[currentImage].src}</p>
        </Modal.Header>
        <Modal.Body>
          {viewerIsOpen ? (
            <ImageGallery
              lazyLoad={true}
              thumbnailPosition={props.thumbPos || 'bottom'}
              startIndex={currentImage}
              onSlide={setCurrentImage}
              showIndex={true}
              items={props.photos}
            />
          ) : null}
        </Modal.Body>
      </Modal>
      {/* <ImgsViewer
        imgs={props.photos}
        currImg={currentImage}
        isOpen={viewerIsOpen}
        onClickPrev={prevImage}
        onClickNext={nextImage}
        backdropCloseable={true}
        onClose={closeLightbox}
      /> */}
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
