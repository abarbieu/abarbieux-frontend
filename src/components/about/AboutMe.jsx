import React, { useEffect } from 'react';
import moment from 'moment';
import { ParallaxBanner } from 'react-scroll-parallax';
import { HashLink } from 'react-router-hash-link';
import { useController } from 'react-scroll-parallax';
import { Link } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { BrowserView, MobileView } from 'react-device-detect';

export default function AboutMe () {
  const { parallaxController } = useController();

  useEffect(() => {
    const handler = () => parallaxController.update();
    window.addEventListener('load', handler);
    return () => window.removeEventListener('load', handler);
  });
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
            <div style={{ height: 30 }} className='m-2'>
              <HashLink smooth to='/about#beginning'>
                <svg
                  className='svg-link-1'
                  height='90%'
                  id='arrow'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 977.77181 362.43902'
                >
                  <path
                    className='cls-1'
                    d='M32.17545,406.8901,215.91529,529.93749,400.402,653.48508l45.5615,30.51175c15.27176,10.22723,30.68251,21.15367,48.31884,26.96321,26.85942,8.8477,54.14385,4.44918,79.898-5.60258,17.97484-7.01552,34.7889-17.82964,51.145-27.8874,59.41945-36.53837,112.93906-82.26987,167.41117-125.60117L966.39206,413.73l21.09175-16.778c6.015-4.78481,12.37379-11.53625,13.32456-19.63955a19.47922,19.47922,0,0,0-8.98382-18.31175c-15.65409-9.65824-39.88981-6.42306-54.04133,4.83414L791.54706,480.16234c-47.549,37.82416-94.66077,76.29547-142.919,113.21388-26.00458,19.894-52.68824,38.942-80.83316,55.71007l8.33668-4.94436c-11.75858,6.9594-23.67351,13.95648-36.49768,18.78125l9.79156-3.58411a84.83173,84.83173,0,0,1-13.94236,3.75653l10.2718-1.79184a66.47052,66.47052,0,0,1-9.53386.74083l9.692.11361a59.62221,59.62221,0,0,1-10.67148-1.2527l8.68835,1.87632a77.59464,77.59464,0,0,1-15.57306-5.616l7.261,3.49627c-14.4582-7.169-27.6068-16.99609-40.982-25.95322L451.315,605.69772l-87.38846-58.52254L189.14963,430.1301,90.55752,364.10467c-7.19412-4.81778-17.23887-6.13545-25.64129-5.48619-9.37449.72437-20.93395,4.36608-28.4,10.32033-5.97264,4.76321-12.86945,11.46706-13.32456,19.63954a19.70477,19.70477,0,0,0,8.98382,18.31175Z'
                    transform='translate(-23.15248 -353.28687)'
                  />
                </svg>
              </HashLink>
            </div>
          </div>
        </ParallaxBanner>
      </div>
      <div className='m-1'>
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
              <span className='not-p' className='accent-color-1'>
                I'll take the mask off after <i>The Pandemic</i>
              </span> */}
            </Col>
            <Col className='' sm={6} lg={8} xl={9}>
              <h2 className='accent-color'>A Bit to Start</h2>
              <h5 className='accent-color-1'>School</h5>
              <span className='not-p'>
                I'm a {(moment().diff('2000-08-01', 'month') / 12.0).toFixed(
                  2
                )}{' '}
                year old student at Cal Poly, San Luis Obispo, studying Computer
                Science and planning on graduating in June of 2022. Going into
                my third year, I am focusing on Graphics, Algorithms, and Web
                Development
              </span>
              <h5 className='accent-color-1'>Outside of Class</h5>
              <span className='not-p'>
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
              </span>
            </Col>
          </Row>
          <div id='computer-science' />
          <LazyLoadImage
            className='rounded-10 my-4'
            width='100%'
            alt='Me Covid'
            effect='blur'
            placeholderSrc='/fractals/fractal-bg-1.gif'
            src='/fractals/fractal-bg-2.gif'
          />
          <Row className='my-5'>
            <Col className='' sm={12} lg={12} xl={12}>
              <h2>Computer Science</h2>

              <span className='not-p'>
                Currently my focus is on web development (clearly), specifically
                on React.js utilizing PostgreSQL, Express, and NGINX. Normally,
                I prefer C++ or Java and develop graphics oriented projects.
                <Card
                  className='dark-bg-i'
                  style={{
                    float      : 'right',
                    display    : 'inline',
                    marginLeft : 15,
                    width      : '15rem',
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
                      as={Link}
                      className='brand-bg'
                      href='https://github.com/abarbieu/gpxVis'
                      eventKey='projects'
                      to={{
                        pathname : '/explore/',
                        search   : '?path=projects',
                        state    : { openPath: [ 'root', 'projects' ] },
                      }}
                    >
                      <div className='dark-color-1'>Explore Projects</div>
                    </Button>
                  </Card.Body>
                </Card>
              </span>

              <br />
              <span className='not-p'>... Writing this still ...</span>
              {/* </Col>
            <Col sm={6} lg={4} xl={3} className='no-padding m-0 p-0'> */}
            </Col>
          </Row>
          <div id='ceramics' />
          <BrowserView>
            <ParallaxBanner
              expanded={true}
              layers={[
                {
                  image  : '/ceramics/10-bowl-on-wheel2.jpg',
                  amount : 0.5,
                },
              ]}
              style={{
                borderRadius : 10,
                height       : '25vh',
                width        : '100%',
              }}
            />
          </BrowserView>
          <MobileView>
            <LazyLoadImage
              className='rounded-10'
              width='100%'
              alt='Clay bowl still on wheel'
              effect='blur'
              placeholderSrc='/ceramics/10-bowl-on-wheel2_thumb_.jpg'
              src='/ceramics/10-bowl-on-wheel2.jpg'
            />
          </MobileView>
          <Row className='my-5'>
            <Col className='' sm={12} lg={12} xl={12}>
              <h2>Ceramics</h2>
              <span className='not-p'>
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
                    marginRight : 5,
                    width       : '16rem',
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
              </span>
              <br />
              <span className='not-p'>... Writing this still ...</span>
            </Col>
          </Row>
          <div id='photography' className='w-100 vh-15 mb-4'>
            <img
              src='/icons/flourish.svg'
              height='100%'
              width='100%'
              alt='Drawing with a mouse is hard'
            />
          </div>
          <Row className='my-5'>
            <Col className='' sm={12} lg={12} xl={12}>
              <h2>Photography</h2>
              <span className='not-p'>
                <Card
                  className='dark-bg-i'
                  style={{
                    float      : 'right',
                    display    : 'inline',
                    marginLeft : 5,
                    width      : '16rem',
                  }}
                >
                  <Card.Img variant='top' src='/photos/01-honey.jpg' />
                  <Card.Body className='m-0 p-1'>
                    <Card.Title className='accent-color'>
                      Macro Honey Bees
                    </Card.Title>
                    <Card.Text style={{ fontSize: 'large' }}>
                      I've enjoyed Macro Photography a lot, revealing detail
                      that's otherwise invisbile almost always excites me.
                    </Card.Text>
                    <Button className='brand-bg' href='/art/photos'>
                      <div className='dark-color-1'>See More</div>
                    </Button>
                  </Card.Body>
                </Card>{' '}
                <br />
                <br />
                ...
              </span>
              <br />
              <span className='not-p'>... Writing this still ...</span>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
