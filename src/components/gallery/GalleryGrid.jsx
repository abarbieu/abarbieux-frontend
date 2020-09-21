import React from 'react';
import Gallery from 'react-photo-gallery';
import {
  LazyLoadImage,
  trackWindowScroll,
} from 'react-lazy-load-image-component';

function GalleryGrid (props) {
  const renderImage = (imgdata) => {
    const { key, margin, onClick, top, left } = imgdata;
    const { src, width, height, placeholder } = imgdata.photo;
    return (
      <button
        className='d-inline p-0 m-0 transparent-bg'
        onClick={onClick.bind(this, this, imgdata)}
        key={key}
      >
        <LazyLoadImage
          className='d-inline p-0 m-0 transparent-bg'
          style={{ margin: margin - 1, top, left }}
          key={key}
          alt={key}
          effect='blur'
          height={height}
          width={width}
          placeholderSrc={placeholder || null}
          scrollPosition={props.scrollPosition}
          src={src}
        />
      </button>
    );
  };
  return (
    <Gallery
      className='m-0 p-0'
      direction='row'
      photos={props.photos}
      onClick={props.onPhotoClick}
      renderImage={renderImage}
    />
  );
}

export default trackWindowScroll(GalleryGrid);
