import React, { useEffect } from 'react';
import moment from 'moment';
import { ParallaxBanner } from 'react-scroll-parallax';
import { HashLink } from 'react-router-hash-link';
import { useController } from 'react-scroll-parallax';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function AboutMe () {
  const { parallaxController } = useController();

  useEffect(
    () => {
      const handler = () => parallaxController.update();
      window.addEventListener('load', handler);
      return () => window.removeEventListener('load', handler);
    },
    [ parallaxController ]
  );
  return (
    <div style={{ overflow: 'visible' }}>
      <div className='vh-75'>
        <ParallaxBanner
          className='centered'
          layers={[
            {
              image  : '/fractals/fractal-bg.png',
              amount : 1,
            },
          ]}
          style={{
            height : '100%',
          }}
        >
          <div className='light-color centered w-100 txt-bg'>
            <h1>
              <i> Aidan Barbieux</i>
            </h1>

            <h3 className='accent-color'>About Me</h3>
          </div>
        </ParallaxBanner>
      </div>
      <div className='m-3'>
        <Container fluid='lg'>
          <Row className='justify-content-center'>
            <h2 className='accent-color'>Jump To:</h2>
          </Row>
          <Row className='justify-content-center mb-3 brand-color-1'>
            <h4>
              <HashLink smooth to='/about#beginning' className='txt-link'>
                Beginning
              </HashLink>{' '}
              |{' '}
              <HashLink
                smooth
                to='/about#computer-science'
                className='txt-link'
              >
                Computer Science
              </HashLink>{' '}
              |{' '}
              <HashLink smooth to='/about#ceramics' className=''>
                Ceramics
              </HashLink>{' '}
              | {' '}
              <HashLink smooth to='/about#photography' className='txt-link'>
                Photography
              </HashLink>{' '}
              |{' '}
              <HashLink smooth to='/about#cycling' className='txt-link'>
                Cycling
              </HashLink>
            </h4>
          </Row>
          <Row>
            <div id='beginning' className='w-100 vh-15 mb-4'>
              <img
                src='/icons/sig.svg'
                height='100%'
                width='100%'
                alt='horrible excuse for e-signature'
              />
            </div>
            <Col
              style={{ overFlow: 'hidden' }}
              sm={6}
              lg={4}
              xl={3}
              className='m-0 p-0'
            >
              {/* <Image src='/photos/55-me.jpg' thumbnail /> */}
              <Card className='dark-bg-i m-0 p-0'>
                <Card.Body variant='top' className='dark-bg-i m-0 p-0'>
                  <LazyLoadImage
                    className='rounded-10'
                    width='100%'
                    alt='Me Covid'
                    effect='blur'
                    placeholderSrc='/photos/55-me_thumb_.jpg'
                    src='/photos/55-me.jpg'
                  />
                </Card.Body>
                <Card.Body className='m-0 p-1'>
                  <Card.Title className='accent-color'>
                    I'll take the mask off after <i>The Pandemic</i>
                  </Card.Title>
                </Card.Body>
              </Card>
              {/* 
              <p className='accent-color-1'>
                I'll take the mask off after <i>The Pandemic</i>
              </p> */}
            </Col>
            <Col className='' sm={6} lg={8} xl={9}>
              <h2 className='accent-color'>A Bit to Start</h2>
              <h5 className='accent-color-1'>School</h5>
              <p className='align-left'>
                I'm a {(moment().diff('2000-08-01', 'month') / 12.0).toFixed(
                  2
                )}{' '}
                year old student at Cal Poly, San Luis Obispo, studying Computer
                Science and planning on graduating in June of 2022. Going into
                my third year, I am focusing on Graphics, Algorithms, and Web
                Development
              </p>
              <h5 className='accent-color-1'>Outside of Class</h5>
              <p className='align-left'>
                When I'm not studying I am considered a local of the ASI Craft
                Center on campus where I throw, trim, carve, and glaze{' '}
                <a className='brand-color-1-i' href='/art/ceramics'>
                  Ceramic vessels
                </a>{' '}
                for occasional sale at craft shows. Other than that I'm an avid
                cyclist, racing for the university team around California, as
                well as as member of the Unicycling Club and of the Juggling
                Club. In what time is left after that I'm either {' '}
                <a className='brand-color-1-i' href='/art/photos'>
                  taking photos
                </a>{' '}
                or having discussions in the philosophy or AHA clubs
              </p>
            </Col>
          </Row>
          <div id='computer-science' className='vh-15 my-3'>
            <ParallaxBanner
              className='rounded-10'
              layers={[
                {
                  image  : '/fractals/fractal-bg-3.gif',
                  amount : 3,
                },
              ]}
              style={{
                height : '100%',
                width  : '100%',
              }}
            />
          </div>
          <Row className='my-5'>
            <Col className='' sm={12} lg={12} xl={12}>
              <h2>Computer Science</h2>

              <p className='align-left'>
                Currently my focus is on web development (clearly), specifically
                on React.js utilizing PostgreSQL, Express, and NGINX. Normally,
                I prefer C++ or Java and develop graphics oriented projects.
                <Card
                  className='dark-bg-i'
                  style={{
                    float      : 'right',
                    display    : 'inline',
                    marginLeft : 15,
                    width      : '30%',
                  }}
                >
                  <Card.Img variant='top' src='/icons/gpxvisdemo.gif' />
                  <Card.Body className='m-0 p-1'>
                    <Card.Title className='accent-color'>
                      GPX Visualizer
                    </Card.Title>
                    <Card.Text style={{ fontSize: 'large' }}>
                      A 3D visualizer for GPX files describing cycling location,
                      heart rate, and speed data
                    </Card.Text>
                    <Button
                      className='brand-bg'
                      href='https://github.com/abarbieu/gpxVis'
                    >
                      <div className='dark-color-1'>Visit GitHub Repo</div>
                    </Button>
                  </Card.Body>
                </Card>
              </p>

              <br />
              <p>... Writing this still ...</p>
              {/* </Col>
            <Col sm={6} lg={4} xl={3} className='no-padding m-0 p-0'> */}
            </Col>
          </Row>
          <div id='ceramics' className='vh-15 my-3 '>
            <ParallaxBanner
              className='rounded-10'
              layers={[
                {
                  image  : '/ceramics/10-bowl-on-wheel2.jpg',
                  amount : 3,
                },
              ]}
              style={{
                height : '100%',
                width  : '100%',
              }}
            />
          </div>
          <Row className='my-5'>
            <Col className='' sm={12} lg={12} xl={12}>
              <h2>Ceramics</h2>
              <p className='align-left'>
                Exactly{' '}
                {(moment().diff('2019-04-01', 'month') / 12.0).toFixed(2)} {' '}
                years ago, at the end of my Freshman year, I discovered the ASI
                craft center. This could've been a mistake, as I've lost
                hundreds of hours down rabbit holes dug in there since, but I
                enjoyed every muddy minute of it.
                <Card
                  className='dark-bg-i'
                  style={{
                    float       : 'left',
                    display     : 'inline',
                    marginRight : 15,
                    width       : '40%',
                  }}
                >
                  <Card.Img variant='top' src='/ceramics/02-chatter.jpg' />
                  <Card.Body className='m-0 p-1'>
                    <Card.Title className='accent-color'>
                      A freshly carved fruit bowl
                    </Card.Title>
                    <Card.Text style={{ fontSize: 'large' }}>
                      You can get this effect by just losely holding a trimming
                      tool on leather-hard clay. Despite the inherent
                      randomness, there's still a lot you can do
                    </Card.Text>
                    <Button className='brand-bg' href='/art/ceramics'>
                      <div className='dark-color-1'>See More</div>
                    </Button>
                  </Card.Body>
                </Card>{' '}
                <br />
                <br />
                Since the beginning I've stuck to the wheel, the other option of
                handbuilding has that exact quality of painting etc. brings out
                my 3rd grade clumsiness
              </p>
              <br />
              <p>... Writing this still ...</p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
