import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import { ParallaxBanner } from 'react-scroll-parallax';
// import { Row, Col, Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ImgGallery from '../gallery/MyGallery';

export default function AboutMe () {
  return (
    <div>
      <div className='vh-75'>
        <ParallaxBanner
          className='centered'
          layers={[
            {
              image  : '/fractal-bg.png',
              amount : 0.75,
            },
          ]}
          style={{
            height : '100%',
          }}
        >
          <div id='parallax-div-connector' className='' />
          <div className='txt-bg white-color centered p-2 rounded'>
            <h1>About Me</h1>
          </div>
        </ParallaxBanner>
      </div>
      <Container style={{ height: 300, marginBottom: '-300px' }}>
        <Row className='justify-content-center'>
          <h1 className='white-color'>Aidan Barbieux</h1>
        </Row>
        <Row className='justify-content-center'>
          <h4 className='white-color'>
            Computer Science | Ceramics | Photography | Cycling
          </h4>
        </Row>
      </Container>
      <Parallax y={[ '200px', '-300px' ]}>
        <Container fluid='lg' className='vh-100 white-color no-padding'>
          <Row className='no-margin'>
            <Col sm={6} className='hands-bg no-padding'>
              <Parallax x={[ '-200%', '0%' ]} tag='img'>
                <LazyLoadImage
                  className=''
                  width='100%'
                  alt='Me Covid'
                  effect='blur'
                  placeholderSrc='/photos/55-me_thumb_.jpg'
                  src='/photos/55-me.jpg'
                />
              </Parallax>
            </Col>
            <Col className='pattern-bg'>
              <Row>
                <Col xs={12} sm={7} md={7} lg={6}>
                  <p>
                    Integer tortor nisi, tristique et dictum sit amet, interdum
                    in nisl. Nullam diam purus, viverra vitae finibus sed,
                    auctor non ipsum. Integer pellentesque mi eget est varius,
                    nec ultricies sapien sodales. Quisque ullamcorper tempor
                    malesuada. Vestibulum vehicula nulla in velit cursus
                    aliquam. Mauris diam dui,
                  </p>
                </Col>
                <Col xs={12} sm={7} md={7} lg={6}>
                  <p>
                    Integer tortor nisi, tristique et dictum sit amet, interdum
                    in nisl. Nullam diam purus, viverra vitae finibus sed,
                    auctor non ipsum. Integer pellentesque mi eget est varius,
                    nec ultricies sapien sodales. Quisque ullamcorper tempor
                    malesuada. Vestibulum vehicula nulla in velit cursus
                    aliquam. Mauris diam dui,
                  </p>
                </Col>
                <Col xs={12} sm={7} md={7} lg={6}>
                  <p>
                    Integer tortor nisi, tristique et dictum sit amet, interdum
                    in nisl. Nullam diam purus, viverra vitae finibus sed,
                    auctor non ipsum. Integer pellentesque mi eget est varius,
                    nec ultricies sapien sodales. Quisque ullamcorper tempor
                    malesuada. Vestibulum vehicula nulla in velit cursus
                    aliquam. Mauris diam dui,
                  </p>
                </Col>
                <Col xs={12} sm={7} md={7} lg={6}>
                  <p>
                    Integer tortor nisi, tristique et dictum sit amet, interdum
                    in nisl. Nullam diam purus, viverra vitae finibus sed,
                    auctor non ipsum. Integer pellentesque mi eget est varius,
                    nec ultricies sapien sodales. Quisque ullamcorper tempor
                    malesuada. Vestibulum vehicula nulla in velit cursus
                    aliquam. Mauris diam dui,
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col className='black-bg'>
              <p>
                Integer tortor nisi, tristique et dictum sit amet, interdum in
                nisl. Nullam diam purus, viverra vitae finibus sed, auctor non
                ipsum. Integer pellentesque mi eget est varius, nec ultricies
                sapien sodales. Quisque ullamcorper tempor malesuada. Vestibulum
                vehicula nulla in velit cursus aliquam. Mauris diam dui,
              </p>
            </Col>
          </Row>
        </Container>
      </Parallax>
      <div className='vh-100' />
    </div>
  );
}
