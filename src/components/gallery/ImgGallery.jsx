import React, { useState, useCallback } from 'react';
import GalleryGrid from './GalleryGrid';
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
      <GalleryGrid photos={props.photos} onPhotoClick={openLightbox} />

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
    </div>
  );
}

// import React, { useState, useCallback } from 'react';
// import {
//   LazyLoadImage,
//   trackWindowScroll,
// } from 'react-lazy-load-image-component';

// const ImgGallery = ({ photos, scrollPosition }) => {
//   console.log(scrollPosition);
//   return (
//     <div style={{ width: '85vw' }} className='mx-auto p-0'>
//       {photos.map((image) => {
//         const { src, placeholder, width, height } = image;
//         return (
//           <LazyLoadImage
//             className='m-0 p-0'
//             style={{ left: 0 }}
//             key={src}
//             alt={src}
//             width={width > height ? 1024 : 512}
//             height={'auto'}
//             scrollPosition={scrollPosition}
//             placeholderSrc={placeholder || null}
//             src={src}
//           />
//         );
//       })}
//     </div>
//   );
// };
// export default trackWindowScroll(ImgGallery);
